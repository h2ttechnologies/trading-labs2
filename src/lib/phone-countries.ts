export type PhoneCountry = {
  iso: string;
  name: string;
  dialCode: string;
  minDigits: number;
  maxDigits: number;
};

// National number lengths for the countries most commonly represented in the
// KnightFX community. The selected ISO region determines the saved dial code.
export const phoneCountries: PhoneCountry[] = [
  { iso: "AF", name: "Afghanistan", dialCode: "+93", minDigits: 9, maxDigits: 9 },
  { iso: "AL", name: "Albania", dialCode: "+355", minDigits: 9, maxDigits: 9 },
  { iso: "DZ", name: "Algeria", dialCode: "+213", minDigits: 9, maxDigits: 9 },
  { iso: "AR", name: "Argentina", dialCode: "+54", minDigits: 10, maxDigits: 10 },
  { iso: "AM", name: "Armenia", dialCode: "+374", minDigits: 8, maxDigits: 8 },
  { iso: "AU", name: "Australia", dialCode: "+61", minDigits: 9, maxDigits: 9 },
  { iso: "AT", name: "Austria", dialCode: "+43", minDigits: 7, maxDigits: 13 },
  { iso: "AZ", name: "Azerbaijan", dialCode: "+994", minDigits: 9, maxDigits: 9 },
  { iso: "BH", name: "Bahrain", dialCode: "+973", minDigits: 8, maxDigits: 8 },
  { iso: "BD", name: "Bangladesh", dialCode: "+880", minDigits: 10, maxDigits: 10 },
  { iso: "BY", name: "Belarus", dialCode: "+375", minDigits: 9, maxDigits: 9 },
  { iso: "BE", name: "Belgium", dialCode: "+32", minDigits: 9, maxDigits: 9 },
  { iso: "BG", name: "Bulgaria", dialCode: "+359", minDigits: 9, maxDigits: 9 },
  { iso: "BR", name: "Brazil", dialCode: "+55", minDigits: 10, maxDigits: 11 },
  { iso: "KH", name: "Cambodia", dialCode: "+855", minDigits: 8, maxDigits: 9 },
  { iso: "CA", name: "Canada", dialCode: "+1", minDigits: 10, maxDigits: 10 },
  { iso: "CL", name: "Chile", dialCode: "+56", minDigits: 9, maxDigits: 9 },
  { iso: "CN", name: "China", dialCode: "+86", minDigits: 11, maxDigits: 11 },
  { iso: "CO", name: "Colombia", dialCode: "+57", minDigits: 10, maxDigits: 10 },
  { iso: "HR", name: "Croatia", dialCode: "+385", minDigits: 8, maxDigits: 9 },
  { iso: "CY", name: "Cyprus", dialCode: "+357", minDigits: 8, maxDigits: 8 },
  { iso: "CZ", name: "Czechia", dialCode: "+420", minDigits: 9, maxDigits: 9 },
  { iso: "DK", name: "Denmark", dialCode: "+45", minDigits: 8, maxDigits: 8 },
  { iso: "EG", name: "Egypt", dialCode: "+20", minDigits: 10, maxDigits: 10 },
  { iso: "EC", name: "Ecuador", dialCode: "+593", minDigits: 9, maxDigits: 9 },
  { iso: "FI", name: "Finland", dialCode: "+358", minDigits: 5, maxDigits: 12 },
  { iso: "FR", name: "France", dialCode: "+33", minDigits: 9, maxDigits: 9 },
  { iso: "GE", name: "Georgia", dialCode: "+995", minDigits: 9, maxDigits: 9 },
  { iso: "DE", name: "Germany", dialCode: "+49", minDigits: 5, maxDigits: 12 },
  { iso: "GH", name: "Ghana", dialCode: "+233", minDigits: 9, maxDigits: 9 },
  { iso: "GR", name: "Greece", dialCode: "+30", minDigits: 10, maxDigits: 10 },
  { iso: "HK", name: "Hong Kong", dialCode: "+852", minDigits: 8, maxDigits: 8 },
  { iso: "HU", name: "Hungary", dialCode: "+36", minDigits: 8, maxDigits: 9 },
  { iso: "IN", name: "India", dialCode: "+91", minDigits: 10, maxDigits: 10 },
  { iso: "ID", name: "Indonesia", dialCode: "+62", minDigits: 8, maxDigits: 12 },
  { iso: "IE", name: "Ireland", dialCode: "+353", minDigits: 7, maxDigits: 10 },
  { iso: "IL", name: "Israel", dialCode: "+972", minDigits: 9, maxDigits: 9 },
  { iso: "IS", name: "Iceland", dialCode: "+354", minDigits: 7, maxDigits: 7 },
  { iso: "IR", name: "Iran", dialCode: "+98", minDigits: 10, maxDigits: 10 },
  { iso: "IQ", name: "Iraq", dialCode: "+964", minDigits: 10, maxDigits: 10 },
  { iso: "IT", name: "Italy", dialCode: "+39", minDigits: 6, maxDigits: 11 },
  { iso: "JP", name: "Japan", dialCode: "+81", minDigits: 9, maxDigits: 10 },
  { iso: "KE", name: "Kenya", dialCode: "+254", minDigits: 9, maxDigits: 9 },
  { iso: "KW", name: "Kuwait", dialCode: "+965", minDigits: 8, maxDigits: 8 },
  { iso: "KZ", name: "Kazakhstan", dialCode: "+7", minDigits: 10, maxDigits: 10 },
  { iso: "JO", name: "Jordan", dialCode: "+962", minDigits: 9, maxDigits: 9 },
  { iso: "LB", name: "Lebanon", dialCode: "+961", minDigits: 7, maxDigits: 8 },
  { iso: "MY", name: "Malaysia", dialCode: "+60", minDigits: 7, maxDigits: 10 },
  { iso: "MX", name: "Mexico", dialCode: "+52", minDigits: 10, maxDigits: 10 },
  { iso: "MA", name: "Morocco", dialCode: "+212", minDigits: 9, maxDigits: 9 },
  { iso: "MM", name: "Myanmar", dialCode: "+95", minDigits: 8, maxDigits: 10 },
  { iso: "NP", name: "Nepal", dialCode: "+977", minDigits: 10, maxDigits: 10 },
  { iso: "NL", name: "Netherlands", dialCode: "+31", minDigits: 9, maxDigits: 9 },
  { iso: "NZ", name: "New Zealand", dialCode: "+64", minDigits: 8, maxDigits: 10 },
  { iso: "NG", name: "Nigeria", dialCode: "+234", minDigits: 10, maxDigits: 10 },
  { iso: "NO", name: "Norway", dialCode: "+47", minDigits: 8, maxDigits: 8 },
  { iso: "OM", name: "Oman", dialCode: "+968", minDigits: 8, maxDigits: 8 },
  { iso: "PK", name: "Pakistan", dialCode: "+92", minDigits: 10, maxDigits: 10 },
  { iso: "PE", name: "Peru", dialCode: "+51", minDigits: 9, maxDigits: 9 },
  { iso: "PH", name: "Philippines", dialCode: "+63", minDigits: 10, maxDigits: 10 },
  { iso: "PL", name: "Poland", dialCode: "+48", minDigits: 9, maxDigits: 9 },
  { iso: "PT", name: "Portugal", dialCode: "+351", minDigits: 9, maxDigits: 9 },
  { iso: "QA", name: "Qatar", dialCode: "+974", minDigits: 8, maxDigits: 8 },
  { iso: "RO", name: "Romania", dialCode: "+40", minDigits: 9, maxDigits: 9 },
  { iso: "RU", name: "Russia", dialCode: "+7", minDigits: 10, maxDigits: 10 },
  { iso: "SA", name: "Saudi Arabia", dialCode: "+966", minDigits: 9, maxDigits: 9 },
  { iso: "RS", name: "Serbia", dialCode: "+381", minDigits: 9, maxDigits: 9 },
  { iso: "SG", name: "Singapore", dialCode: "+65", minDigits: 8, maxDigits: 8 },
  { iso: "SK", name: "Slovakia", dialCode: "+421", minDigits: 9, maxDigits: 9 },
  { iso: "ZA", name: "South Africa", dialCode: "+27", minDigits: 9, maxDigits: 9 },
  { iso: "KR", name: "South Korea", dialCode: "+82", minDigits: 9, maxDigits: 10 },
  { iso: "ES", name: "Spain", dialCode: "+34", minDigits: 9, maxDigits: 9 },
  { iso: "LK", name: "Sri Lanka", dialCode: "+94", minDigits: 9, maxDigits: 9 },
  { iso: "SE", name: "Sweden", dialCode: "+46", minDigits: 7, maxDigits: 10 },
  { iso: "CH", name: "Switzerland", dialCode: "+41", minDigits: 9, maxDigits: 9 },
  { iso: "TW", name: "Taiwan", dialCode: "+886", minDigits: 9, maxDigits: 9 },
  { iso: "TH", name: "Thailand", dialCode: "+66", minDigits: 9, maxDigits: 9 },
  { iso: "TZ", name: "Tanzania", dialCode: "+255", minDigits: 9, maxDigits: 9 },
  { iso: "TR", name: "Türkiye", dialCode: "+90", minDigits: 10, maxDigits: 10 },
  { iso: "AE", name: "United Arab Emirates", dialCode: "+971", minDigits: 9, maxDigits: 9 },
  { iso: "GB", name: "United Kingdom", dialCode: "+44", minDigits: 10, maxDigits: 10 },
  { iso: "US", name: "United States", dialCode: "+1", minDigits: 10, maxDigits: 10 },
  { iso: "VN", name: "Vietnam", dialCode: "+84", minDigits: 9, maxDigits: 10 },
  { iso: "UZ", name: "Uzbekistan", dialCode: "+998", minDigits: 9, maxDigits: 9 },
  { iso: "ZW", name: "Zimbabwe", dialCode: "+263", minDigits: 9, maxDigits: 9 },
];

