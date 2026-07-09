# TEMPLATE — przewodnik personalizacji

Ten dokument opisuje krok po kroku, jak z szablonu zrobić stronę dla nowego klienta.

## Architektura

```
.env (VITE_CITY_PRESET, VITE_SITE_URL)
        ↓
src/lib/presets/klient.ts   ← JEDYNY plik do edycji treści
        ↓
src/lib/site.ts             ← eksport stałych (nie edytuj)
        ↓
komponenty + strony         ← layout (nie edytuj)
```

## Krok 1 — Nowy preset klienta

1. Skopiuj `src/lib/presets/default.ts` → `src/lib/presets/nazwa-klienta.ts`
2. Zmień `id` i `label` na unikalne (np. `firma-krakow`)
3. Uzupełnij wszystkie pola — poniżej opis każdej sekcji

### Dane firmy

| Pole | Przykład | Uwagi |
|------|----------|-------|
| `siteName` | `TermoSerwis` | Krótka nazwa marki |
| `companyLegalName` | `TermoSerwis Jan Kowalski` | Pełna nazwa (RODO, schema) |
| `siteCity` | `Kraków i okolice` | Pod H1 w hero |
| `cityLocative` | `w Krakowie` | Do opisów SEO |
| `email` | `kontakt@termoserwis.pl` | |
| `phoneDisplay` | `12 345 67 89` | Format wyświetlany |
| `phoneE164` | `+48123456789` | WhatsApp, tel: link |
| `nip` / `regon` | | Footer + RODO |
| `hours` | `Pn - Pt: 8:00 - 17:00` | |
| `serviceArea` | `Kraków i okolice — dojazd` | Gdy brak adresu stacjonarnego |
| `address*` | | Zostaw puste, jeśli tylko dojazd |

### SEO i linki

| Pole | Uwagi |
|------|-------|
| `siteDefaultUrl` | Domena klienta |
| `siteTitle` | Tytuł w Google (max ~60 znaków) |
| `siteKeywords` | Słowa kluczowe, przecinkami |
| `siteDescription` | Meta description |
| `mapsUrl` | Link do profilu Google Maps |
| `googleReviewsUrl` | Ten sam lub osobny link do opinii |
| `googlePlaceId` | Opcjonalnie — żywe opinie z API |

### Treści strony

| Pole | Co zawiera |
|------|------------|
| `heroHeadline` | Główny nagłówek H1 |
| `heroBullets` | 2–3 punkty pod nagłówkiem |
| `footerTagline` | Krótki opis w stopce |
| `services` | 6 kart usług (icon + title + desc) |
| `faqs` | Pytania i odpowiedzi |
| `serviceOptionGroups` | Opcje w formularzu kontaktowym |
| `partners` | Marki w sekcji partnerów |
| `reviews` | Opinie fallback (gdy brak Google API) |
| `gallery` | Zdjęcia realizacji |

### Ikony usług

Dostępne wartości `icon` w `services[]`:

`wrench` · `shield-check` · `check-circle` · `zap` · `alert-triangle` · `flame`

## Krok 2 — Rejestracja presetu

W `src/lib/presets/index.ts`:

```ts
import { firmaKrakowPreset } from "./firma-krakow";

export type PresetId = "default" | "firma-krakow";

export const PRESETS: Record<PresetId, SitePreset> = {
  default: defaultPreset,
  "firma-krakow": firmaKrakowPreset,
};
```

## Krok 3 — Zmienne środowiskowe

W `.env` (lokalnie) i Vercel (produkcja):

```env
VITE_SITE_URL=https://domena-klienta.pl
VITE_CITY_PRESET=firma-krakow
VITE_WEB3FORMS_ACCESS_KEY=klucz_z_web3forms
```

## Krok 4 — Assety

### Logo

Wgraj do `public/` i ustaw `logoUrl` w presetcie:

```ts
logoUrl: "/logo.png",  // lub "/logo.svg"
```

### Galeria i hero

1. Wgraj zdjęcia JPG do `public/gallery/`
2. Uruchom `node scripts/optimize-gallery.mjs` (konwersja do WebP)
3. Zaktualizuj `gallery[]`, `heroImage`, `ogImage` w presetcie

### Favicon

Zamień `public/favicon.svg` (opcjonalnie dodaj `favicon.png`).

## Krok 5 — Kolory marki

W `src/styles.css` dostosuj:

- `--brand-teal`, `--brand-cyan` — akcenty
- `--cta`, `--cta-hover` — przyciski
- `--primary`, `--accent` — ogólna paleta

