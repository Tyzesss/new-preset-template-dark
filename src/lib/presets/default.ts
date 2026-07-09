import type { SitePreset } from "./types";

const siteCity = "Twoje Miasto i okolice";
const cityLocative = "w Twoim Mieście";
const siteName = "Serwis Grzewczy";

export const defaultPreset: SitePreset = {
  id: "default",
  label: "Szablon domyślny",
  siteName,
  companyLegalName: "Serwis Grzewczy Jan Kowalski",
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
  serviceArea: "Twoje Miasto i okolice — dojazd do klienta",
  mapsQuery: "Serwis Grzewczy Twoje Miasto",
  nip: "000-000-00-00",
  regon: "000000000",
  hours: "Pn - Pt: 8:00 - 17:00",
  logoUrl: "/logo.svg",
  logoIncludesName: false,
  faviconUrl: "/favicon.svg",
  heroImage: "/gallery/placeholder-1.svg",
  siteTitle: `Serwis kotłów ${siteCity} | ${siteName}`,
  siteKeywords:
    "serwis kotłów, serwis pomp ciepła, naprawa kotła gazowego, przegląd kotła, pierwsze uruchomienie, serwis gwarancyjny",
  siteDescription: `Serwis gwarancyjny i pogwarancyjny kotłów gazowych oraz pomp ciepła ${cityLocative} i okolicach. Naprawy, przeglądy, pierwsze uruchomienia — dojazd do klienta. Zadzwoń: 600 000 000.`,
  ogImage: "/gallery/placeholder-1.svg",
  googleRating: 4.9,
  googleReviewCount: 24,
  partners: ["Buderus", "Bosch", "Junkers", "Termet", "Broetje", "Kaisai"],
  gallery: [
    {
      image: "/gallery/placeholder-1.svg",
      alt: "Przegląd i serwis kotła gazowego — realizacja serwisowa",
      caption: "Przegląd serwisowy",
    },
    {
      image: "/gallery/placeholder-2.svg",
      alt: "Serwis kaskady kotłów — konserwacja instalacji",
      caption: "Kaskada · konserwacja",
    },
    {
      image: "/gallery/placeholder-3.svg",
      alt: "Konserwacja kotła gazowego — serwis urządzenia",
      caption: "Konserwacja urządzenia",
    },
    {
      image: "/gallery/placeholder-4.svg",
      alt: "Serwis kotła kondensacyjnego — przegląd i regulacja",
      caption: "Przegląd i regulacja",
    },
    {
      image: "/gallery/placeholder-5.svg",
      alt: "Serwis pompy ciepła — diagnostyka i naprawa",
      caption: "Serwis pompy ciepła",
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
      text: "Świetny serwis — po roku zrobili przegląd, wszystko jak nowe.",
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
  heroHeadline: "Serwis i naprawa techniki grzewczej",
  heroBullets: [
    "Przeglądy, naprawy i pierwsze uruchomienia kotłów oraz pomp ciepła.",
    "Serwis gwarancyjny i pogwarancyjny.",
  ],
  footerTagline: "Serwis kotłów i pomp ciepła",
  servicesSectionSubtitle: "Przeglądy, naprawy awaryjne, uruchomienia i montaż urządzeń grzewczych.",
  gallerySectionSubtitle: "Wybrane realizacje serwisowe i instalacje grzewcze w Twojej okolicy.",
  services: [
    {
      icon: "wrench",
      title: "Serwis i naprawy kotłów gazowych",
      desc: "Diagnoza, naprawa i wymiana części. Autoryzowany serwis urządzeń grzewczych.",
    },
    {
      icon: "shield-check",
      title: "Przeglądy gwarancyjne i pogwarancyjne",
      desc: "Czyszczenie, regulacja palnika i dokumentacja. Zgodnie z wymaganiami producenta.",
    },
    {
      icon: "check-circle",
      title: "Pierwsze uruchomienia",
      desc: "Konfiguracja i testy po montażu. Przekazanie dokumentacji uruchomienia.",
    },
    {
      icon: "zap",
      title: "Serwis pomp ciepła",
      desc: "Diagnostyka i naprawy w ramach gwarancji oraz po jej zakończeniu.",
    },
    {
      icon: "alert-triangle",
      title: "Naprawa awaryjna",
      desc: "Szybka reakcja przy awarii pieca lub kotła. Termin dojazdu potwierdzamy telefonicznie.",
    },
    {
      icon: "flame",
      title: "Montaż kotłów i pomp ciepła",
      desc: "Dobór i montaż urządzeń grzewczych. Wycena przed rozpoczęciem prac.",
    },
  ],
  faqs: [
    {
      q: "Czy jesteście autoryzowanym serwisem?",
      a: `Tak. Serwisujemy kotły i pompy ciepła wiodących marek na terenie ${siteCity.toLowerCase()}.`,
    },
    {
      q: "Ile kosztuje przegląd kotła gazowego?",
      a: "Koszt zależy od zakresu czynności. Dokładną kwotę potwierdzimy przed wizytą.",
    },
    {
      q: "Ile kosztuje naprawa lub serwis awaryjny?",
      a: "Cena ustalana jest po diagnozie na miejscu — zanim przystąpimy do naprawy, przedstawimy wycenę.",
    },
    {
      q: "Jak szybko możecie pomóc przy awarii?",
      a: "W pilnych przypadkach reagujemy jak najszybciej. Zadzwoń, a potwierdzimy możliwy termin dojazdu.",
    },
    {
      q: "Czy dojeżdżacie do klienta?",
      a: `Tak. Obsługujemy ${siteCity.toLowerCase()}. Przyjeżdżamy na miejsce — bez punktu stacjonarnego.`,
    },
  ],
  serviceOptionGroups: [
    {
      label: "Serwis i naprawa",
      options: [
        "Przegląd i konserwacja",
        "Naprawa awaryjna pieca lub kotła",
        "Serwis gwarancyjny / pogwarancyjny",
      ],
    },
    {
      label: "Pierwsze uruchomienie",
      options: ["Pierwsze uruchomienie kotła", "Pierwsze uruchomienie pompy ciepła"],
    },
    {
      label: "Inne",
      options: ["Potrzebuję doradztwa"],
    },
    {
      label: "Montaż (opcjonalnie)",
      options: ["Montaż kotła gazowego", "Montaż pompy ciepła"],
    },
    {
      label: "Klimatyzacja (opcjonalnie)",
      options: ["Montaż klimatyzacji split", "Serwis klimatyzacji"],
    },
  ],
};
