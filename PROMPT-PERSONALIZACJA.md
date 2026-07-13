# Prompt — personalizacja pod leada

Skopiuj poniższy blok do Cursora (lub użyj `@PROMPT-PERSONALIZACJA.md` + linki w wiadomości).

---

Przeanalizuj treść, strukturę, kolorystykę i zasoby z:
- **Strona klienta:** [URL STRONY KLIENTA]
- **Google Maps:** [URL MAPY]

Zrób rebrand mojego **szablonu graficznego HVAC** (TanStack Start, `src/lib/presets/`) pod tę firmę. Szablon to **szata wizualna** (layout, UX, premium dark) — **nie** gotowy copy klienta. Strona ma wyglądać jak zaprojektowana dla nich (kolory, logo, zdjęcia, dane), z zachowaniem układu szablonu.

---

## Krok zero — zanim dotkniesz presetu

**Zanim** skopiujesz `default.ts` i cokolwiek wpiszesz, wypisz (dla siebie) profil firmy w **3 zdaniach**:

1. **Główny filar:** klimatyzacja / pompy ciepła / kotły / wentylacja / mix HVAC / serwis awaryjny
2. **Miasto + zasięg:** jedno miasto bazowe (nie lista 5 miast ze starej strony)
3. **Model pracy:** montaż, serwis, awarie, tylko dojazd, punkt stacjonarny?

Potem sprawdź **spójność oferty** — wszystkie pola muszą mówić o tym samym profilu:

| `heroHeadline` | `heroBullets` | `services[]` | `faqs[]` | `serviceOptionGroups[]` | `footerTagline` | `siteTitle` |
|----------------|---------------|--------------|----------|-------------------------|-----------------|-------------|
| ten sam profil | ten sam profil | ten sam profil | ten sam profil | ten sam profil | ten sam profil | ten sam profil |

Jeśli H1 mówi o klimie, a FAQ o kotłach → **popraw przed buildem**.

### Źródło prawdy przy rozjazdach (stara strona vs Maps)

| Dane | Priorytet |
|------|-----------|
| Telefon, godziny, adres, nazwa firmy, NIP | **Google Maps** (gdy rozjazd ze starą stroną) |
| Oferta, marki, zdjęcia realizacji, ceny | **stara strona klienta** |
| Ocena Google, liczba opinii, treść recenzji | **tylko Google Maps** |
| E-mail | strona klienta; jeśli brak — Maps lub footer starej strony |

### Co wyciągnąć ze starej strony

| **Bierz** | **Nie bierz** |
|-----------|---------------|
| lista usług, marki, ceny (jeśli publiczne) | slogany, hasła marketingowe |
| zdjęcia realizacji / montaży | lista wielu miast w hero |
| NIP/REGON (weryfikuj z Maps) | długie „o nas” z lat 90. |
| fakty: autoryzacja, lata działalności | „najlepsi”, „liderzy”, „komfort przede wszystkim” |

### Geografia — jedno miasto

| Źle | Dobrze |
|-----|--------|
| `siteCity`: „Katowice, Chorzów, Sosnowiec i okolice” | `siteCity`: „Katowice i okolice” |
| `serviceArea` z całym województwem | jedno miasto + „dojazd do klienta” |
| `cityLocative` zgadywane | sprawdź odmianę: „w Krakowie”, „w Gdańsku”, „w Łodzi” |

### `siteName` vs `companyLegalName`

- **`siteName`** = nazwa marketingowa (header, logo, chip)
- **`companyLegalName`** = pełna forma prawna do RODO/schema (Jan Kowalski, sp. z o.o., itd.)
- Skrót w logo ≠ pełna nazwa w stopce → rozdziel poprawnie

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
- Przeswity (`.page-ambient-scatter`, `.section-glow`, cienie kart, **hover przycisków CTA i secondary**) **dziedziczą** po `--brand-teal`, `--brand-cyan`, `--cta` — nie hardcoduj kolorów glow w CSS.
- **Glow przy hover na przyciskach** (`btn-cta`, `btn-secondary`, sticky bar „Zadzwoń”) **musi** być w kolorze marki — po zmianie palety najedź myszką i sprawdź, czy poświata nie jest nadal niebieska.
- **Zweryfikuj wizualnie** po zmianie kolorów:
  - delikatne plamy światła w tle całej strony (scroll góra–dół),
  - glow za sekcjami (usługi, opinie, realizacje, kontakt),
  - poświata przy hover na kartach i **wszystkich przyciskach** (CTA „Zadzwoń”, formularz, sticky bar mobile).
