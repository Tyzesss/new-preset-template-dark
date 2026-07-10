# Prompt — personalizacja pod leada

Skopiuj poniższy blok do Cursora (lub użyj `@PROMPT-PERSONALIZACJA.md` + linki w wiadomości).

---

Przeanalizuj treść, strukturę, kolorystykę i zasoby z:
- **Strona klienta:** [URL STRONY KLIENTA]
- **Google Maps:** [URL MAPY]

Zrób rebrand mojego szablonu TanStack Start (`src/lib/presets/`) pod tę firmę. Strona ma wyglądać jak zaprojektowana dla nich (kolory, logo, zdjęcia, dane), ale z zachowaniem układu UX i premium tonu szablonu.

---

## Obowiązkowe rutynowe czynności (każda personalizacja)

Wykonaj **zawsze**, bez pytania — to nie jest opcjonalne:

### 1. Favicon = logo lub jego wycinek

- **Nigdy** nie zostawiaj generycznego `favicon.svg` szablonu.
- Utwórz `public/favicon.png` (preferowane) lub `public/favicon.svg` z **logo klienta**:
  - jeśli logo ma ikonę + napis → favicon = **sama ikona** (kwadratowy wycinek),
  - jeśli logo jest proste → całe logo przeskalowane do kwadratu.
- W presetcie ustaw `faviconUrl: "/favicon.png"` (lub `.svg`).
- Gdy nie ustawisz `faviconUrl`, strona użyje `logoUrl` — ale **zawsze** przygotuj dedykowany kwadratowy favicon.

### 2. Nazwa firmy obok logo (gdy logo bez napisu)

- Sprawdź logo: czy zawiera **czytelny napis** z nazwą firmy?
- **Logo tylko z ikoną / symbolem** → w presetcie: `logoIncludesName: false` (domyślnie). Header pokaże **logo + `siteName` obok** automatycznie (`SiteLogo`).
- **Logo ze wbudowanym napisem** → `logoIncludesName: true` (tylko grafika, bez duplikatu tekstu).
- Nie polegaj na `sr-only` — nazwa ma być **widoczna**, gdy logo jej nie ma.

### 3. Linie timeline „Jak to działa” w kolorze marki

- Po zmianie kolorystyki w `src/styles.css` **zweryfikuj wizualnie** sekcję „Jak to działa” (desktop + mobile).
- Linie łączące kroki 1–2–3 **muszą** być w kolorze marki — używają `--brand-cyan` (zmienne `--timeline-line-*`).
- Przy personalizacji **zawsze** aktualizuj `--brand-cyan`, `--brand-teal` i `--cta` razem — nie zostawiaj starych wartości z innego klienta.
- Po zmianie kolorów: sprawdź pasek poziomy (desktop) i pionowe łączniki (mobile).

### 4. Przeswity / glow w tle strony w kolorze marki

- Po personalizacji **nie może zostać** domyślny niebieski glow z szablonu.
- Przy zmianie palety **zawsze** aktualizuj razem: `--brand-teal`, `--brand-cyan`, `--cta` (oraz `--primary` / `--accent` jeśli dotykasz).
- Przeswity (`.page-ambient-scatter`, `.section-glow`, cienie kart, hover CTA) **dziedziczą** po tych zmiennych — nie hardcoduj kolorów glow w CSS.
- **Zweryfikuj wizualnie** po zmianie kolorów:
  - delikatne plamy światła w tle całej strony (scroll góra–dół),
  - glow za sekcjami (usługi, opinie, realizacje, kontakt),
  - poświata przy hover na kartach i przyciskach CTA.
- Jeśli marka jest np. czerwona/zielona, a tło nadal „świeci na niebiesko” → źle zaktualizowano `--brand-teal` / `--brand-cyan`.

---

## Architektura szablonu — co edytujesz, a czego nie

**Jedyny plik z treścią klienta:** skopiuj `src/lib/presets/default.ts` → `src/lib/presets/[id-klienta].ts`, edytuj, zarejestruj w `src/lib/presets/index.ts`.

Wszystko idzie przez preset → `src/lib/site.ts` → komponenty. **Nie hardcoduj** danych w `site.ts`, `index.tsx`, `schema.ts`.