const nationalTrunkPrefixes: Record<string, string> = {
  AF: "0", AL: "0", DZ: "0", AM: "0", AU: "0", AT: "0", AZ: "0", BD: "0",
  BY: "8", BE: "0", BG: "0", KH: "0", HR: "0", EG: "0", EC: "0", FI: "0",
  FR: "0", GE: "0", DE: "0", IN: "0", ID: "0", IE: "0", IL: "0", IR: "0",
  IQ: "0", JP: "0", KE: "0", KZ: "8", JO: "0", LB: "0", MY: "0", MA: "0",
  MM: "0", NP: "0", NL: "0", NZ: "0", NG: "0", PK: "0", PH: "0", RO: "0",
  RU: "8", SA: "0", RS: "0", SK: "0", ZA: "0", KR: "0", LK: "0", SE: "0",
  CH: "0", TW: "0", TH: "0", TZ: "0", TR: "0", AE: "0", GB: "0", VN: "0",
  UZ: "8", ZW: "0",
};

export function getPhoneCountry(iso: string) {
  return phoneCountries.find((country) => country.iso === iso) ?? null;
}

export function normalizeNationalPhone(iso: string, value: string) {
  const digits = value.replace(/\D/g, "");
  const trunkPrefix = nationalTrunkPrefixes[iso];
  return trunkPrefix && digits.startsWith(trunkPrefix) ? digits.slice(trunkPrefix.length) : digits;
}
