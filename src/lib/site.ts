/** Konfiguracja strony — aktywny preset w .env (VITE_CITY_PRESET) lub edycja plików w src/lib/presets/ */

import { getActivePreset, PRESET_IDS, type PresetId } from "@/lib/presets";

const preset = getActivePreset();

export { PRESET_IDS, type PresetId };

export const SITE_PRESET_ID = preset.id;
export const SITE_NAME = preset.siteName;
export const COMPANY_LEGAL_NAME = preset.companyLegalName;
export const SITE_CITY = preset.siteCity;
export const CITY_LOCATIVE = preset.cityLocative;

export const NIP = preset.nip;
export const REGON = preset.regon;

export const PHONE_DISPLAY = preset.phoneDisplay;
export const PHONE_E164 = preset.phoneE164;
export const PHONE_HREF = `tel:${PHONE_E164}`;
export const SMS_HREF = `sms:${PHONE_E164}`;

const WHATSAPP_TEXT = encodeURIComponent("Dzień dobry, chciałbym zgłosić zlecenie serwisowe.");
export const WHATSAPP_HREF = `https://wa.me/${PHONE_E164.replace("+", "")}?text=${WHATSAPP_TEXT}`;

export const EMAIL = preset.email;
export const EMAIL_HREF = `mailto:${EMAIL}`;

export const ADDRESS = preset.address;
export const ADDRESS_STREET = preset.addressStreet;
export const ADDRESS_CITY = preset.addressCity;
export const ADDRESS_POSTAL = preset.addressPostal;
export const SERVICE_AREA = preset.serviceArea ?? "";
export const HAS_STREET_ADDRESS = Boolean(preset.addressStreet?.trim());

const physicalAddress =
  preset.address?.trim() ||
  [preset.addressStreet, preset.addressPostal, preset.addressCity]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(", ");

export const HAS_PHYSICAL_ADDRESS = Boolean(physicalAddress);
export const PHYSICAL_ADDRESS = physicalAddress;
/** Kontakt: adres firmy ma pierwszeństwo; bez adresu → obszar działania. */
export const CONTACT_LOCATION = HAS_PHYSICAL_ADDRESS ? physicalAddress : SERVICE_AREA;
export const CONTACT_LOCATION_LABEL = HAS_PHYSICAL_ADDRESS ? "Adres" : "Obszar działania";
export const HOURS = preset.hours;
export const MAPS_URL =
  preset.mapsUrl ?? `https://maps.google.com/?q=${encodeURIComponent(preset.mapsQuery)}`;

export const LOGO_URL = preset.logoUrl;
export const LOGO_INCLUDES_NAME = preset.logoIncludesName ?? false;
export const FAVICON_URL = preset.faviconUrl ?? preset.logoUrl ?? "/favicon.svg";
export const HERO_IMAGE = preset.heroImage;
export const PARTNERS = preset.partners ?? [];

export const GOOGLE_RATING = preset.googleRating;
export const GOOGLE_REVIEW_COUNT = preset.googleReviewCount;
export const GOOGLE_REVIEWS_URL = preset.googleReviewsUrl ?? MAPS_URL;
export const GOOGLE_WRITE_REVIEW_URL = preset.googleWriteReviewUrl ?? "";

export const SITE_TITLE = preset.siteTitle;
export const SITE_KEYWORDS = preset.siteKeywords;
export const SITE_DESCRIPTION =
  preset.siteDescription ??
  `Serwis kotłów i pomp ciepła ${CITY_LOCATIVE} i okolicach. Naprawy, przeglądy, pierwsze uruchomienia. Zadzwoń: ${PHONE_DISPLAY}.`;
export const SITE_OG_IMAGE = preset.ogImage;

export const GALLERY = preset.gallery;
export const REVIEWS = preset.reviews;

export const HERO_HEADLINE = preset.heroHeadline;
export const HERO_BULLETS = preset.heroBullets;
export const FOOTER_TAGLINE = preset.footerTagline;
export const SERVICES_SECTION_SUBTITLE = preset.servicesSectionSubtitle;
export const GALLERY_SECTION_SUBTITLE = preset.gallerySectionSubtitle;
export const SERVICES = preset.services;
export const FAQS = preset.faqs;
export const SERVICE_OPTION_GROUPS = preset.serviceOptionGroups;

export const SITE_DEFAULT_URL = preset.siteDefaultUrl;

/** Nadpisz w .env: VITE_SITE_URL=https://twoja-domena.pl */
export const SITE_URL = import.meta.env.VITE_SITE_URL as string | undefined;

export function siteBaseUrl(): string {
  return SITE_URL ?? SITE_DEFAULT_URL;
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteBaseUrl()).href;
}
