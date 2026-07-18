-- Website booking (run once in Supabase SQL Editor)
-- Client lookup, fully-booked slots, create reservation with capacity + 1-per-day rules.

-- 1) Look up an active client by shop + phone
CREATE OR REPLACE FUNCTION public.find_shop_client_by_phone(
  p_shop_id uuid,
  p_phones text[]
)
RETURNS TABLE (id uuid, name text)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT c.id, c.name
  FROM public.clients c
  WHERE c.shop_id = p_shop_id
    AND c.is_active = true
    AND c.phone = ANY (p_phones)
  ORDER BY c.created_at ASC
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.find_shop_client_by_phone(uuid, text[]) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.find_shop_client_by_phone(uuid, text[])
  TO anon, authenticated;

-- 2) Fully booked slots for one date (capacity = number_of_chairs)
CREATE OR REPLACE FUNCTION public.get_fully_booked_shop_slots(
  p_shop_id uuid,
  p_date date
)
RETURNS TABLE (reservation_time time)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT r.reservation_time
  FROM public.reservations r
  JOIN public.shops s ON s.id = r.shop_id
  WHERE r.shop_id = p_shop_id
    AND r.reservation_date = p_date
    AND r.status IN ('new', 'confirmed')
  GROUP BY r.reservation_time, s.number_of_chairs
  HAVING COUNT(*) >= COALESCE(s.number_of_chairs, 1);
$$;

REVOKE ALL ON FUNCTION public.get_fully_booked_shop_slots(uuid, date) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_fully_booked_shop_slots(uuid, date)
  TO anon, authenticated;

-- 3) Fully booked slots for several dates at once (used to show status immediately)
CREATE OR REPLACE FUNCTION public.get_fully_booked_shop_slots_range(
  p_shop_id uuid,
  p_dates date[]
)
RETURNS TABLE (reservation_date date, reservation_time time)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT r.reservation_date, r.reservation_time
  FROM public.reservations r
  JOIN public.shops s ON s.id = r.shop_id
  WHERE r.shop_id = p_shop_id
    AND r.reservation_date = ANY (p_dates)
    AND r.status IN ('new', 'confirmed')
  GROUP BY r.reservation_date, r.reservation_time, s.number_of_chairs
  HAVING COUNT(*) >= COALESCE(s.number_of_chairs, 1);
$$;

REVOKE ALL ON FUNCTION public.get_fully_booked_shop_slots_range(uuid, date[]) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_fully_booked_shop_slots_range(uuid, date[])
  TO anon, authenticated;

-- One active reservation per client per day (canceled does not count)
CREATE UNIQUE INDEX IF NOT EXISTS reservations_one_active_per_client_day
  ON public.reservations (client_id, reservation_date)
  WHERE status IN ('new', 'confirmed');

-- 4) Create website reservation (client if needed) with race-safe checks
CREATE OR REPLACE FUNCTION public.create_website_reservation(
  p_shop_id uuid,
  p_phone text,
  p_name text,
  p_date date,
  p_time time,
  p_client_id uuid DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_client_id uuid := p_client_id;
  v_code text;
  v_reservation_id uuid;
  v_count integer;
  v_capacity integer;
BEGIN
  IF p_shop_id IS NULL OR p_phone IS NULL OR length(p_phone) < 8 THEN
    RAISE EXCEPTION 'invalid_phone';
  END IF;

  IF p_date IS NULL OR p_time IS NULL THEN
    RAISE EXCEPTION 'invalid_slot';
  END IF;

  PERFORM pg_advisory_xact_lock(
    hashtextextended(p_shop_id::text || ':' || p_date::text || ':' || p_time::text, 0)
  );

  SELECT COALESCE(s.number_of_chairs, 1)
    INTO v_capacity
  FROM public.shops s
  WHERE s.id = p_shop_id;

  IF v_capacity IS NULL THEN
    RAISE EXCEPTION 'invalid_shop';
  END IF;

  IF v_client_id IS NOT NULL AND NOT EXISTS (
    SELECT 1
    FROM public.clients c
    WHERE c.id = v_client_id
      AND c.shop_id = p_shop_id
      AND c.is_active = true
  ) THEN
    v_client_id := NULL;
  END IF;

  IF v_client_id IS NULL THEN
    SELECT c.id
      INTO v_client_id
    FROM public.clients c
    WHERE c.shop_id = p_shop_id
      AND c.phone = p_phone
      AND c.is_active = true
    ORDER BY c.created_at ASC
    LIMIT 1;
  END IF;

  IF v_client_id IS NULL THEN
    IF p_name IS NULL OR length(trim(p_name)) = 0 THEN
      RAISE EXCEPTION 'invalid_name';
    END IF;

    SELECT COUNT(*)::integer
      INTO v_count
    FROM public.clients
    WHERE shop_id = p_shop_id;

    v_code := 'C' || lpad((v_count + 1)::text, 4, '0');

    INSERT INTO public.clients (shop_id, code, name, phone)
    VALUES (p_shop_id, v_code, trim(p_name), p_phone)
    RETURNING id INTO v_client_id;
  END IF;

  PERFORM pg_advisory_xact_lock(
    hashtextextended(v_client_id::text || ':' || p_date::text, 0)
  );

  IF EXISTS (
    SELECT 1
    FROM public.reservations r
    WHERE r.client_id = v_client_id
      AND r.reservation_date = p_date
      AND r.status IN ('new', 'confirmed')
  ) THEN
    RAISE EXCEPTION 'duplicate_daily_reservation';
  END IF;

  SELECT COUNT(*)::integer
    INTO v_count
  FROM public.reservations r
  WHERE r.shop_id = p_shop_id
    AND r.reservation_date = p_date
    AND r.reservation_time = p_time
    AND r.status IN ('new', 'confirmed');

  IF v_count >= v_capacity THEN
    RAISE EXCEPTION 'slot_fully_booked';
  END IF;

  INSERT INTO public.reservations (
    shop_id,
    client_id,
    reservation_date,
    reservation_time,
    status
  )
  VALUES (
    p_shop_id,
    v_client_id,
    p_date,
    p_time,
    'new'
  )
  RETURNING id INTO v_reservation_id;

  RETURN v_reservation_id;
END;
$$;

REVOKE ALL ON FUNCTION public.create_website_reservation(uuid, text, text, date, time, uuid)
  FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_website_reservation(uuid, text, text, date, time, uuid)
  TO anon, authenticated;
