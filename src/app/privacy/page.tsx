import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return <LegalPage title="Privacy" intro="How information submitted through KnightFX Trading Labs may be handled." sections={[
    { title: "Information you provide", paragraphs: ["If you choose to enter a KnightFX giveaway, the website asks for your name, email address, phone number and country calling code, Instagram username, and your consent to use these details for the giveaway. Do not submit passwords, payment details or other sensitive information."] },
    { title: "How information is used", paragraphs: ["Giveaway details are used to administer the entry and contact you about it. They are not displayed publicly. Contact through Telegram or other community platforms is handled by those services under their own privacy policies."] },
    { title: "Storage and requests", paragraphs: ["Giveaway entries are stored in KnightFX’s Supabase database with access restricted to authorized administrators. You can ask to access or remove your entry by contacting KnightFX through the official Telegram account."] },
  ]} />;
}
