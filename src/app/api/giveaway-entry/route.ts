import { createClient } from "@supabase/supabase-js";
import { getPhoneCountry, normalizeNationalPhone } from "@/lib/phone-countries";
import { getSupabasePublicConfig } from "@/lib/supabase-config";

type EntryPayload = {
  name?: unknown;
  email?: unknown;
  countryIso?: unknown;
  phoneNumber?: unknown;
  instagram?: unknown;
  consent?: unknown;
  website?: unknown;
};

const json = (body: Record<string, string>, status: number) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return json({ error: "This request could not be accepted." }, 403);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 4_000) return json({ error: "Please check the form and try again." }, 413);

  let payload: EntryPayload;
  try {
    payload = await request.json() as EntryPayload;
  } catch {
    return json({ error: "Please check the form and try again." }, 400);
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return json({ error: "Please check the form and try again." }, 400);
  }

  // Quietly accept bot submissions caught by the hidden honeypot.
  if (typeof payload.website === "string" && payload.website.trim()) {
    return json({ message: "Your entry has been received." }, 201);
  }

  const name = typeof payload.name === "string" ? payload.name.trim().replace(/\s+/g, " ") : "";
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const countryIso = typeof payload.countryIso === "string" ? payload.countryIso.trim().toUpperCase() : "";
  const country = getPhoneCountry(countryIso);
  const phoneInput = typeof payload.phoneNumber === "string" ? payload.phoneNumber.trim() : "";
  const phoneDigits = normalizeNationalPhone(countryIso, phoneInput);
  const instagram = typeof payload.instagram === "string" ? payload.instagram.trim().replace(/^@/, "") : "";
  const phone = country ? `${country.dialCode}${phoneDigits}` : "";

  if (name.length < 2 || name.length > 80) return json({ error: "Enter your name (2–80 characters)." }, 400);
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Enter a valid email address." }, 400);
  if (!country || !/^[0-9\s().-]+$/.test(phoneInput) || phoneDigits.length < country.minDigits || phoneDigits.length > country.maxDigits || phone.length > 16) {
    return json({ error: `Enter a valid ${country?.name ?? "country"} phone number.` }, 400);
  }
  if (!/^[A-Za-z0-9._]{1,30}$/.test(instagram)) return json({ error: "Enter a valid Instagram username." }, 400);
  if (payload.consent !== true) return json({ error: "Please confirm the giveaway contact consent." }, 400);

  const config = getSupabasePublicConfig();
  if (!config) return json({ error: "Giveaway entries are temporarily unavailable. Please try again later." }, 503);

  try {
    const supabase = createClient(config.url, config.key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { error } = await supabase.from("giveaway_entries").insert({
      name,
      email,
      phone,
      country_code: country.dialCode,
      country_iso: country.iso,
      instagram_handle: instagram,
      consent_given: true,
    });
    if (error) return json({ error: "We could not save your entry right now. Please try again later." }, 503);
  } catch {
    return json({ error: "We could not save your entry right now. Please try again later." }, 503);
  }

  return json({ message: "Your entry has been received." }, 201);
}
