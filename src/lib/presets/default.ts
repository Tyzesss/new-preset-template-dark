import type { SitePreset } from "./types";

const siteCity = "Twoje Miasto i okolice";
const cityLocative = "w Twoim Mieście";
const siteName = "Instalacje HVAC";

export const defaultPreset: SitePreset = {
  id: "default",
  label: "Szablon domyślny",
  siteName,
  companyLegalName: "Instalacje HVAC Jan Kowalski",
  siteCity,
  cityLocative,
  siteDefaultUrl: "https://twoja-domena.pl",
  email: "kontakt@twoja-domena.pl",
  phoneDisplay: "600 000 000",
  phoneE164: "+48600000000",
  address: "",
  addressStreet: "",
  addressCity: "Twoje Miasto",
  addressPostal: "",
  serviceArea: "Twoje Miasto i okolice, dojazd do klienta",
  mapsQuery: "Instalacje HVAC Twoje Miasto",
  nip: "000-000-00-00",
  regon: "000000000",
  hours: "Pn - Pt: 8:00 - 17:00",
  logoUrl: "/logo.svg",
  logoIncludesName: false,
  faviconUrl: "/favicon.svg",
  heroImage: "/gallery/placeholder-1.svg",
  siteTitle: `Klimatyzacja i HVAC ${siteCity} | ${siteName}`,
  siteKeywords:
    "klimatyzacja, montaż klimatyzacji, serwis HVAC, pompy ciepła, wentylacja, rekuperacja, serwis kotłów, naprawa awaryjna",
  siteDescription: `Montaż i serwis klimatyzacji, pomp ciepła, wentylacji oraz urządzeń grzewczych ${cityLocative} i okolicach. Dojazd do klienta. Zadzwoń: 600 000 000.`,
  ogImage: "/gallery/placeholder-1.svg",
  googleRating: 4.9,
  googleReviewCount: 24,
  partners: ["Daikin", "Mitsubishi", "Gree", "Bosch", "Vaillant", "Samsung"],
  gallery: [
    {
      image: "/gallery/placeholder-1.svg",
      alt: "Montaż klimatyzacji split, realizacja instalacyjna",
      caption: "Montaż klimatyzacji",
    },
    {
      image: "/gallery/placeholder-2.svg",
      alt: "Serwis pompy ciepła, diagnostyka i konserwacja",
      caption: "Serwis pompy ciepła",
    },
    {
      image: "/gallery/placeholder-3.svg",
      alt: "Instalacja rekuperacji, wentylacja mechaniczna",
      caption: "Rekuperacja",
    },
    {
      image: "/gallery/placeholder-4.svg",
      alt: "Przegląd i serwis kotła gazowego, konserwacja",
      caption: "Serwis ogrzewania",
    },
    {
      image: "/gallery/placeholder-5.svg",
      alt: "Montaż klimatyzacji w budynku komercyjnym",
      caption: "Klimatyzacja komercyjna",
    },
  ],
  reviews: [
    {
      name: "Anna K.",
      text: "Szybka reakcja i fachowa obsługa. Polecam każdemu, kto szuka solidnego serwisu w okolicy.",
      source: "google",
      rating: 5,
      relativeTime: "2 mies. temu",
    },
    {
      name: "Marek W.",
      text: "Profesjonalna ekipa. Przyjechali na czas, wszystko działa idealnie po naprawie.",
      source: "google",
      rating: 5,
      relativeTime: "3 mies. temu",
    },
    {
      name: "Justyna P.",
      text: "Konkretna wycena i super doradztwo przy wyborze rozwiązania. Bardzo polecam.",
      source: "google",
      rating: 5,
      relativeTime: "4 mies. temu",
    },
    {
      name: "Tomasz L.",
      text: "Świetny serwis. Po roku zrobili przegląd, wszystko jak nowe.",
      source: "google",
      rating: 5,
      relativeTime: "5 mies. temu",
    },
    {
      name: "Karolina M.",
      text: "Polecam! Konkretni, kulturalni i bardzo szybcy. Pełne zadowolenie z usługi.",
      source: "google",
      rating: 5,
      relativeTime: "6 mies. temu",
    },
  ],
  heroHeadline: "Montaż i serwis instalacji HVAC",
  heroBullets: [
    "Klimatyzacja, pompy ciepła, wentylacja i ogrzewanie. Od montażu po serwis.",
    "Obsługa gwarancyjna i pogwarancyjna z dojazdem do klienta.",
  ],
  footerTagline: "Klimatyzacja, pompy ciepła i HVAC",
  servicesSectionSubtitle:
    "Montaż, serwis i przeglądy klimatyzacji, pomp ciepła, wentylacji oraz urządzeń grzewczych.",
  gallerySectionSubtitle: "Wybrane realizacje montażowe i serwisowe w Twojej okolicy.",
  services: [
    {
      icon: "check-circle",
      title: "Montaż klimatyzacji",
      desc: "Dobór mocy, montaż split i multi-split. Uruchomienie i przekazanie dokumentacji.",
    },
    {
      icon: "wrench",
      title: "Serwis klimatyzacji",
      desc: "Czyszczenie, odgrzybianie, uzupełnianie czynnika i naprawa usterek.",
    },
    {
      icon: "zap",
      title: "Montaż i serwis pomp ciepła",
      desc: "Instalacja, pierwsze uruchomienie, diagnostyka i naprawy gwarancyjne oraz pogwarancyjne.",
    },
    {
      icon: "shield-check",
      title: "Wentylacja i rekuperacja",
      desc: "Montaż i serwis instalacji wentylacyjnych. Regulacja i konserwacja rekuperatorów.",
    },
    {
      icon: "flame",
      title: "Serwis kotłów i ogrzewania",
      desc: "Przeglądy, naprawy i pierwsze uruchomienia kotłów gazowych i urządzeń grzewczych.",
    },
    {
      icon: "alert-triangle",
      title: "Naprawa awaryjna HVAC",
      desc: "Szybka reakcja przy awarii klimatyzacji, pompy lub ogrzewania. Termin potwierdzamy telefonicznie.",
    },
  ],
  // Przykład pod mix HVAC — przy kliencie przepisz FAQ pod jego profil (klima / pompy / kotły / wentylacja).
  faqs: [
    {
      q: "Czy montujecie i serwisujecie klimatyzację?",
      a: `Tak. Montaż, serwis i przeglądy klimatyzacji na terenie ${siteCity.toLowerCase()}.`,
    },
    {
      q: "Ile kosztuje montaż klimatyzacji?",
      a: "Koszt zależy od mocy urządzenia i zakresu prac. Dokładną wycenę przedstawimy po oględzinach lub krótkiej rozmowie.",
    },
    {
      q: "Czy serwisujecie pompy ciepła i kotły?",
      a: `Tak. Obsługujemy pompy ciepła, wentylację oraz urządzenia grzewcze ${cityLocative} i okolicach.`,
    },
    {
      q: "Jak szybko możecie pomóc przy awarii?",
      a: "W pilnych przypadkach reagujemy jak najszybciej. Zadzwoń, a potwierdzimy możliwy termin dojazdu.",
    },
    {
      q: "Czy dojeżdżacie do klienta?",
      a: `Tak. Obsługujemy ${siteCity.toLowerCase()}. Przyjeżdżamy na miejsce, bez punktu stacjonarnego.`,
    },
  ],
  serviceOptionGroups: [
    {
      label: "Klimatyzacja",
      options: ["Montaż klimatyzacji split", "Serwis i przegląd klimatyzacji", "Naprawa awaryjna klimatyzacji"],
    },
    {
      label: "Pompy ciepła",
      options: [
        "Montaż pompy ciepła",
        "Pierwsze uruchomienie pompy ciepła",
        "Serwis gwarancyjny / pogwarancyjny",
      ],
    },
    {
      label: "Wentylacja i ogrzewanie",
      options: ["Montaż rekuperacji", "Serwis kotła gazowego", "Przegląd i konserwacja ogrzewania"],
    },
    {
      label: "Inne",
      options: ["Potrzebuję doradztwa", "Naprawa awaryjna HVAC"],
    },
  ],
};
