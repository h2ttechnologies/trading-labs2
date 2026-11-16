"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Check, Gift, ShieldCheck, X } from "lucide-react";
import { getPhoneCountry, normalizeNationalPhone, phoneCountries } from "@/lib/phone-countries";

const SUBMITTED_KEY = "knightfx-giveaway-entry-submitted";
const DISMISSED_KEY = "knightfx-giveaway-entry-dismissed";
export function GiveawayEntryPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [countryIso, setCountryIso] = useState("IN");
  const nameRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (["/privacy", "/terms", "/risk-disclosure", "/affiliate-disclosure"].includes(pathname) || pathname.startsWith("/admin")) return;
    try {
      if (window.localStorage.getItem(SUBMITTED_KEY) || window.sessionStorage.getItem(DISMISSED_KEY)) return;
    } catch {
      // The popup can still be used when browser storage is unavailable.
    }
    const timer = window.setTimeout(() => setOpen(true), 1100);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("modal-open");
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusTimer = window.setTimeout(() => nameRef.current?.focus(), 80);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.classList.remove("modal-open");
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [open]);

  function close() {
    try {
      if (!submitted) window.sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // Dismissal remains available for this render even without browser storage.
    }
    setOpen(false);
  }

  function openEntry() {
    setError("");
    setOpen(true);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      close();
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  async function submitEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = event.currentTarget;
    const values = new FormData(form);
    const email = String(values.get("email") ?? "").trim().toLowerCase();
    const selectedIso = String(values.get("countryIso") ?? "");
    const phoneCountry = getPhoneCountry(selectedIso);
    const phoneInput = String(values.get("phoneNumber") ?? "").trim();
    const phoneDigits = normalizeNationalPhone(selectedIso, phoneInput);
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      setBusy(false);
      return;
    }
    if (!phoneCountry || !/^[0-9\s().-]+$/.test(phoneInput) || phoneDigits.length < phoneCountry.minDigits || phoneDigits.length > phoneCountry.maxDigits) {
      setError(`Enter a valid ${phoneCountry?.name ?? "country"} phone number.`);
      setBusy(false);
      return;
    }
    if ((phoneCountry.dialCode.slice(1) + phoneDigits).length > 15) {
      setError("This phone number is too long for an international number.");
      setBusy(false);
      return;
    }
    try {
      const response = await fetch("/api/giveaway-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.get("name"),
          email,
          countryIso: selectedIso,
          phoneNumber: phoneInput,
          instagram: values.get("instagram"),
          consent: values.get("consent") === "on",
          website: values.get("website"),
        }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) {
        setError(result.error ?? "We could not save your entry right now. Please try again.");
        setBusy(false);
        return;
      }
      try { window.localStorage.setItem(SUBMITTED_KEY, "1"); } catch { /* Keep the success state in memory. */ }
      setSubmitted(true);
    } catch {
      setError("Connection issue. Please check your internet and try again.");
    }
    setBusy(false);
  }

  return (
    <>
      <button className="giveaway-trigger" type="button" onClick={openEntry} aria-haspopup="dialog" aria-label="Enter the KnightFX giveaway">
        <Gift size={16} aria-hidden="true" /><span>Enter giveaway</span><ArrowUpRight size={13} aria-hidden="true" />
      </button>
      {open && <div className="giveaway-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div
        ref={dialogRef}
        className="giveaway-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="giveaway-title"
        aria-describedby="giveaway-description"
        onKeyDown={handleKeyDown}
      >
        <button className="giveaway-close" type="button" onClick={close} aria-label="Close giveaway entry">
          <X size={18} />
        </button>
        <div className="giveaway-content">
          <span className="eyebrow"><i /> KNIGHTFX GIVEAWAY</span>
          {submitted ? (
            <div className="giveaway-success" role="status">
              <span className="giveaway-success-icon"><Check size={20} /></span>
              <h2 id="giveaway-title">You’re <em>in.</em></h2>
              <p id="giveaway-description">Your details have been saved. We’ll contact you about your giveaway entry.</p>
              <button className="button button-silver giveaway-submit" type="button" onClick={close}>Continue to site <ArrowUpRight size={15} /></button>
            </div>
          ) : (
            <>
              <h2 id="giveaway-title">Join the <em>giveaway.</em></h2>
              <p id="giveaway-description" className="giveaway-intro">Leave your details to enter the KnightFX community giveaway.</p>
              <form className="giveaway-form" onSubmit={submitEntry}>
                <div className="giveaway-form-grid">
                  <label className="giveaway-field">Full name
                    <input ref={nameRef} name="name" type="text" autoComplete="name" minLength={2} maxLength={80} placeholder="Your name" required />
                  </label>
                  <label className="giveaway-field">Email address
                    <input name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" required />
                  </label>
                  <label className="giveaway-field giveaway-phone-field">Phone number
                    <span className="giveaway-phone-control">
                      <select name="countryIso" value={countryIso} autoComplete="country" aria-label="Country calling code" onChange={(event) => setCountryIso(event.target.value)} required>
                        {phoneCountries.map((country) => <option key={country.iso} value={country.iso}>{country.name} ({country.dialCode})</option>)}
                      </select>
                      <span className="giveaway-national-control"><b>{getPhoneCountry(countryIso)?.dialCode}</b><input name="phoneNumber" type="tel" autoComplete="tel-national" inputMode="tel" maxLength={20} placeholder="National number" aria-label="Phone number without country code" required /></span>
                    </span>
                  </label>
                  <label className="giveaway-field giveaway-instagram-field">Instagram username
                    <span className="giveaway-instagram-input"><b aria-hidden="true">@</b><input name="instagram" type="text" autoComplete="off" maxLength={31} placeholder="yourusername" required /></span>
                  </label>
                </div>
                <label className="giveaway-honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
                <label className="giveaway-consent">
                  <input name="consent" type="checkbox" required />
                  <span>I agree KnightFX may use these details to manage this giveaway and contact me about my entry. <Link href="/privacy" onClick={close}>Privacy policy</Link>.</span>
                </label>
                {error && <p className="giveaway-error" role="alert">{error}</p>}
                <button className="button button-silver giveaway-submit" type="submit" disabled={busy}>
                  {busy ? "Saving entry…" : "Enter giveaway"}<ArrowUpRight size={15} />
                </button>
              </form>
              <p className="giveaway-privacy-note"><ShieldCheck size={13} /> Your details are stored privately and are not shown publicly.</p>
            </>
          )}
        </div>
      </div>
      </div>}
    </>
  );
}
