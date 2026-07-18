"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getFullyBookedSlotsForDates } from "@/lib/reservations/actions";

/**
 * Prefetches fully booked slots for every booking day as soon as the section
 * mounts, so booked times appear closed immediately (not after a click).
 */
export function useBookedSlots(
  shopId: string,
  dates: string[],
  selectedDate?: string,
) {
  const datesKey = dates.join(",");
  const [byDate, setByDate] = useState<Record<string, string[]>>({});
  const [fetchedKey, setFetchedKey] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (dates.length === 0) {
      setByDate({});
      setFetchedKey("");
      return;
    }
    const next = await getFullyBookedSlotsForDates(shopId, dates);
    setByDate(next);
    setFetchedKey(datesKey);
  }, [shopId, dates, datesKey]);

  useEffect(() => {
    let ignore = false;

    if (dates.length === 0) {
      Promise.resolve().then(() => {
        if (!ignore) {
          setByDate({});
          setFetchedKey("");
        }
      });
      return () => {
        ignore = true;
      };
    }

    getFullyBookedSlotsForDates(shopId, dates).then((next) => {
      if (!ignore) {
        setByDate(next);
        setFetchedKey(datesKey);
      }
    });

    return () => {
      ignore = true;
    };
  }, [shopId, dates, datesKey]);

  const bookedSlots = useMemo(() => {
    if (!selectedDate) return new Set<string>();
    return new Set(byDate[selectedDate] ?? []);
  }, [byDate, selectedDate]);

  const isLoading = fetchedKey !== datesKey;

  return { bookedSlots, isLoading, refresh };
}