- Jeśli marka jest np. czerwona/zielona, a tło nadal „świeci na niebiesko” → źle zaktualizowano `--brand-teal` / `--brand-cyan`.

### 5. Oferta zgodna z priorytetami firmy (H1, bullety, usługi)

**To jest najważniejsza treściowa personalizacja** — obok szaty graficznej.

Przed pisaniem presetu przeanalizuj stronę klienta i Maps: **co sprzedaje w pierwszej kolejności?** (klimatyzacja, pompy ciepła, kotły, wentylacja, serwis awaryjny, montaż…)

**Na pewno dopasuj do priorytetów firmy:**

| Pole presetu | Zasada |
|--------------|--------|
| `heroHeadline` (H1) | Główna usługa firmy, 1 krótka linia. Np. firma od klimy → „Montaż i serwis klimatyzacji”; od kotłów → „Serwis i naprawa kotłów”; mix HVAC → „Montaż i serwis instalacji HVAC”. **Nie zostawiaj domyślnego H1**, jeśli nie pasuje. |
| `heroBullets` | 2 punkty = **dwa najważniejsze atuty/oferty** klienta (krótko). Kolejność = priorytet. Nie kopiuj marketingu ze starej strony — wyciągnij fakty. |
| `services[]` | 4–6 kart = **rzeczywista oferta**, od najważniejszej. Tytuł + 1 zdanie. Jeśli klient nie montuje kotłów — usuń. Jeśli robi tylko klimę — 4–6 usług klimatyzacyjnych. |
| `servicesSectionSubtitle` | Jedno zdanie podsumowujące zakres (dopasuj do firmy). |
| `serviceOptionGroups[]` | Opcje formularza = to, co klient faktycznie przyjmuje w zgłoszeniach. |
| `faqs[]` | **5 pytań pod profil branżowy firmy** (klima / pompy / kotły / wentylacja / mix). Nie zostawiaj FAQ z `default.ts`, jeśli firma robi coś innego. |
| `partners[]` | Tylko marki, którymi firma się chwali (lub `[]`). |
| `footerTagline` | Krótki opis głównego profilu (np. „Klimatyzacja i pompy ciepła”). |

**Szablon ≠ stara strona klienta.** Nie wklejaj sloganów. **Ale H1, bullety i usługi MUSZĄ odzwierciedlać to, czym firma żyje** — inaczej podgląd free value jest mylący.

**Check przed buildem:** czy H1 + usługi + bullety + **FAQ** mówią to samo co strona klienta w sekcji „Oferta” / „Usługi”? Jeśli nie — popraw preset.

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
| `src/components/HowItWorks.tsx` | Rzadko — tylko gdy proces firmy mocno odbiega (np. tylko sprzedaż bez serwisu) |
| `src/routes/index.tsx` | **Nie edytuj** przy personalizacji |
| `src/routes/__root.tsx` | Tylko `theme-color` w meta, jeśli zmieniasz ciemny akcent |

Ustaw w `.env` / `.env.example`:
- `VITE_CITY_PRESET=[id-klienta]`
- `VITE_SITE_URL=[domena podglądu lub docelowa]`

Na koniec: `npm run build` — musi przejść bez błędów.

---

## Zasada nadrzędna — szata graficzna + oferta klienta

### Co jest szablonem (zostaw)

- **Układ strony** — sekcje, kolejność, UX, formularze, sticky bar, karuzele.
- **Nagłówki sekcji** (hardcoded w `index.tsx`): „Nasze usługi”, „Opinie klientów”, „Nasze realizacje”, „Najczęstsze pytania”, „Jak to działa?”
- **Ton** — krótko, konkretnie, premium dark. Bez marketingowego bełkotu ze starych stron.

