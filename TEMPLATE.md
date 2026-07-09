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

**Prompt do Cursora (personalizacja pod leada):** [PROMPT-PERSONALIZACJA.md](./PROMPT-PERSONALIZACJA.md)
