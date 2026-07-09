export type GalleryItem = {
  image: string;
  alt: string;
  caption?: string;
};

export type ReviewItem = {
  name?: string;
  text: string;
  source?: "google";
  rating?: number;
  publishedAt?: string;
  relativeTime?: string;
  postedAt?: string;
};

export type ServiceIcon =
  | "wrench"
  | "shield-check"
  | "zap"
  | "alert-triangle"
  | "check-circle"
  | "flame";

export type ServiceItem = {
  icon: ServiceIcon;
  title: string;
  desc: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type FormOptionGroup = {
  label: string;
  options: string[];
};

export type SitePreset = {
  id: string;
  label: string;
  siteName: string;
  companyLegalName: string;
  siteCity: string;
  cityLocative: string;
  siteDefaultUrl: string;
  email: string;
  phoneDisplay: string;
  phoneE164: string;
  address: string;
  addressStreet: string;
  addressCity: string;
  addressPostal: string;
  /** Gdy brak siedziby — tekst zamiast adresu, np. „Miasto i okolice — dojazd do klienta”. */
  serviceArea?: string;
  mapsQuery: string;
  mapsUrl?: string;
  nip: string;
  regon: string;
  hours: string;
  logoUrl?: string;
  /** Gdy false (domyślnie) — obok logo wyświetla się widoczny `siteName` (dla logotypów bez napisu). */
  logoIncludesName?: boolean;
  /** Ikona zakładki; domyślnie = logoUrl. Ustaw wycinek/kwadrat logo jako favicon. */
  faviconUrl?: string;
  heroImage?: string;
  siteTitle: string;
  siteKeywords: string;
  siteDescription?: string;
  ogImage: string;
  googleRating: number;
  googleReviewCount: number;
  googlePlaceId?: string;
  googleReviewsUrl?: string;
  googleWriteReviewUrl?: string;
  partners?: string[];
  gallery: GalleryItem[];
  reviews: ReviewItem[];
  heroHeadline: string;
  heroBullets: string[];
  footerTagline: string;
  servicesSectionSubtitle: string;
  gallerySectionSubtitle: string;
  services: ServiceItem[];
  faqs: FaqItem[];
  serviceOptionGroups: FormOptionGroup[];
};
