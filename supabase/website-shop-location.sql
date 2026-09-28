-- Shop map pin for the public website (run once in Supabase SQL Editor,
-- after the platform's 2026-09-30_shop_location.sql).
-- shop_locations is owner/manager-only; this returns just the pin, and only
-- for shops that have a website, so visitors can see the map and get directions.

CREATE OR REPLACE FUNCTION public.get_shop_public_location(p_shop_id uuid)
RETURNS TABLE (latitude double precision, longitude double precision)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT l.latitude, l.longitude
  FROM public.shop_locations l
  WHERE l.shop_id = p_shop_id
    AND EXISTS (
      SELECT 1 FROM public.shop_website_configs c WHERE c.shop_id = l.shop_id
    );
$$;

REVOKE ALL ON FUNCTION public.get_shop_public_location(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_shop_public_location(uuid)
  TO anon, authenticated;