| Plik | Kiedy edytować |
|------|----------------|
| `src/lib/presets/[klient].ts` | Zawsze — główna personalizacja |
| `src/styles.css` | Kolory marki |
| `public/logo.*`, `public/gallery/*`, `public/favicon.*` | Logo, zdjęcia, favicon |
| `src/lib/presets/types.ts` + `index.tsx` (`SERVICE_ICONS`) | Tylko gdy potrzebujesz nowej ikony usługi |
| `src/components/HowItWorks.tsx` | Tylko gdy oferta klienta mocno odbiega od serwisu grzewczego (np. sama klimatyzacja) |
| `src/routes/index.tsx` | **Nie edytuj** przy personalizacji |
| `src/routes/__root.tsx` | Tylko `theme-color` w meta, jeśli zmieniasz ciemny akcent |

Ustaw w `.env` / `.env.example`:
- `VITE_CITY_PRESET=[id-klienta]`
- `VITE_SITE_URL=[domena podglądu lub docelowa]`

Na koniec: `npm run build` — musi przejść bez błędów.

---

## Zasada nadrzędna — nie przesadzaj z personalizacją

Szablon ma sprawdzony copy i strukturę. **Nie kopiuj** sloganów, haseł marketingowych ani długich list miast ze starej strony klienta.

### Zostaw ton i strukturę szablonu

**Hero (układ stały — kolejność elementów):**
1. Chip z oceną Google (`googleRating` + `googleReviewCount`)
2. **H1** → pole presetu `heroHeadline`
3. **Podtytuł** → pole `siteCity` w formacie „[Miasto] i okolice” (nie „cały Śląsk”, nie 5 miast naraz)
4. **2 bullet pointy** → pole `heroBullets` (krótkie, konkretne — ton szablonu)
5. CTA „Zadzwoń” + formularz leadów

**Domyślny `heroHeadline` szablonu:** „Serwis i naprawa techniki grzewczej”  
Zmień go **tylko** gdy oferta klienta jest wyraźnie inna (np. sama klimatyzacja → „Montaż i serwis klimatyzacji”). Zawsze krótko, 1 linia, bez marketingowego bełkotu.

**Domyślne `heroBullets` (dostosuj zakres, nie styl):**
- „Przeglądy, naprawy i pierwsze uruchomienia kotłów oraz pomp ciepła.”
- „Serwis gwarancyjny i pogwarancyjny.”

**Nagłówki sekcji (hardcoded w `index.tsx` — nie zmieniaj):**
- „Nasze usługi”, „Opinie klientów”, „Nasze realizacje”, „Najczęstsze pytania”, „Jak to działa?”

**Subtitles sekcji (preset — dostosuj delikatnie):**
- `servicesSectionSubtitle`
- `gallerySectionSubtitle`

**Nie wstawiaj** haseł typu: „Twój komfort cenimy przede wszystkim”, „Fachowe doradztwo”, „Czyste powietrze”, „Zaufanie od lat”.

Personalizuj tam, gdzie lead **widzi markę**: kolory, logo, zdjęcia, kontakt, usługi, opinie Google, meta SEO.

---

## Zadania

### 1. Nowy preset klienta

1. `cp src/lib/presets/default.ts src/lib/presets/[id].ts` (np. `termo-katowice`)
2. Uzupełnij wszystkie pola:

| Pole | Zasada |
|------|--------|
| `id` | kebab-case, np. `termo-katowice` |
| `siteName` | Krótka nazwa marki |
| `companyLegalName` | Pełna nazwa (RODO, schema.org) |
| `siteCity` | „[Miasto] i okolice” |
| `cityLocative` | „w [Mieście]” (odmiana) |
| `phoneDisplay` / `phoneE164` | Prawdziwy telefon (+48…) |
| `email` | Prawdziwy e-mail |
| `nip` / `regon` | Z wizytówki / strony / Maps |
| `hours` | Godziny otwarcia |
| `serviceArea` | Gdy **brak adresu**: „[Miasto] i okolice — dojazd do klienta” (fallback w Kontakt) |
| `address` / `addressStreet*` / `addressCity` / `addressPostal` | **Priorytet w sekcji Kontakt** — gdy wypełnione, karta pokazuje „Adres”; bez adresu → `serviceArea` jako „Obszar działania” |
| `mapsUrl` / `googleReviewsUrl` | Link z Google Maps |
| `mapsQuery` | Fraza do wyszukania firmy |
| `siteDefaultUrl` | Domena klienta (lub obecna strona) |
| `siteTitle` | SEO: np. „Serwis kotłów [Miasto] \| [Nazwa]” lub „Klimatyzacja [Miasto] – montaż i serwis \| [Nazwa]” |
| `siteDescription` / `siteKeywords` | Meta — niewidoczne w hero |
| `footerTagline` | Krótko, np. „Serwis kotłów i pomp ciepła” |
| `partners` | Marki klienta — puste `[]` jeśli brak |
| `logoUrl` | Ścieżka do logo w `public/` |
| `logoIncludesName` | `true` = logo ma napis (nie duplikuj `siteName`); `false` = tylko ikona (nazwa obok — domyślnie) |
| `faviconUrl` | Kwadratowy favicon z logo; np. `"/favicon.png"` |