## Krok 6 — Formularz (Web3Forms)

1. Załóż konto na [web3forms.com](https://web3forms.com)
2. Utwórz Access Key z mailem klienta
3. Wklej klucz do `VITE_WEB3FORMS_ACCESS_KEY`
4. Przetestuj formularz na żywej domenie

## Krok 7 — Build i deploy

```bash
npm run generate:seo   # odświeża robots.txt + sitemap.xml
npm run build          # weryfikacja
```

Deploy na Vercel z env vars z kroku 3.

## Checklist końcowy

- [ ] Zero placeholderów („Twoje Miasto”, „600 000 000”, „LOGO”)
- [ ] Wszystkie zdjęcia załadowane i widoczne
- [ ] Telefon, WhatsApp, e-mail działają
- [ ] Formularz wysyła maile
- [ ] Google Maps link prowadzi do profilu klienta
- [ ] RODO zawiera prawdziwe NIP/REGON
- [ ] `robots.txt` i `sitemap.xml` mają domenę klienta
- [ ] Mobile: sticky bar, karuzele, formularz

## Czego NIE edytować

Te pliki to silnik szablonu — zostaw bez zmian przy personalizacji:

- `src/routes/index.tsx` — layout strony
- `src/components/*` — komponenty UI
- `src/lib/site.ts` — eksport presetu
- `src/lib/schema.ts` — JSON-LD (czyta z site.ts)
- `src/lib/web3forms.ts` — logika formularza

Wyjątek: jeśli klient potrzebuje **nowej sekcji** lub **innego układu** — wtedy edytujesz komponenty.

---

## Prompt AI — personalizacja pod leada (copy-paste)

Użyj tego promptu w Cursorze / agencie do masowego robienia free-value podglądów stron.

```
Przeanalizuj treść, strukturę, kolorystykę i zasoby z:
- Strona klienta: [URL STRONY KLIENTA]
- Google Maps: [URL MAPY]

Zrób rebrand mojego szablonu TanStack Start (src/lib/presets/) pod tę firmę. Strona ma wyglądać jak zaprojektowana dla nich (kolory, logo, zdjęcia, dane), ale z zachowaniem układu UX i premium tonu szablonu.

---

ARCHITEKTURA SZABLONU — CO EDYTUJESZ, A CZEGO NIE

Jedyny plik z treścią klienta: skopiuj src/lib/presets/default.ts → src/lib/presets/[id-klienta].ts, edytuj, zarejestruj w src/lib/presets/index.ts.

Wszystko idzie przez preset → src/lib/site.ts → komponenty. Nie hardcoduj danych w site.ts, index.tsx, schema.ts.

| Plik | Kiedy edytować |
|------|----------------|
| src/lib/presets/[klient].ts | Zawsze — główna personalizacja |
| src/styles.css | Kolory marki |
| public/logo.*, public/gallery/*, public/favicon.* | Logo, zdjęcia, favicon |
| src/lib/presets/types.ts + index.tsx (SERVICE_ICONS) | Tylko gdy potrzebujesz nowej ikony usługi |
| src/components/HowItWorks.tsx | Tylko gdy oferta klienta mocno odbiega od serwisu grzewczego (np. sama klimatyzacja) |
| src/routes/index.tsx | NIE edytuj przy personalizacji |
| src/routes/__root.tsx | Tylko theme-color w meta, jeśli zmieniasz ciemny akcent |

Ustaw w .env / .env.example:
- VITE_CITY_PRESET=[id-klienta]
- VITE_SITE_URL=[domena podglądu lub docelowa]

Na koniec: npm run build — musi przejść bez błędów.

---

ZASADA NADRZĘDNA — NIE PRZESADZAJ Z PERSONALIZACJĄ

Szablon ma sprawdzony copy i strukturę. Nie kopiuj sloganów, haseł marketingowych ani długich list miast ze starej strony klienta.

Zostaw ton i strukturę szablonu:

Hero (układ stały — kolejność elementów):
1. Chip z oceną Google (googleRating + googleReviewCount)
2. H1 → pole presetu heroHeadline
3. Podtytuł → pole siteCity w formacie „[Miasto] i okolice” (nie „cały Śląsk”, nie 5 miast naraz)
4. 2 bullet pointy → pole heroBullets (krótkie, konkretne — ton szablonu)
5. CTA „Zadzwoń” + formularz leadów

Domyślny heroHeadline szablonu: „Serwis i naprawa techniki grzewczej”
Zmień go tylko gdy oferta klienta jest wyraźnie inna (np. sama klimatyzacja → „Montaż i serwis klimatyzacji”). Zawsze krótko, 1 linia, bez marketingowego bełkotu.

Domyślne heroBullets (dostosuj zakres, nie styl):
- „Przeglądy, naprawy i pierwsze uruchomienia kotłów oraz pomp ciepła.”
- „Serwis gwarancyjny i pogwarancyjny.”

Nagłówki sekcji (hardcoded w index.tsx — nie zmieniaj):
- „Nasze usługi”, „Opinie klientów”, „Nasze realizacje”, „Najczęstsze pytania”, „Jak to działa?”

Subtitles sekcji (preset — dostosuj delikatnie):
- servicesSectionSubtitle
- gallerySectionSubtitle

Nie wstawiaj haseł typu: „Twój komfort cenimy przede wszystkim”, „Fachowe doradztwo”, „Czyste powietrze”, „Zaufanie od lat”.

Personalizuj tam, gdzie lead widzi markę: kolory, logo, zdjęcia, kontakt, usługi, opinie Google, meta SEO.

---

ZADANIA

1. NOWY PRESET KLIENTA

1. cp src/lib/presets/default.ts src/lib/presets/[id].ts (np. termo-katowice)
2. Uzupełnij wszystkie pola:

| Pole | Zasada |
|------|--------|
| id | kebab-case, np. termo-katowice |
| siteName | Krótka nazwa marki |
| companyLegalName | Pełna nazwa (RODO, schema.org) |
| siteCity | „[Miasto] i okolice” |
| cityLocative | „w [Mieście]” (odmiana) |
| phoneDisplay / phoneE164 | Prawdziwy telefon (+48…) |
| email | Prawdziwy e-mail |
| nip / regon | Z wizytówki / strony / Maps |
| hours | Godziny otwarcia |
| serviceArea | Gdy brak adresu: „[Miasto] i okolice — dojazd do klienta” |
| address* | Wypełnij tylko jeśli klient ma siedzibę; inaczej puste + serviceArea |
| mapsUrl / googleReviewsUrl | Link z Google Maps |
| mapsQuery | Fraza do wyszukania firmy |
| siteDefaultUrl | Domena klienta (lub obecna strona) |
| siteTitle | SEO: np. „Serwis kotłów [Miasto] | [Nazwa]” lub „Klimatyzacja [Miasto] – montaż i serwis | [Nazwa]” |
| siteDescription / siteKeywords | Meta — niewidoczne w hero |
| footerTagline | Krótko, np. „Serwis kotłów i pomp ciepła” |
| partners | Marki klienta — puste [] jeśli brak |

3. Zarejestruj w src/lib/presets/index.ts i ustaw jako aktywny preset.

2. KOLORYSTYKA

Zidentyfikuj główny kolor marki ze logo (nie z przypadkowych elementów WP).

Edytuj src/styles.css — sekcja :root:

| Zmienna | Efekt |
|---------|-------|
| --brand-teal, --brand-cyan | Akcenty, ikony, linki |
| --cta, --cta-hover | Przyciski CTA |
| --primary, --accent, --ring | Ogólna paleta UI |
| --gradient-hero, --gradient-accent | Tła hero i gradienty |
| --ambient-blue, --ambient-cyan | Poświaty sekcji |

Pamiętaj o paskach łączących kroki 1–2–3 w „Jak to działa” (.timeline-* — używają --brand-cyan).

Opcjonalnie zaktualizuj theme-color w src/routes/__root.tsx (meta, domyślnie #1a2d45).

Zachowaj ciemny premium layout — nie rób jasnego motywu.

3. LOGO I FAVICON

- Pobierz logo klienta → public/logo.png (lub .svg)
- Ustaw logoUrl w presetcie, np. "/logo.png"
- SiteLogo wyświetli <img> automatycznie; bez logoUrl pokaże tekst siteName
- Favicon: podmień public/favicon.svg i dodaj public/favicon.png (linkowany w __root.tsx)

4. ZDJĘCIA (hero + galeria)

Znajdź bezpośrednie URL-e zdjęć realizacji/montaży na stronie klienta.

Dla podglądu free value (szybko): możesz użyć pełnych URL-i z domeny klienta w presetcie.

Dla produkcji (lepiej): pobierz do public/gallery/, opcjonalnie node scripts/optimize-gallery.mjs (JPG→WebP).

W presetcie ustaw:
- heroImage — tło hero
- ogImage — ten sam co hero lub najlepsze zdjęcie
- gallery[] — tyle pozycji, ile ma sens (nie sztucznie do 6); każda: image, alt, caption

Galeria na stronie: desktop pokazuje 3 zdjęcia + przycisk „Pokaż wszystkie” (już wbudowane). Przy >3 zdjęciach dodaj je do gallery[] — expand zadziała sam.

alt i caption: konkretne, SEO-friendly, bez nazwy szablonu.

5. USŁUGI, FAQ, FORMULARZ

services[] — 4–6 kart, dopasuj do oferty klienta. Każda karta: { icon: "wrench", title: "...", desc: "..." } — desc = 1 zdanie.

Dostępne ikony (icon w presetcie):
wrench · shield-check · check-circle · zap · alert-triangle · flame

Jeśli żadna nie pasuje (np. klimatyzacja → snowflake):
1. Dodaj typ w src/lib/presets/types.ts → ServiceIcon
2. Dodaj import + mapowanie w index.tsx → SERVICE_ICONS
3. Użyj w presetcie

faqs[] — 5 pytań w tonie szablonu. Używaj siteCity w odpowiedziach o zasięgu. Ceny: tylko jeśli klient je publicznie podaje.

serviceOptionGroups[] — opcje formularza; dopasuj do usług klienta (usuń grupy, których nie oferuje).

6. OPINIE GOOGLE (obowiązkowe)

Każda personalizacja = prawdziwe dane z profilu Maps. Bez Playwrighta, bez scraperów, bez API — ręcznie z profilu.

W presetcie ustaw:

| Pole | Źródło |
|------|--------|
| googleRating | Średnia z Maps (np. 4.8) |
| googleReviewCount | Liczba opinii (np. 11) |
| googleReviewsUrl | Link do profilu (= mapsUrl lub goo.gl) |
| reviews[] | Min. 3–5 prawdziwych opinii z Maps |

Zasady reviews[]:
- name: inicjały z Maps lub pomiń → „Użytkownik Google Maps”
- text: treść z Maps (możesz skrócić, nie wymyślaj)
- source: "google", rating: 5, relativeTime: "3 mies. temu"

Nie zostawiaj fikcyjnych opinii z default.ts (Anna K., Marek W.…).
Hero chip, sekcja „Opinie klientów” i JSON-LD (schema.ts) biorą dane z presetu automatycznie.

7. „JAK TO DZIAŁA”

Domyślnie nie edytuj — 3 kroki (Zgłoszenie → Termin → Wizyta serwisowa) pasują do serwisu grzewczego.

Edytuj src/components/HowItWorks.tsx tylko gdy klient to np. firma montażowa klimatyzacji. Zachowaj strukturę 3 kroków i ton.

8. BUILD I WERYFIKACJA

npm run generate:seo
npm run build

---

CHECKLIST PRZED ODDANIEM LEADOWI

- [ ] Hero: ton szablonu, nie kopia starej strony klienta
- [ ] heroHeadline + heroBullets + siteCity — krótkie, konkretne
- [ ] Kolory marki w styles.css (+ timeline „Jak to działa”)
- [ ] Logo + favicon = marka klienta
- [ ] Hero i galeria = prawdziwe zdjęcia (nie placeholdery SVG)
- [ ] Telefon, e-mail, NIP, REGON, godziny — poprawne
- [ ] mapsUrl / googleReviewsUrl — działający link Maps
- [ ] Usługi + ikony = rzeczywista oferta (4–6 kart)
- [ ] FAQ i formularz dopasowane do oferty
- [ ] partners[] — tylko marki, które klient naprawdę serwisuje
- [ ] Ocena, liczba opinii i treści recenzji = profil Google Maps
- [ ] siteTitle / siteDescription — SEO w meta, nie w H1
- [ ] npm run build przechodzi
- [ ] Zero placeholderów: „Twoje Miasto”, „600 000 000”, „LOGO”, fikcyjne opinie

---

CZEGO NIE ROBIĆ

- Nie kopiuj marketingu ze starej strony do hero ani nagłówków
- Nie edytuj index.tsx „dla jednego klienta”
- Nie zostawiaj presetu default jako aktywnego — zawsze nowy plik klienta
- Nie wymyślaj opinii Google
- Nie dodawaj skryptów scrapujących Maps
- Nie psuj ciemnego premium layoutu jasnym motywem
```
