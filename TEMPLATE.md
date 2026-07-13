# TEMPLATE — przewodnik personalizacji

Ten dokument opisuje krok po kroku, jak z szablonu zrobić stronę dla nowego klienta **HVAC** (klimatyzacja, pompy ciepła, wentylacja, ogrzewanie, serwis).

## Filozofia szablonu

| Szablon dostarcza | Ty dopasowujesz do klienta |
|-------------------|----------------------------|
| Układ strony, UX, premium dark | Kolory marki, logo, favicon, zdjęcia |
| Struktura sekcji, formularze, sticky bar | Telefon, adres, NIP, Maps, opinie Google |
| Ton copy (krótko, konkretnie) | **H1, bullety hero, usługi, FAQ, formularz** |

**Szablon to głównie szata graficzna.** Domyślny preset (`default.ts`) to przykład ogólnego HVAC — przy każdym kliencie **H1, `heroBullets` i `services[]` muszą być zgodne z priorytetami firmy** (co sprzedaje na pierwszym planie na jej stronie / Maps). Nie zostawiaj domyślnego copy, jeśli klient robi np. tylko klimatyzację.

Szczegóły dla agenta Cursor: [PROMPT-PERSONALIZACJA.md](./PROMPT-PERSONALIZACJA.md) (sekcja „Oferta zgodna z priorytetami firmy”).

**Styl copy:** w treściach presetu (H1, bullety, usługi, FAQ) **ograniczaj znak „—”**. Zamiast niego: przecinek, kropka, dwukropek. Na stronie wygląda to naturalniej.

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
| `serviceArea` | `Kraków i okolice, dojazd` | Gdy brak adresu — fallback w Kontakt |
| `address*` | `ul. Przykładowa 1, 00-000 Kraków` | **Priorytet w Kontakt** — gdy wypełnione, karta „Adres” |

### SEO i linki

| Pole | Uwagi |
|------|-------|
| `siteDefaultUrl` | Domena klienta |
| `siteTitle` | Tytuł w Google (max ~60 znaków) |
| `siteKeywords` | Słowa kluczowe, przecinkami |
| `siteDescription` | Meta description |
| `mapsUrl` | Link do profilu Google Maps |
| `googleReviewsUrl` | Ten sam lub osobny link do opinii |
| `googleRating` / `googleReviewCount` | Ocena i **łączna liczba opinii z Maps** (nie długość `reviews[]`) |
| `googlePlaceId` | Opcjonalnie — żywe opinie z API |

### Treści strony

| Pole | Co zawiera |
|------|------------|
| `heroHeadline` | **H1 — główna usługa firmy** (np. klima, pompy, kotły, mix HVAC) |
| `heroBullets` | **2 punkty — najważniejsze atuty/oferty** (priorytet firmy) |
| `footerTagline` | Krótki opis profilu w stopce |
| `services` | **4–6 kart — rzeczywista oferta, kolejność = priorytet** |
| `faqs` | **5 pytań pod profil HVAC firmy** (nie kopiuj `default.ts` bez zmian) |
| `serviceOptionGroups` | Opcje w formularzu kontaktowym |
| `partners` | Marki w sekcji partnerów |
| `reviews` | Opinie fallback (gdy brak Google API) |
| `gallery` | Zdjęcia realizacji |
| `logoIncludesName` | `true` = logo ma napis; `false` = pokaż `siteName` obok ikony |
| `faviconUrl` | Favicon (zwykle wycinek logo), np. `"/favicon.png"` |

### FAQ pod profil branżowy (HVAC)

`faqs[]` w presecie to **5 pytań dopasowanych do tego, czym firma faktycznie się zajmuje**. Domyślny `default.ts` ma przykład pod **mix HVAC** — przy personalizacji **przepisz FAQ** pod profil klienta.

**Zasady:**
- **3–4 pytania branżowe** (montaż, serwis, ceny, marki, czas realizacji)
- **1–2 uniwersalne** (dojazd, obszar `siteCity`, awaria jeśli dotyczy)
- **Zero pytań** o usługi, których firma nie oferuje

| Profil firmy | O czym pytać w FAQ |
|--------------|-------------------|
| Klimatyzacja | montaż split/multi, koszt, serwis, odgrzybianie, marki |
| Pompy ciepła | montaż, serwis gwarancyjny, pierwsze uruchomienie, awaria |
| Kotły / ogrzewanie | przegląd, koszt serwisu, autoryzacja marek, naprawa awaryjna |
| Wentylacja / rekuperacja | montaż, dobór mocy, serwis, przeglądy |
| Mix HVAC | po 1 temacie z głównych filarów oferty + dojazd |

Ceny w odpowiedziach: tylko gdy klient podaje je publicznie na swojej stronie.

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

### Logo i favicon

Wgraj do `public/` i ustaw w presetcie:

```ts
logoUrl: "/logo.png",
logoIncludesName: false,  // false = ikona bez napisu → siteName obok w headerze
faviconUrl: "/favicon.png",  // kwadratowy wycinek logo — obowiązkowo przy personalizacji
```

### Favicon

Przy każdym kliencie: wygeneruj `public/favicon.png` z logo (ikona lub całe logo w kwadracie). Ustaw `faviconUrl` w presetcie.

### Galeria i hero

1. Wgraj zdjęcia JPG do `public/gallery/`
2. Uruchom `node scripts/optimize-gallery.mjs` (konwersja do WebP)
3. Zaktualizuj `gallery[]`, `heroImage`, `ogImage` w presetcie

## Krok 5 — Kolory marki

W `src/styles.css` dostosuj:

- `--brand-teal`, `--brand-cyan` — akcenty, glow tła (`.page-ambient-scatter`, `.section-glow`), timeline, cienie kart
- `--cta`, `--cta-hover` — przyciski (hover glow też z `--cta` / `--brand-cyan`)

Po zmianie palety przewiń stronę i **najedź na przyciski** — poświata nie może zostać w starym kolorze.
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

- [ ] **H1 + bullety + usługi = priorytety firmy** (spójne ze stroną klienta)
- [ ] **FAQ pod profil branżowy** (klima / pompy / kotły / wentylacja, bez „obcych” usług)
- [ ] Copy bez nadmiaru „—” (przecinek lub kropka zamiast pauzy em)
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

**Prompt do Cursora (personalizacja pod leada):** [PROMPT-PERSONALIZACJA.md](./PROMPT-PERSONALIZACJA.md)