3. Zarejestruj w `src/lib/presets/index.ts` i ustaw jako aktywny preset.

### 2. Kolorystyka

Zidentyfikuj **główny kolor marki ze logo** (nie z przypadkowych elementów WP).

Edytuj `src/styles.css` — sekcja `:root`:

| Zmienna | Efekt |
|---------|-------|
| `--brand-teal`, `--brand-cyan` | Akcenty, ikony, linki |
| `--cta`, `--cta-hover` | Przyciski CTA |
| `--primary`, `--accent`, `--ring` | Ogólna paleta UI |
| `--gradient-hero`, `--gradient-accent` | Tła hero i gradienty |

**Przeswity (glow):** `.page-ambient-scatter`, `.section-glow`, `--shadow-glow`, `--shadow-cta` — automatycznie z `--brand-teal` / `--brand-cyan` / `--cta`. Wystarczy zmienić paletę marki; potem sprawdź wizualnie tło i sekcje.

**Timeline „Jak to działa”:** linie między krokami 1–2–3 używają `--brand-cyan` (`--timeline-line-*`). Po każdej zmianie palety **sprawdź wizualnie** tę sekcję.

Opcjonalnie zaktualizuj `theme-color` w `src/routes/__root.tsx` (meta, domyślnie `#1a2d45`).

Zachowaj **ciemny premium layout** — nie rób jasnego motywu.

### 3. Logo i favicon

- Pobierz logo klienta → `public/logo.png` (lub `.svg`)
- Ustaw `logoUrl` w presetcie, np. `"/logo.png"`
- **`logoIncludesName`:** `false` gdy logo to sama ikona (nazwa `siteName` pojawi się obok); `true` gdy logo zawiera napis firmy
- **Favicon (obowiązkowe):** wytnij ikonę z logo → `public/favicon.png` → `faviconUrl: "/favicon.png"`. Nie zostawiaj domyślnego favicona szablonu.

### 4. Zdjęcia (hero + galeria)

Znajdź **bezpośrednie URL-e** zdjęć realizacji/montaży na stronie klienta.

**Dla podglądu free value (szybko):** możesz użyć pełnych URL-i z domeny klienta w presetcie.

**Dla produkcji (lepiej):** pobierz do `public/gallery/`, opcjonalnie `node scripts/optimize-gallery.mjs` (JPG→WebP).

W presetcie ustaw:
- `heroImage` — tło hero
- `ogImage` — ten sam co hero lub najlepsze zdjęcie
- `gallery[]` — tyle pozycji, ile ma sens (nie sztucznie do 6); każda: `image`, `alt`, `caption`

**Galeria na stronie:** desktop pokazuje 3 zdjęcia + przycisk „Pokaż wszystkie” (już wbudowane). Przy >3 zdjęciach dodaj je do `gallery[]` — expand zadziała sam.

`alt` i `caption`: konkretne, SEO-friendly, bez nazwy szablonu.

### 5. Usługi, FAQ, formularz

**`services[]`** — 4–6 kart, dopasuj do oferty klienta. Każda karta: `{ icon: "wrench", title: "...", desc: "..." }` — `desc` = 1 zdanie.

**Dostępne ikony** (`icon` w presetcie):
`wrench` · `shield-check` · `check-circle` · `zap` · `alert-triangle` · `flame`

Jeśli żadna nie pasuje (np. klimatyzacja → `snowflake`):
1. Dodaj typ w `src/lib/presets/types.ts` → `ServiceIcon`
2. Dodaj import + mapowanie w `index.tsx` → `SERVICE_ICONS`
3. Użyj w presetcie

**`faqs[]`** — 5 pytań w tonie szablonu. Używaj `siteCity` w odpowiedziach o zasięgu. Ceny: tylko jeśli klient je publicznie podaje.

