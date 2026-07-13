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

## Krok zero (przed edycją presetu)

Zanim skopiujesz `default.ts`, ustal profil firmy:

1. Główny filar (klima / pompy / kotły / wentylacja / mix)
2. Jedno miasto bazowe + zasięg
3. Model pracy (montaż, serwis, awarie…)

**Spójność:** `heroHeadline`, `heroBullets`, `services[]`, `faqs[]`, `serviceOptionGroups[]`, `footerTagline` i `siteTitle` muszą opisywać **ten sam profil**. Szczegóły: [PROMPT-PERSONALIZACJA.md](./PROMPT-PERSONALIZACJA.md) → „Krok zero”.

### Źródło prawdy (rozjazd strona vs Maps)

| Dane | Priorytet |
|------|-----------|
| Telefon, godziny, adres, NIP | **Google Maps** |
| Oferta, marki, zdjęcia, ceny | **stara strona** |
| Ocena i liczba opinii | **tylko Maps** |

### Co brać ze starej strony

**Bierz:** usługi, marki, zdjęcia realizacji, NIP (weryfikuj z Maps).  
**Nie bierz:** sloganów, listy wielu miast, „najlepsi/liderzy”.

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
| `siteName` | `TermoSerwis` | Krótka nazwa **marketingowa** (header, logo) |
| `companyLegalName` | `TermoSerwis Jan Kowalski` | Pełna forma prawna (RODO, schema) — nie mylić ze `siteName` |
| `siteCity` | `Kraków i okolice` | Pod H1 w hero — **jedno miasto**, nie lista |
| `cityLocative` | `w Krakowie` | Odmiana miejscowości — sprawdź ręcznie |
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
| `siteTitle` | `[Usługa] [Miasto] \| [siteName]` (max ~60 znaków) |
| `siteKeywords` | 5–8 fraz z oferty, bez stuffingu |
| `siteDescription` | 1–2 zdania, **inne niż H1**, z CTA/telefonem |
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
| `serviceOptionGroups` | **Lustrzane odbicie `services[]`** — bez grup spoza oferty |
| `partners` | Tylko potwierdzone marki ze strony klienta, lub `[]` |
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

**Mapowanie:** montaż → `check-circle` · serwis → `wrench` · przeglądy → `shield-check` · pompy/rekuperacja → `zap` · awaria → `alert-triangle` · kotły → `flame`

**Limity:** H1 ~50 znaków · bullet ~80 znaków · tytuł usługi 3–6 słów · opis = 1 zdanie.

### Formularz i partnerzy

- `serviceOptionGroups[]` = tylko usługi z `services[]`, max 4–5 grup, po 2–4 opcje
- `partners[]` = marki ze strony klienta / autoryzacja; brak dowodu → `[]`, max 6–8

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

**Logo:** preferuj PNG/SVG z przezroczystością. JPG z białym tłem na ciemnym headerze wygląda źle.

### Favicon

Przy każdym kliencie: wygeneruj `public/favicon.png` z logo (ikona lub całe logo w kwadracie). Ustaw `faviconUrl` w presetcie.

### Galeria i hero

**Weź:** zdjęcia realizacji/montaży klienta. **Nie bierz:** stocków, logo, banerów z tekstem.

1. Wgraj zdjęcia JPG do `public/gallery/`
2. Uruchom `node scripts/optimize-gallery.mjs` (konwersja do WebP)
3. Zaktualizuj `gallery[]`, `heroImage`, `ogImage` w presetcie
4. `alt` i `caption` spójne z `gallerySectionSubtitle`

#### Zdjęcia zapasowe (tylko gdy <3 u klienta)

**Tylko jeśli** klient nie ma sensownych zdjęć realizacji **lub jest ich mniej niż 3** — skopiuj przykładowe zdjęcia z lokalnych folderów:

| Profil | Folder |
|--------|--------|
| Klimatyzacja | `C:\Users\Tymek\Desktop\TOOLS\KLIMATYZACJA` |
| Pompy ciepła / kotły | `C:\Users\Tymek\Desktop\TOOLS\POMPY KOTLY` |

Mix HVAC → folder głównego filaru firmy. Potem `public/gallery/` + preset jak wyżej. Szczegóły: [PROMPT-PERSONALIZACJA.md](./PROMPT-PERSONALIZACJA.md) → sekcja 4.

## Krok 5 — Kolory marki

1. Kolor z **logo** (pipeta na przezroczystym tle), nie z motywu WP
2. Logo B/W → akcent ze starej strony (przycisk, nagłówek)
3. Po zmianie: hover CTA, timeline, glow tła przy scrollu

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

**Po buildzie:** przegląd wizualny desktop + mobile (hero → stopka), kliknięcia tel/WhatsApp/Maps, brak placeholderów i starych kolorów w `styles.css`.

## Checklist końcowy

- [ ] **Krok zero:** spójność H1 = usługi = FAQ = formularz
- [ ] **H1 + bullety + usługi = priorytety firmy** (spójne ze stroną klienta)
- [ ] **Formularz i partnerzy** dopasowane do oferty
- [ ] **SEO meta** spójne z profilem, inne niż H1
- [ ] **Logo** z przezroczystością, favicon z logo klienta
- [ ] **`googleReviewCount`** = liczba z Maps (nie długość `reviews[]`)
- [ ] **Opinie:** 3–5 prawdziwych, dotyczących głównej usługi firmy
- [ ] **FAQ pod profil branżowy** (klima / pompy / kotły / wentylacja, bez „obcych” usług)
- [ ] Copy bez nadmiaru „—” (przecinek lub kropka zamiast pauzy em)
- [ ] Zero placeholderów („Twoje Miasto”, „600 000 000”, „LOGO”)
- [ ] Wszystkie zdjęcia załadowane (klient lub zapasowe z TOOLS przy <3 realizacjach)
- [ ] Telefon, WhatsApp, e-mail działają
- [ ] Formularz wysyła maile
- [ ] Google Maps link prowadzi do profilu klienta
- [ ] RODO zawiera prawdziwe NIP/REGON
- [ ] `robots.txt` i `sitemap.xml` mają domenę klienta
- [ ] Mobile: sticky bar, karuzele, formularz
- [ ] Przegląd wizualny desktop + mobile (nie tylko `npm run build`)

## Najczęstsze błędy

1. `googleReviewCount` = długość `reviews[]`
2. FAQ/usługi/formularz z `default.ts` przy firmie od jednej branży
3. Stare kolory / niebieski glow z poprzedniego klienta
4. Placeholderowe zdjęcia i favicon
5. Zapasowe z TOOLS mimo że klient ma własne zdjęcia (≥3)
6. `siteCity` z wieloma miastami
7. `siteName` ≠ `companyLegalName` w RODO
8. Logo JPG z białym tłem na ciemnym headerze

Pełna lista: [PROMPT-PERSONALIZACJA.md](./PROMPT-PERSONALIZACJA.md) → „Najczęstsze błędy”.

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