### Styl copy — ogranicz „—” (pauza em)

W treściach **widocznych na stronie** (preset: H1, bullety, usługi, FAQ, `serviceArea`, `alt` galerii, podtytuły sekcji) **nie nadużywaj znaku „—”**. Na stronie wygląda to sztucznie i źle.

**Zamiast „—” używaj:**
- przecinka: „Kraków i okolice, dojazd do klienta”
- kropki i dwóch zdań: „Montaż i serwis. Dojazd do klienta.”
- dwukropka, gdy pasuje: „Zakres: przeglądy, naprawy, montaż”

**Źle:** „Klimatyzacja, pompy ciepła — od montażu po serwis.”  
**Dobrze:** „Klimatyzacja, pompy ciepła. Od montażu po serwis.” lub „…, od montażu po serwis.”

To samo w meta SEO i opisach usług — rzadko max 1 na cały preset, a najlepiej zero.

### Co MUSISZ dopasować do klienta (priorytet treści)

**H1, `heroBullets`, `services[]`** — zawsze zgodne z **głównymi usługami i priorytetami firmy**. To nie jest opcjonalne.

1. Przeczytaj stronę klienta: co jest na pierwszym planie? (klima / pompy / kotły / wentylacja / serwis 24h…)
2. Ustaw `heroHeadline` pod ten główny profil.
3. Ustaw `heroBullets` na 2 najważniejsze fakty (nie slogany).
4. Ustaw `services[]` na 4–6 realnych usług — **kolejność = priorytet**.
5. Dopasuj FAQ, formularz, `partners[]`, SEO meta.

**Nie kopiuj** haseł typu: „Twój komfort cenimy przede wszystkim”, „Fachowe doradztwo”, „Czyste powietrze”.

### Hero (układ stały — kolejność elementów)

1. Chip z oceną Google (`googleRating` + `googleReviewCount`)
2. **H1** → `heroHeadline` (**dopasuj do firmy**)
3. **Podtytuł** → `siteCity` w formacie „[Miasto] i okolice”
4. **2 bullet pointy** → `heroBullets` (**dopasuj do firmy**)
5. CTA „Zadzwoń” + formularz

**Przykłady H1 (wybierz profil klienta, nie kopiuj ślepo):**

| Profil firmy | Przykład H1 |
|--------------|-------------|
| Klimatyzacja | Montaż i serwis klimatyzacji |
| Pompy ciepła | Montaż i serwis pomp ciepła |
| Kotły / ogrzewanie | Serwis i naprawa kotłów |
| Mix HVAC | Montaż i serwis instalacji HVAC |
| Serwis awaryjny | Serwis awaryjny klimatyzacji i HVAC |

**Subtitles sekcji (preset — dopasuj do oferty):**
- `servicesSectionSubtitle`
- `gallerySectionSubtitle`

Personalizuj tam, gdzie lead **widzi markę i ofertę**: kolory, logo, zdjęcia, kontakt, **H1, bullety, usługi**, opinie Google, meta SEO.

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
| `serviceArea` | Gdy **brak adresu**: „[Miasto] i okolice, dojazd do klienta” (fallback w Kontakt) |
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

**Procedura:**
1. Pipeta z **logo na przezroczystym tle** (nie z kolorowego banera reklamowego)
2. Logo czarno-białe → akcent z przycisku/nagłówka **starej strony**, nie domyślny niebieski szablonu
3. Po zmianie sprawdź **3 miejsca:** hover CTA, timeline „Jak to działa”, glow tła przy scrollu
4. Bardzo jasny kolor marki → sprawdź kontrast tekstu na przycisku CTA (czytelność)

Edytuj `src/styles.css` — sekcja `:root`:

| Zmienna | Efekt |
|---------|-------|
| `--brand-teal`, `--brand-cyan` | Akcenty, ikony, linki |
| `--cta`, `--cta-hover` | Przyciski CTA |
| `--primary`, `--accent`, `--ring` | Ogólna paleta UI |
| `--gradient-hero`, `--gradient-accent` | Tła hero i gradienty |

