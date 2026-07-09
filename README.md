# Szablon landing page — serwis HVAC / technika grzewcza

Responsywny one-page dla firm serwisowych (kotły, pompy ciepła, klimatyzacja). TanStack Start + React + Tailwind.

## Szybki start

```bash
npm install
cp .env.example .env
npm run dev
```

Strona: `http://localhost:5173`

## Personalizacja nowego klienta (~15–30 min)

### 1. Skopiuj preset

```bash
cp src/lib/presets/default.ts src/lib/presets/klient-miasto.ts
```

Edytuj dane firmy, usługi, FAQ, galerię i opinie w nowym pliku.

Zarejestruj preset w `src/lib/presets/index.ts`:

```ts
import { klientMiastoPreset } from "./klient-miasto";

export type PresetId = "default" | "klient-miasto";

export const PRESETS = {
  default: defaultPreset,
  "klient-miasto": klientMiastoPreset,
};
```

### 2. Zmienne środowiskowe (`.env`)

| Zmienna | Opis |
|---------|------|
| `VITE_SITE_URL` | Domena produkcyjna (canonical, OG, sitemap) |
| `VITE_CITY_PRESET` | Id presetu klienta, np. `klient-miasto` |
| `VITE_WEB3FORMS_ACCESS_KEY` | Klucz Web3Forms (formularz kontaktowy) |

### 3. Assety

| Plik | Opis |
|------|------|
| `public/logo.svg` (lub `.png`) | Logo firmy — ustaw `logoUrl` w presetcie |
| `public/gallery/*` | Zdjęcia realizacji (5+ szt.) |
| `public/favicon.svg` | Ikona strony |

Po wgraniu zdjęć JPG: `node scripts/optimize-gallery.mjs` — konwertuje do WebP.

### 4. Checklist przed oddaniem klientowi

- [ ] Ustaw `VITE_SITE_URL` i `VITE_CITY_PRESET` w `.env` / Vercel
- [ ] Uzupełnij NIP, REGON, telefon, e-mail, obszar działania w presetcie
- [ ] Podmień logo, hero, galerię (`heroImage`, `ogImage`, `gallery[]`)
- [ ] Dostosuj usługi, FAQ, partnerów, opinie w presetcie
- [ ] Ustaw link Google Maps (`mapsUrl`, `googleReviewsUrl`)
- [ ] Uruchom `npm run generate:seo` (lub `npm run build`)
- [ ] Sprawdź formularz i toast po wysłaniu
- [ ] Sprawdź mobile: sticky bar (telefon + WhatsApp)

### 5. Kolory marki (opcjonalnie)

Edytuj zmienne w `src/styles.css`:

- `--brand-teal`, `--brand-cyan` — akcenty i gradienty
- `--cta`, `--cta-hover` — przyciski CTA

---

## Co jest w presetcie

Jeden plik (`src/lib/presets/*.ts`) zawiera **wszystkie dane klienta**:

- Tożsamość firmy (nazwa, NIP, REGON, kontakt)
- SEO (title, description, keywords)
- Hero (nagłówek, bullet points)
- Usługi, FAQ, opcje formularza
- Galeria, opinie, partnerzy
- Godziny, obszar działania, linki Maps

Komponenty (`index.tsx`, footer, RODO) czytają dane przez `src/lib/site.ts` — **nie edytuj ich** przy personalizacji.

---

## SEO (wbudowane)

- Meta title, description, keywords, canonical, Open Graph
- JSON-LD `HVACBusiness` (schema.org)
- `robots.txt` + `sitemap.xml` — generowane przez `npm run generate:seo`
- Polityka RODO z NIP, REGON, cookies

---

## Komendy

```bash
npm run dev             # development
npm run generate:seo    # robots.txt + sitemap.xml z VITE_SITE_URL
npm run build           # produkcja (auto: generate:seo)
npm run preview         # podgląd buildu
npm run lint            # ESLint
```

## Struktura projektu

```
src/lib/site.ts          ← eksport aktywnego presetu
src/lib/presets/         ← dane per klient (TU PERSONALIZUJESZ)
src/lib/schema.ts        ← JSON-LD
src/routes/index.tsx     ← layout strony (bez danych klienta)
public/gallery/          ← zdjęcia realizacji
scripts/generate-seo-files.mjs
```

## Deploy (Vercel)

- Build Command: `npm run build`
- Output Directory: *(puste — Nitro generuje `.vercel/output`)*
- Env: `VITE_SITE_URL`, `VITE_CITY_PRESET`, `VITE_WEB3FORMS_ACCESS_KEY`

---

Szczegółowy przewodnik: [TEMPLATE.md](./TEMPLATE.md)