**`serviceOptionGroups[]`** — opcje formularza; dopasuj do usług klienta (usuń grupy, których nie oferuje).

### 6. Opinie Google (obowiązkowe)

**Każda personalizacja = prawdziwe dane z profilu Maps.** Bez Playwrighta, bez scraperów, bez API — ręcznie z profilu.

W presetcie ustaw:

| Pole | Źródło |
|------|--------|
| `googleRating` | Średnia ocena z Google Maps (np. `4.8`) |
| `googleReviewCount` | **Łączna liczba opinii z profilu Maps** (np. profil pokazuje „32 opinie” → wpisz `32`) |
| `googleReviewsUrl` | Link do profilu (= `mapsUrl` lub goo.gl) |
| `reviews[]` | Min. 3–5 **prawdziwych** opinii z Maps (same teksty do wyświetlenia) |

**KRYTYCZNE — `googleReviewCount` vs `reviews[]`:**
- `googleReviewCount` = **całkowita liczba opinii na Google Maps** (ta przy gwiazdkach na profilu).
- `reviews[]` = tylko 3–5 skopiowanych recenzji do sekcji na stronie.
- **NIGDY** nie ustawiaj `googleReviewCount` na długość `reviews[]` (np. 5 wpisów ≠ 5 opinii na Maps).
- Przykład błędu: na Maps jest **32 opinie**, a w presetcie `googleReviewCount: 9` — **niedopuszczalne**.
- Hero, sekcja „Opinie klientów” i JSON-LD pokazują `googleReviewCount` — musi zgadzać się z Maps co do liczby.

**Zasady `reviews[]`:**
- `name`: inicjały z Maps lub pomiń → „Użytkownik Google Maps”
- `text`: treść z Maps (możesz skrócić, nie wymyślaj)
- `source: "google"`, `rating`, `relativeTime` (np. „3 mies. temu”)

- **Nie zostawiaj** fikcyjnych opinii z `default.ts` (Anna K., Marek W.…)
- Hero chip, sekcja „Opinie klientów” i JSON-LD (`schema.ts`) biorą dane z presetu automatycznie

### 7. „Jak to działa”

Domyślnie **nie edytuj** — 3 kroki (Zgłoszenie → Termin → Wizyta serwisowa) pasują do serwisu grzewczego.

Edytuj `src/components/HowItWorks.tsx` **tylko** gdy klient to np. firma montażowa klimatyzacji. Zachowaj strukturę 3 kroków i ton.

### 8. Build i weryfikacja

```bash
npm run generate:seo
npm run build
```

---

## Checklist przed oddaniem leadowi

- [ ] Hero: ton szablonu, nie kopia starej strony klienta
- [ ] `heroHeadline` + `heroBullets` + `siteCity` — krótkie, konkretne
- [ ] Kolory marki w `styles.css` — glow tła, sekcje, timeline, hover CTA (bez niebieskiego z szablonu)
- [ ] Favicon = wycinek/kwadrat logo (`faviconUrl`), nie domyślny szablon
- [ ] Logo: `logoIncludesName` poprawnie; przy samej ikonie — widoczny `siteName` obok
- [ ] Hero i galeria = prawdziwe zdjęcia (nie placeholdery SVG)
- [ ] Telefon, e-mail, NIP, REGON, godziny — poprawne
- [ ] `mapsUrl` / `googleReviewsUrl` — działający link Maps
- [ ] Usługi + ikony = rzeczywista oferta (4–6 kart)
- [ ] FAQ i formularz dopasowane do oferty
- [ ] **Kontakt:** jeśli firma ma adres → karta „Adres”; bez adresu → „Obszar działania”
- [ ] **`googleReviewCount` = dokładna liczba z profilu Maps** (nie długość `reviews[]`)
- [ ] Ocena Google i treści recenzji = profil Google Maps
- [ ] `siteTitle` / `siteDescription` — SEO w meta, nie w H1
- [ ] `npm run build` przechodzi
- [ ] Zero placeholderów: „Twoje Miasto”, „600 000 000”, „LOGO”, fikcyjne opinie

---

## Czego nie robić

- Nie kopiuj marketingu ze starej strony do hero ani nagłówków
- Nie edytuj `index.tsx` „dla jednego klienta”
- Nie zostawiaj presetu `default` jako aktywnego — zawsze nowy plik klienta
- Nie wymyślaj opinii Google
- Nie dodawaj skryptów scrapujących Maps
- Nie psuj ciemnego premium layoutu jasnym motywem