**Przeswity (glow):** `.page-ambient-scatter`, `.section-glow`, `--shadow-glow`, `--shadow-cta`, `--shadow-cta-hover` — automatycznie z `--brand-teal` / `--brand-cyan` / `--cta`. Wystarczy zmienić paletę marki; potem sprawdź tło, sekcje i **hover na przyciskach** (CTA, secondary, sticky bar).

**Timeline „Jak to działa”:** linie między krokami 1–2–3 używają `--brand-cyan` (`--timeline-line-*`). Po każdej zmianie palety **sprawdź wizualnie** tę sekcję.

Opcjonalnie zaktualizuj `theme-color` w `src/routes/__root.tsx` (meta, domyślnie `#1a2d45`).

Zachowaj **ciemny premium layout** — nie rób jasnego motywu.

### 3. Logo i favicon

- Pobierz logo klienta → `public/logo.png` (lub `.svg`)
- **Preferuj PNG/SVG z przezroczystością** — JPG z białym tłem na ciemnym headerze wygląda źle
- Jeśli tylko wersja na białym tle → szukaj wersji odwróconej / bez tła na stronie klienta
- Ustaw `logoUrl` w presetcie, np. `"/logo.png"`
- **`logoIncludesName`:** `false` gdy logo to sama ikona (nazwa `siteName` pojawi się obok); `true` gdy logo zawiera napis firmy
- **Favicon (obowiązkowe):** wytnij ikonę z logo → `public/favicon.png` → `faviconUrl: "/favicon.png"`. Nie zostawiaj domyślnego favicona szablonu.

### 4. Zdjęcia (hero + galeria)

Znajdź **bezpośrednie URL-e** zdjęć realizacji/montaży na stronie klienta.

**Weź:** montaże, serwis na miejscu, urządzenia zrealizowane u klienta (ich domena, FB, galeria).

**Nie bierz:** stocków, ikon, logo jako hero, rozmazanych miniaturek WP, zdjęć producenta bez kontekstu realizacji.

**Hero** = najlepsze zdjęcie **ich pracy**, nie baner reklamowy z dużym tekstem.

**Dla podglądu free value (szybko):** możesz użyć pełnych URL-i z domeny klienta w presetcie.

**Dla produkcji (lepiej):** pobierz do `public/gallery/`, opcjonalnie `node scripts/optimize-gallery.mjs` (JPG→WebP).

W presetcie ustaw:
- `heroImage` — tło hero
- `ogImage` — ten sam co hero lub najlepsze zdjęcie
- `gallery[]` — tyle pozycji, ile ma sens (nie sztucznie do 6); każda: `image`, `alt`, `caption`

**Galeria na stronie:** desktop pokazuje 3 zdjęcia + przycisk „Pokaż wszystkie” (już wbudowane). Przy >3 zdjęciach dodaj je do `gallery[]` — expand zadziała sam.

`alt` i `caption`: konkretne, SEO-friendly, spójne z `gallerySectionSubtitle` (bez keyword stuffingu).

#### Zdjęcia zapasowe — TYLKO gdy brak realizacji klienta

**Użyj przykładowych zdjęć wyłącznie wtedy**, gdy na stronie klienta / Maps **nie ma** sensownych zdjęć realizacji **albo jest ich mniej niż 3** (łącznie hero + galeria).

**Priorytet zawsze:** zdjęcia klienta. Zapasowe = ostateczność na podgląd free value, nie zamiast ich materiałów gdy są dostępne.

| Profil firmy | Folder ze zdjęciami przykładowymi |
|--------------|-----------------------------------|
| Klimatyzacja (główny filar) | `C:\Users\Tymek\Desktop\TOOLS\KLIMATYZACJA` |
| Pompy ciepła, kotły, ogrzewanie (główny filar) | `C:\Users\Tymek\Desktop\TOOLS\POMPY KOTLY` |
| Mix HVAC | folder pasujący do **głównego** filaru z kroku zero (klima → KLIMATYZACJA, pompy/kotły → POMPY KOTLY) |

