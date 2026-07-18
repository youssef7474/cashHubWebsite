"use server";

import { createClient } from "@/lib/supabase/server";
import { isValidPhoneDigits, phoneLookupVariants } from "./phone";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

export type ClientLookupResult =
  | { status: "found"; clientId: string; name: string }
  | { status: "not_found" }
  | { status: "invalid_phone" }
  | { status: "error" };

export async function findClientByPhone(
  shopId: string,
  phone: string,
): Promise<ClientLookupResult> {
  const variants = phoneLookupVariants(phone);
  if (variants.length === 0) {
    return { status: "invalid_phone" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("find_shop_client_by_phone", {
    p_shop_id: shopId,
    p_phones: variants,
  });

  if (error) {
    console.error("[reservations] client lookup failed:", error);
    return { status: "error" };
  }

  const client = Array.isArray(data) ? data[0] : data;
  if (!client?.id) return { status: "not_found" };

  return { status: "found", clientId: client.id, name: client.name };
}

export async function getFullyBookedSlots(
  shopId: string,
  date: string,
): Promise<string[]> {
  const byDate = await getFullyBookedSlotsForDates(shopId, [date]);
  return byDate[date] ?? [];
}

/** Prefetch fully booked HH:MM times for several dates in one call. */
export async function getFullyBookedSlotsForDates(
  shopId: string,
  dates: string[],
): Promise<Record<string, string[]>> {
  const validDates = dates.filter((date) => DATE_PATTERN.test(date));
  const empty: Record<string, string[]> = Object.fromEntries(
    validDates.map((date) => [date, [] as string[]]),
  );
  if (validDates.length === 0) return empty;

  const supabase = await createClient();
  const { data, error } = await supabase.rpc(
    "get_fully_booked_shop_slots_range",
    {
      p_shop_id: shopId,
      p_dates: validDates,
    },
  );

  if (error) {
    console.error("[reservations] availability lookup failed:", error);
    // Fallback: fetch each date individually (older SQL without the range fn).
    const results = await Promise.all(
      validDates.map(async (date) => {
        const { data: rows, error: singleError } = await supabase.rpc(
          "get_fully_booked_shop_slots",
          { p_shop_id: shopId, p_date: date },
        );
        if (singleError) {
          console.error("[reservations] availability lookup failed:", singleError);
          return [date, [] as string[]] as const;
        }
        const times = (rows ?? [])
          .map((row: { reservation_time?: string }) =>
            row.reservation_time?.slice(0, 5),
          )
          .filter((time: string | undefined): time is string => Boolean(time));
        return [date, times] as const;
      }),
    );
    return Object.fromEntries(results);
  }

  const byDate: Record<string, string[]> = { ...empty };
  for (const row of data ?? []) {
    const date = row.reservation_date?.slice?.(0, 10) ?? row.reservation_date;
    const time = row.reservation_time?.slice(0, 5);
    if (!date || !time) continue;
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push(time);
  }
  return byDate;
}

export type CreateReservationInput = {
  shopId: string;
  phone: string;
  name: string;
  /** Known client id from a previous lookup; skips re-searching. */
  clientId?: string | null;
  /** YYYY-MM-DD */
  date: string;
  /** 24-hour HH:MM */
  time: string;
};

export type CreateReservationResult =
  | { ok: true }
  | {
      ok: false;
      error:
        | "invalid_phone"
        | "invalid_name"
        | "invalid_slot"
        | "duplicate_daily_reservation"
        | "slot_fully_booked"
        | "save_failed";
    };

export async function createReservation(
  input: CreateReservationInput,
): Promise<CreateReservationResult> {
  const variants = phoneLookupVariants(input.phone);
  const phone = variants[0] ?? input.phone.replace(/\D/g, "");
  if (!isValidPhoneDigits(phone)) {
    return { ok: false, error: "invalid_phone" };
  }

  const name = input.name.trim();
  if (!DATE_PATTERN.test(input.date) || !TIME_PATTERN.test(input.time)) {
    return { ok: false, error: "invalid_slot" };
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("create_website_reservation", {
    p_shop_id: input.shopId,
    p_phone: phone,
    p_name: name,
    p_date: input.date,
    p_time: input.time,
    p_client_id: input.clientId ?? null,
  });

  if (error) {
    console.error("[reservations] reservation create failed:", error);
    const message = error.message?.toLowerCase() ?? "";
    if (
      error.code === "23505" ||
      message.includes("duplicate_daily_reservation")
    ) {
      return { ok: false, error: "duplicate_daily_reservation" };
    }
    if (message.includes("invalid_phone")) {
      return { ok: false, error: "invalid_phone" };
    }
    if (message.includes("invalid_name")) {
      return { ok: false, error: "invalid_name" };
    }
    if (message.includes("invalid_slot")) {
      return { ok: false, error: "invalid_slot" };
    }
    if (message.includes("slot_fully_booked")) {
      return { ok: false, error: "slot_fully_booked" };
    }
    return { ok: false, error: "save_failed" };
  }

  return { ok: true };
}
