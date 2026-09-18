import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync("C:\\Users\\admin\\Desktop\\me\\cashHub\\website\\.env", "utf8")
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const slug = "kherlta2";
const publicNumber = 6;

const { data: config, error: configErr } = await supabase
  .from("shop_website_configs")
  .select("shop_id, theme, language_mode, hero, about, advantages, social, faq, seo")
  .eq("slug", slug)
  .maybeSingle();

if (configErr) {
  console.error("config error:", configErr.message);
  process.exit(1);
}
if (!config) {
  console.error("no config found for slug", slug);
  process.exit(1);
}

console.log("theme:", config.theme);
console.log("language_mode:", config.language_mode);

const { data: shop, error: shopErr } = await supabase
  .from("shops")
  .select("id, public_number, shop_name, shop_number, type, location, country, working_hours_from, working_hours_to, number_of_chairs, working_days, slot_interval_minutes")
  .eq("id", config.shop_id)
  .eq("public_number", publicNumber)
  .maybeSingle();

if (shopErr) console.error("shop error:", shopErr.message);
console.log("shop:", JSON.stringify(shop, null, 2));

const { data: categories } = await supabase
  .from("catigories")
  .select("id, title, description")
  .eq("shop_id", config.shop_id)
  .order("id");
console.log("categories:", JSON.stringify(categories, null, 2));

const { data: services } = await supabase
  .from("services")
  .select("id, category_id, name, description, price")
  .eq("shop_id", config.shop_id)
  .eq("is_active", true)
  .order("id");
console.log("services:", JSON.stringify(services, null, 2));

console.log("hero:", JSON.stringify(config.hero, null, 2));
console.log("about:", JSON.stringify(config.about, null, 2));
console.log("social:", JSON.stringify(config.social, null, 2));
console.log("faq:", JSON.stringify(config.faq, null, 2));