**Procedura:**
1. Skopiuj wybrane pliki do `public/gallery/` (np. `klient-1.jpg`, `klient-2.jpg`…)
2. Opcjonalnie: `node scripts/optimize-gallery.mjs`
3. Ustaw `heroImage`, `ogImage` i `gallery[]` w presetcie
4. **`alt` i `caption`** dopasuj do profilu klienta i miasta (np. „Montaż klimatyzacji split, Kraków”) — nie pisz, że to stock
5. W raporcie końcowym **zaznacz**, że użyto zdjęć zapasowych i ile własnych znalazłeś u klienta

**Nie używaj** placeholderów SVG z szablonu, gdy możesz wziąć zapasowe zdjęcia z powyższych folderów.

### 5. Usługi, FAQ, formularz

**`services[]`** — 4–6 kart = **priorytetowa oferta klienta** (od najważniejszej). Kolejność = jak na stronie klienta / w menu, nie alfabetycznie.

**Limity copy:**
- **H1:** max ~50 znaków, bez kropki na końcu
- **Bullet:** max ~80 znaków, zaczyna się od faktu (nie „Jesteśmy…”)
- **Tytuł usługi:** 3–6 słów, czasownik + obiekt (np. „Montaż klimatyzacji split”)
- **Opis usługi:** jedno zdanie, bez powtórzenia tytułu

**Mapowanie ikon (nie losuj):**

| Typ usługi | Ikona |
|------------|-------|
| Montaż, uruchomienie | `check-circle` |
| Serwis, naprawa | `wrench` |
| Przeglądy, gwarancja | `shield-check` |
| Pompy ciepła, rekuperacja | `zap` |
| Awaria, pilny dojazd | `alert-triangle` |
| Kotły, ogrzewanie | `flame` |

Każda karta: `{ icon, title, desc }` — `desc` = 1 zdanie.

**Przed wpisaniem:** sprawdź stronę klienta — co jest w menu / na pierwszym ekranie / w Google Maps (kategorie usług). H1 i `services[]` muszą mówić o tym samym profilu.

**Dostępne ikony** (`icon` w presetcie):
`wrench` · `shield-check` · `check-circle` · `zap` · `alert-triangle` · `flame`

Jeśli żadna nie pasuje (np. klimatyzacja → `snowflake`):
1. Dodaj typ w `src/lib/presets/types.ts` → `ServiceIcon`
2. Dodaj import + mapowanie w `index.tsx` → `SERVICE_ICONS`
3. Użyj w presetcie

**`faqs[]`** — **5 pytań dopasowanych do profilu HVAC firmy**, nie ogólnego szablonu.

1. Ustal profil klienta (to samo co przy H1 i usługach): **klimatyzacja**, **pompy ciepła**, **kotły/ogrzewanie**, **wentylacja/rekuperacja**, **serwis awaryjny**, **mix**.
2. **3–4 pytania branżowe** = to, o co klienci tej firmy naprawdę pytają (ceny montażu, serwis, marki, czas realizacji, dojazd, gwarancja).
3. **1–2 pytania uniwersalne** = dojazd / obszar (`siteCity`) i ewentualnie czas reakcji przy awarii (jeśli firma to oferuje).
4. **Nie pytaj** o usługi, których firma nie ma (np. FAQ o kotłach u firmy od samej klimy).
5. Ceny w odpowiedziach: tylko jeśli klient je **publicznie** podaje na stronie. Inaczej: „wycena po oględzinach / rozmowie”.

**Przykłady tematów FAQ wg profilu:**

| Profil firmy | Przykładowe pytania (dostosuj treść) |
|--------------|--------------------------------------|
| **Klimatyzacja** | Montaż split/multi-split? · Koszt montażu? · Serwis i odgrzybianie? · Jakie marki? · Czas montażu? |
| **Pompy ciepła** | Montaż pompy? · Serwis gwarancyjny/pogwarancyjny? · Pierwsze uruchomienie? · Dotacje / formalności (jeśli firma to wspomina)? · Awaria zimą? |
| **Kotły / ogrzewanie** | Przegląd kotła? · Koszt serwisu? · Autoryzowany serwis marek? · Naprawa awaryjna? · Pierwsze uruchomienie? |
| **Wentylacja** | Montaż rekuperacji? · Serwis wentylacji? · Dobór mocy? · Przeglądy okresowe? |
| **Mix HVAC** | Po 1 pytaniu z każdego głównego filaru firmy + dojazd |

Ton: krótko, konkretnie (jak reszta szablonu). Używaj `siteCity` / `cityLocative` w odpowiedziach o zasięgu.

Ton: krótko, konkretnie (jak reszta szablonu). Używaj `siteCity` / `cityLocative` w odpowiedziach o zasięgu.

**`serviceOptionGroups[]`** — **lustrzane odbicie `services[]`**:
- Grupy = tylko usługi, które firma faktycznie oferuje (usuń całe grupy spoza oferty)
- Max 4–5 grup, po 2–4 opcje (szybki wybór na mobile)
- Etykiety grup w mianowniku (Klimatyzacja, Pompy ciepła), opcje konkretne

**`partners[]`:**
- Tylko marki wymienione na stronie klienta / „autoryzowany serwis”
- Brak dowodu → `[]` (lepiej pusto niż zmyślone marki)
- Poprawna pisownia (Mitsubishi, Daikin…), max 6–8 pozycji

### SEO (meta, nie hero)

- **`siteTitle`:** `[Główna usługa] [Miasto] | [siteName]` (max ~60 znaków)
- **`siteDescription`:** 1–2 zdania, **inne sformułowanie niż H1**, z telefonem lub CTA
- **`siteKeywords`:** 5–8 fraz tylko z oferty klienta, bez „najlepszy serwis”
- **`footerTagline`:** krótszy profil firmy, ≠ `heroHeadline`
- Nie wklejaj sloganu ze starej strony do meta

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
- Wybierz 3–5 opinii, które **wspominają główną usługę** firmy (u firmy od klimy opinia o klimie)
- Mix: montaż + serwis + szybka reakcja; `relativeTime` zgodne z Maps (nie wymyślaj)
- `name`: inicjały z Maps lub pomiń → „Użytkownik Google Maps”
- `text`: treść z Maps (możesz skrócić, nie parafrazuj na „lepsze” niż oryginał)
- `source: "google"`, `rating`, `relativeTime` (np. „3 mies. temu”)
- Na Maps <3 opinie → weź wszystkie dostępne, nie duplikuj

- **Nie zostawiaj** fikcyjnych opinii z `default.ts` (Anna K., Marek W.…)
- Hero chip, sekcja „Opinie klientów” i JSON-LD (`schema.ts`) biorą dane z presetu automatycznie

### 7. „Jak to działa”

Domyślnie **nie edytuj** — 3 kroki (Zgłoszenie → Termin → Realizacja) pasują do większości firm HVAC (montaż, serwis, przeglądy).

Edytuj `src/components/HowItWorks.tsx` **tylko** gdy proces firmy mocno odbiega (np. tylko sprzedaż bez dojazdu). Zachowaj strukturę 3 kroków i ton.

### 8. Build i weryfikacja

```bash
npm run generate:seo
npm run build
```

**`npm run build` nie wystarczy** — obowiązkowy przegląd wizualny:

**Desktop (przewiń całość):** hero → usługi → opinie → galeria → FAQ → kontakt → stopka

**Mobile:** sticky bar, formularz, karuzele, czytelność H1

**Kliknięcia:** `tel:`, WhatsApp, link Maps, formularz (jeśli env ustawione)

**Szukaj śladów poprzedniego klienta:** stare kolory w `styles.css`, placeholdery „Twoje Miasto”, fikcyjne opinie (Anna K., Marek W.).

### Raport końcowy (wypisz przed oddaniem)

Krótko podsumuj:
- Profil firmy (1 zdanie)
- Skąd wzięto telefon i NIP (Maps / strona)
- `googleReviewCount` z Maps
- Liczba zdjęć w galerii
- Czy formularz odzwierciedla `services[]`

---

## Checklist przed oddaniem leadowi

- [ ] **Krok zero:** profil firmy ustalony, tabela spójności (H1 = usługi = FAQ = formularz)
- [ ] **H1 (`heroHeadline`) = główna usługa firmy** (nie domyślny szablon, jeśli nie pasuje)
- [ ] **`heroBullets` = 2 najważniejsze fakty/oferty** klienta (nie slogany ze starej strony)
- [ ] **`services[]` = rzeczywista oferta, kolejność = priorytet** (4–6 kart)
- [ ] **Copy bez nadmiaru „—”** (H1, bullety, usługi, FAQ: przecinek/kropka zamiast pauzy em)
- [ ] Hero: ton szablonu, `siteCity` w formacie „[Miasto] i okolice”
- [ ] Kolory marki w `styles.css` — glow tła, sekcje, timeline, **hover przycisków** (bez niebieskiego z szablonu)
- [ ] Favicon = wycinek/kwadrat logo (`faviconUrl`), nie domyślny szablon
- [ ] Logo: `logoIncludesName` poprawnie; przy samej ikonie — widoczny `siteName` obok
- [ ] Hero i galeria = zdjęcia klienta; **tylko przy <3 zdjęciach** → zapasowe z folderów TOOLS (patrz sekcja 4)
- [ ] Telefon, e-mail, NIP, REGON, godziny — poprawne
- [ ] `mapsUrl` / `googleReviewsUrl` — działający link Maps
- [ ] Usługi + ikony = **priorytetowa oferta** (H1 i karty usług spójne ze stroną klienta)
- [ ] **FAQ pod profil branżowy** (klima / pompy / kotły / wentylacja / mix — bez pytań o usługi, których firma nie oferuje)
- [ ] **Formularz = lustrzane odbicie usług** (bez grup spoza oferty)
- [ ] **`partners[]`:** tylko potwierdzone marki lub `[]`
- [ ] **SEO:** `siteTitle` / `siteDescription` spójne z profilem, inne niż H1
- [ ] **Logo:** PNG/SVG z przezroczystością (nie JPG z białym tłem na ciemnym headerze)
- [ ] **Kontakt:** jeśli firma ma adres → karta „Adres”; bez adresu → „Obszar działania”
- [ ] **`googleReviewCount` = dokładna liczba z profilu Maps** (nie długość `reviews[]`)
- [ ] Ocena Google i treści recenzji = profil Google Maps
- [ ] `siteTitle` / `siteDescription` — SEO w meta, nie w H1
- [ ] `npm run build` przechodzi
- [ ] **Przegląd wizualny** desktop + mobile (nie tylko build)
- [ ] Zero placeholderów: „Twoje Miasto”, „600 000 000”, „LOGO”, fikcyjne opinie
- [ ] **Raport końcowy** wypisany (profil, źródła danych, opinie, galeria, formularz)

---

## Najczęstsze błędy po personalizacji

1. `googleReviewCount` = długość `reviews[]` zamiast liczby z Maps
2. FAQ / usługi / formularz zostawione z `default.ts` przy firmie od jednej branży
3. Niebieski glow / stare kolory poprzedniego klienta w `styles.css`
4. Generyczny favicon szablonu
5. `logoIncludesName` źle → brak nazwy lub duplikat obok logo
6. Nadmiar „—” w copy
7. `siteCity` z listą wielu miast
8. Formularz z usługami, których firma nie oferuje
9. Placeholderowe SVG zamiast zdjęć klienta lub zapasowych z TOOLS
10. Zapasowe zdjęcia z TOOLS użyte mimo że klient ma ≥3 własne realizacje
11. Kolory z motywu WP zamiast z logo
12. Logo JPG z białym tłem na ciemnym tle
13. `siteName` i `companyLegalName` pomylone w RODO/stopce

---

## Czego nie robić

- Nie nadużywaj znaku „—” w copy widocznym na stronie (wygląda sztucznie)
- Nie kopiuj marketingu ze starej strony do hero (slogany), ale H1, bullety i usługi muszą odzwierciedlać ofertę
- Nie edytuj `index.tsx` „dla jednego klienta”
- Nie zostawiaj presetu `default` jako aktywnego — zawsze nowy plik klienta
- Nie wymyślaj opinii Google
- Nie dodawaj skryptów scrapujących Maps
- Nie psuj ciemnego premium layoutu jasnym motywem
