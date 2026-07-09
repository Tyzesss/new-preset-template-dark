# Plan wdrożenia zmian — Supernowa

**Źródła:** feedback klienta (mail) + [supernowa.org](https://supernowa.org/) + **potwierdzenie ustaleń (mail, 2026-07)**  
**Stan projektu:** szata graficzna zaakceptowana — **nie zmieniamy layoutu premium, kolorów, logo ani ogólnej struktury UX**  
**Faza 1:** wdrożona (adres, hero, usługi serwis-first, formularz, partnerzy, SEO/schema) — patrz §6  
**Faza 2:** wdrożona (copy supernowa.org, FAQ+cennik, HowItWorks, klimatyzacja, opinie, galeria alt) — patrz §6  
**Faza 3:** odłożona — brak nowych zdjęć od klienta; zostają obecne WebP (patrz §6)  
**Data planu:** 2026-07-07 · ostatnia aktualizacja: 2026-07-09

---

## 1. Podsumowanie intencji klienta

| Temat | Decyzja klienta |
|-------|-----------------|
| Szata graficzna | **Zostaje bez zmian** — zgodnie z przesłanym wcześniej demo |
| Główna działalność | Serwis gwarancyjny i pogwarancyjny, pierwsze uruchomienia, naprawy kotłów gazowych i pomp ciepła — **główny punkt strony** |
| Montaż | **Drugi plan** — w usługach i formularzu na dole listy |
| Klimatyzacja | **Zostaje w ofercie, na drugim planie** (nie usuwać całkowicie; nie promować w hero/SEO) |
| Teksty | Kopiować z [supernowa.org](https://supernowa.org/) (fakty, krótkie opisy — nie całe bloki marketingu do hero) |
| Adres | **Usunąć** — Grunwaldzka 31 nieaktualna po powodzi, brak siedziby przyjmującej klientów |
| Lokalizacja (zamiast adresu) | Jasny komunikat: **„Jelenia Góra i okolice, dojazd do klienta”** |
| Zdjęcia | **Na razie zostawiamy obecne** — klient podmieni w wolnej chwili, gdy prześle nowe |
| Partnerzy | Wyróżnić na stronie: Buderus, Bosch, Junkers, Termet, Broetje, Kaisai |
| Przycisk formularza | „Wyślij zapytanie” → **„Wyślij zapytanie / zgłoś zlecenie”** |
| Formularz — kolejność | **Na górze opcje serwisowe**, montaż na dole listy |

---

## 2. Co zostaje bez zmian

- Kolorystyka, logo, favicon, ciemny premium look
- Struktura sekcji: hero → usługi → jak to działa → opinie → realizacje → FAQ → kontakt/wycena
- Hero UX: badge „Bezpłatna wycena na miejscu”, formularz w panelu, CTA telefoniczne
- Karuzela realizacji na mobile + siatka 3 + „Pokaż wszystkie” na desktop
- Integracja opinii Google (rating, liczba, recenzje z presetu)
- Zoptymalizowane zdjęcia WebP w `public/gallery/` (do czasu nowych od klienta)

---

## 3. Kierunek komunikacji (priorytet treści)

### Obecny stan vs docelowy

| Obszar | Obecnie | Docelowo |
|--------|---------|----------|
| Hero H1 | „Sprzedaż i serwis / techniki grzewczej” | Serwis i naprawy kotłów / i pomp ciepła (2 linie, krótko) |
| Hero bullets / chipy | ogólne | przeglądy, awarie, pierwsze uruchomienia, autoryzowany serwis, szybki dojazd |
| Sekcja usług | montaż i sprzedaż na równi z serwisem | **serwis na górze**, montaż niżej; **klimatyzacja na drugim planie** (ostatnia karta / osobna grupa w formularzu) |
| Subtitle usług | montaż i klimatyzacja | tekst z supernowa.org: przeglądy, czyszczenie, regulacja, naprawy |
| FAQ | częściowo ogólne | pod serwis: przegląd, awaria, gwarancja, wycena przed naprawą |
| Footer | „Klimatyzacja i Serwis” | „Serwis kotłów i pomp ciepła” |
| SEO meta | sprzedaż, montaż… | serwis kotłów, naprawy, przeglądy, pierwsze uruchomienia… |

### Marki do komunikacji

Buderus · Bosch · Junkers · Termet · Broetje · Kaisai

---

## 4. Mapowanie treści z supernowa.org

| Sekcja na supernowa.org | Gdzie w szablonie | Uwagi |
|-------------------------|-------------------|--------|
| „Nasze usługi” (akapit) | subtitle sekcji + opisy kart usług | 1 zdanie na kartę |
| „Profesjonalny serwis kotłów gazowych…” | opcjonalnie krótki akapit pod usługami lub FAQ | nie w hero |
| Lista marek | nowa sekcja „Partnerzy” lub pasek pod hero | 6 nazw |
| Opinie (4 dłuższe) | `reviews[]` w presetcie | uzupełnić / wymienić z Google Maps |
| Cennik (350 zł przegląd, 300–500 naprawa) | **do potwierdzenia** — FAQ lub mini-sekcja | klient nie wspomniał w mailu |
| Kontakt „Jelenia Góra, dojazd do klienta” | karta kontaktu + footer | zamiast adresu |

**Zasada:** kopiujemy fakty i krótkie opisy, nie przenosimy długich bloków marketingowych do nagłówków widocznych.

---

## 5. Zadania szczegółowe

### 5.1 Preset `jelenia-gora.ts`

- [x] Usunąć / wyzerować pola adresu (`address`, `addressStreet`, `addressPostal`) — **Faza 1**
- [x] Zostawić `addressCity` / `siteCity`: „Jelenia Góra i okolice” — **Faza 1**
- [x] Zaktualizować `siteTitle`, `siteDescription`, `siteKeywords` — serwis, nie montaż/klima — **Faza 1**
- [x] Dodać `partners: string[]` (opcjonalnie w `types.ts`) — **Faza 1**
- [ ] Zaktualizować opisy galerii (alt/caption) — serwis/naprawy zamiast „montaż” — **Faza 2**
- [ ] Po dostarczeniu zdjęć: podmiana `gallery[]`, `heroImage`, `ogImage` — **Faza 3**
- [ ] Ewentualna aktualizacja `reviews[]` treściami z supernowa.org — **Faza 2**

### 5.2 Formularz „Wyślij zapytanie”

**Plik:** `src/routes/index.tsx` (`SERVICE_OPTION_GROUPS`, `LeadForm`)

- [x] Nowa kolejność grup (serwis na górze, montaż na dole) — **Faza 1**

```
Serwis i naprawa
  - Przegląd i konserwacja
  - Naprawa awaryjna pieca lub kotła
  - Serwis gwarancyjny / pogwarancyjny

Pierwsze uruchomienie
  - Pierwsze uruchomienie kotła
  - Pierwsze uruchomienie pompy ciepła

Inne
  - Potrzebuję doradztwa

Montaż (opcjonalnie)          ← na końcu listy
  - Montaż kotła gazowego
  - Montaż pompy ciepła
```

- [ ] **Klimatyzacja (drugi plan)** — dodać na końcu formularza, po montażu lub w grupie „Inne / opcjonalnie” — **Faza 2** (ustalenie klienta: zostaje w ofercie)
- [x] Tekst przycisku: **„Wyślij zapytanie / zgłoś zlecenie”** — **Faza 1**

### 5.3 Usunięcie adresu

| Miejsce | Działanie | Status |
|---------|-----------|--------|
| Preset | brak ulicy i kodu pocztowego | [x] Faza 1 |
| Karta kontaktu „Adres” | zamienić na **„Obszar działania”**: „Jelenia Góra i okolice — dojazd do klienta” | [x] Faza 1 |
| Footer | usunąć MapPin + ulicę; komunikat obszaru działania | [x] Faza 1 |
| `schema.ts` (JSON-LD) | bez `streetAddress`; `areaServed: Jelenia Góra` | [x] Faza 1 |
| `polityka-prywatnosci.tsx` | usunąć „z siedzibą: ul. Grunwaldzka…” | [x] Faza 1 |
| Google Maps | link tylko do opinii (nie jako adres firmy) | [x] Faza 1 |

**Pliki:** `jelenia-gora.ts`, `site.ts`, `index.tsx`, `schema.ts`, `polityka-prywatnosci.tsx`

### 5.4 Sekcja partnerów (nowa)

**Marki:** Buderus, Bosch, Junkers, Termet, Broetje, Kaisai

**Wariant minimalny (rekomendowany na start):**
- Pasek pod hero lub nad „Nasze usługi” — **[x] Faza 1**
- 6 chipów / nazw marek + linia: „Autoryzowany serwis marek: …” — **[x] Faza 1**

**Wariant rozszerzony (później):**
- Osobna sekcja „Partnerzy” z logo (gdy klient dostarczy grafiki)

**Pliki:** `index.tsx` lub nowy `src/components/PartnersSection.tsx` + dane w presetcie

### 5.5 Sekcja usług — nowa kolejność i copy

Proponowana kolejność kart (serwis first):

1. Serwis i naprawy kotłów gazowych — **[x] Faza 1**
2. Przeglądy gwarancyjne i pogwarancyjne — **[x] Faza 1**
3. Pierwsze uruchomienia — **[x] Faza 1**
4. Pompy ciepła — serwis i naprawy — **[x] Faza 1**
5. Naprawa awaryjna — **[x] Faza 1**
6. Montaż kotłów i pomp ciepła *(drugi plan)* — **[x] Faza 1**
7. ~~**Klimatyzacja** *(drugi plan, ostatnia karta)*~~ — **tylko formularz** (6 kart w siatce 3×2; klima bez osobnej karty)

**Plik:** `src/routes/index.tsx` (`services[]`)

### 5.6 Hero

- [x] H1 pod serwis (2 linie) — **Faza 1**
- [x] Bullets i chipy: serwis, przeglądy, pierwsze uruchomienia, autoryzacja marek — **Faza 1**
- [x] Badge „Bezpłatna wycena na miejscu” — **zostaje** (szablon)
- [x] `siteCity`: „Jelenia Góra i okolice” — **zostaje**

### 5.7 „Jak to działa”

**Plik:** `src/components/HowItWorks.tsx`

- [ ] Krok 3: z „Montaż” na **„Wizyta serwisowa”** / **„Serwis i naprawa”**
- [ ] Opisy kroków dopasować do dojazdu do klienta (bez „pomiaru pod montaż klimy”)

### 5.8 FAQ

- [ ] Pytania pod serwis (przegląd, awaria, gwarancja, wycena przed naprawą)
- [ ] Ewentualnie cennik w FAQ (jeśli klient potwierdzi): przegląd od 350 zł, naprawa 300–500 zł
- [ ] Usunąć pytania o montaż klimatyzacji

### 5.9 Opinie

- [ ] Zostawić `googleRating` / `googleReviewCount` z Maps
- [ ] Rozważyć wymianę treści `reviews[]` na dłuższe opinie z supernowa.org (min. 3–5)
- [ ] `mapsUrl` — link do profilu Google (opinie), nie promocja nieaktualnego adresu

### 5.10 Zdjęcia (po dostarczeniu przez klienta)

1. Wrzucić pliki do `public/gallery/`
2. Uruchomić `node scripts/optimize-gallery.mjs` (konwersja JPG → WebP)
3. Zaktualizować ścieżki w `jelenia-gora.ts`
4. Dostosować alt/caption pod serwis

**Nie blokować Fazy 1–2 oczekiwaniem na zdjęcia.**

### 5.11 SEO i techniczne

- [x] `siteTitle`: np. „Serwis kotłów Jelenia Góra | Supernowa” — **Faza 1**
- [x] `siteDescription`: serwis, naprawy, przeglądy, pierwsze uruchomienia, dojazd — **Faza 1**
- [x] JSON-LD: `HVACBusiness` / serwis bez ulicy, `areaServed` — **Faza 1**
- [ ] `.env.example` — jeśli zmiana domeny na supernowa.org — **Faza 4 / po wdrożeniu**
- [ ] `scripts/generate-seo-files.mjs` — canonical pod docelową domenę — **po przekierowaniu domeny**

---

## 6. Fazy wdrożenia

### Faza 1 — bez zależności od klienta ✅ (wdrożona)

1. Usunięcie adresu (preset, kontakt, footer, schema, RODO)
2. Formularz: kolejność opcji + tekst przycisku
3. Usługi: serwis na górze, montaż na dół
4. Hero + chipy + footer pod serwis
5. Sekcja partnerów (6 marek)
6. SEO meta w presetcie

**Do domknięcia w Fazie 2 (ustalenie klienta):** przywrócić klimatyzację na drugim planie (karta usług + opcja formularza).

### Faza 2 — treści z supernowa.org + ustalenia klienta ✅ (wdrożona)

7. Subtitle i opisy usług (copy z supernowa.org)
8. FAQ pod serwis (+ cennik w FAQ: 350 zł przegląd, 300–500 zł naprawa)
9. „Jak to działa” — krok serwisowy (bez „klimatyzacji” w nagłówku procesu)
10. Aktualizacja `reviews[]`
11. **Klimatyzacja** — karta usługi + opcja formularza na końcu (drugi plan, bez hero/SEO)
12. Alt/caption galerii — ton serwisowy (zdjęcia bez zmian do Fazy 3)

### Faza 3 — zdjęcia ⏸️ (odłożona — brak plików od klienta)

13. ~~Nowa galeria + hero + OG image~~ — **pominięte**; zostają obecne zdjęcia WebP z `public/gallery/`
14. ~~Alt/caption pod nowe realizacje~~ — **już zrobione w Fazie 2** (ton serwisowy); aktualizacja po dostarczeniu nowych zdjęć

**Kiedy klient prześle zdjęcia:** wrzucić do `public/gallery/` → `node scripts/optimize-gallery.mjs` → zaktualizować `gallery[]`, `heroImage`, `ogImage` w `jelenia-gora.ts`

### Faza 4 — opcjonalnie / po wdrożeniu

15. ~~Sekcja cennik~~ — **nie wdrażamy**; zakres cen z supernowa.org zostaje w FAQ (przegląd od 350 zł, naprawa 300–500 zł)
16. Logo partnerów (gdy klient dostarczy pliki graficzne) — **oczekuje**
17. **Przekierowanie domeny** — krótka rozmowa z klientem (~3 min), domena zostaje u obecnego rejestratora — **po deployu**
18. Aktualizacja `siteDefaultUrl`, canonical, sitemap pod docelową domenę — **[x]** `supernowa-jg.pl` w presetcie i `.env.example`

---

## 7. Pliki do edycji (checklist)

```
src/lib/presets/jelenia-gora.ts
src/lib/presets/types.ts              (opcjonalnie: partners[], address optional)
src/lib/site.ts                       (obsługa braku adresu)
src/lib/schema.ts
src/routes/index.tsx                  (usługi, formularz, hero, partnerzy, kontakt, footer)
src/components/HowItWorks.tsx
src/routes/polityka-prywatnosci.tsx
.env.example                          (jeśli zmiana domeny)
```

---

## 8. Pytania do klienta (przed / w trakcie wdrożenia)

1. **Cennik** z supernowa.org (350 zł przegląd, 300–500 naprawa) — na stronie czy tylko telefonicznie?
2. ~~**Klimatyzacja** — całkiem usunąć z usług i formularza?~~ → **Potwierdzone: zostaje w ofercie, na drugim planie** (wdrożyć w Fazie 2)
3. **Domena docelowa:** supernowa-jg.pl, supernowa.org, czy inna? → **Domena zostaje u obecnego rejestratora klienta; przekierowanie po zakończeniu prac (krótka rozmowa)**
4. **Google Maps** — zostawiamy link do opinii mimo braku adresu? → tak (Faza 1)
5. **Logo partnerów** — same nazwy (Faza 1), czy klient dostarczy grafiki? (Faza 4)
6. **Nowe zdjęcia** — klient podmieni w wolnej chwili po przesłaniu (Faza 3 — nie blokuje dalszych prac)

---

## 9. Ryzyka i uwagi

- **Schema.org bez adresu** — OK dla działalności mobilnej; kluczowe `areaServed`.
- **Spójność:** RODO, footer i karty kontaktu muszą być zsynchronizowane przy usuwaniu adresu.
- **Nie wracać do „klimatyzacji”** w hero i SEO — klient jasno ustawił serwis kotłów/pomp; **klimatyzacja tylko w usługach/formularzu na drugim planie**.
- **Montaż na dole formularza** — reszta strony (usługi, FAQ) też musi to odzwierciedlać.
- **Szata graficzna** — klient zadowolony; zmiany tylko w copy i danych, nie w layoutcie.

---

## 10. Checklist przed oddaniem klientowi

- [x] Brak adresu Grunwaldzka 31 nigdzie na stronie (w tym RODO i schema) — **Faza 1**
- [x] Komunikacja: serwis first, montaż second — **Faza 1**
- [x] 6 partnerów wymienionych na stronie — **Faza 1**
- [x] Formularz: montaż na dole listy, przycisk „Wyślij zapytanie / zgłoś zlecenie” — **Faza 1**
- [x] Klimatyzacja w ofercie na drugim planie (formularz) — **Faza 2**
- [x] Treści spójne z supernowa.org (bez starych haseł ze sprzedaży/sklepu) — **Faza 2**
- [x] Opinie Google aktualne / uzupełnione z supernowa.org — **Faza 2**
- [x] Build bez błędów
- [ ] Po nowych zdjęciach: galeria i hero zaktualizowane — **Faza 3 (odłożona — czekamy na klienta)**
- [x] Zakres cen w FAQ (bez osobnej sekcji cennik) — **Faza 2**
- [ ] Domena przekierowana na nową stronę (po rozmowie z klientem) — **po wdrożeniu**

---

## 11. AI Search Optimization (GEO / LLMO) — w cenie

Klient pytał o „blokowanie przez AI” — chodzi o to, że boty (ChatGPT, Gemini, Claude, Perplexity itd.) indeksują sieć i na tej podstawie odpowiadają na pytania typu: *„Kto serwisuje pompy Buderusa w Jeleniej Górze?”*. Jeśli strona jest źle zakodowana, zablokowana w `robots.txt` albo bez jasnych fraz, AI ją pomija.

**To jest w cenie** — technicznie niewielki nakład, a dla klienta dowód, że strona jest „na czasie”.

### Co robimy (podstawy, bez over-engineeringu)

| Element | Działanie w projekcie |
|---------|------------------------|
| **Semantyka HTML** | Zachować poprawną strukturę: jeden `<h1>`, sekcje z nagłówkami, sensowne `<section>` / landmarki (już w szablonie — utrzymać przy zmianach copy) |
| **Słowa kluczowe pod AI** | W FAQ, opisach usług i meta wpleść naturalne frazy: „serwis kotłów Buderus w Jeleniej Górze”, „naprawa pomp ciepła Bosch”, „pierwsze uruchomienie”, „dojazd do klienta” — bez sztucznego keyword stuffingu |
| **JSON-LD (schema.org)** | `HVACBusiness` + `areaServed`, usługi, opinie — boty AI i Google czytają to jako fakt o firmie (`src/lib/schema.ts`) |
| **robots.txt + meta** | `Allow: /`, sitemap, `index, follow` — **nie blokować** GPTBot / Google-Extended / zwykłych crawlerów (obecny `robots.txt` OK; nie dodawać `Disallow` dla botów AI) |
| **Meta title / description** | Jasne, odpowiadające na intencję: kto, gdzie, co robi (preset `siteTitle`, `siteDescription`) |

### Czego nie obiecujemy

- Gwarancji pozycji w odpowiedziach ChatGPT
- Osobnych skryptów, API ani płatnych narzędzi GEO
- Blokady lub „optymalizacji pod każdego bota” osobno — wystarczą: czysty kod, treść, schema, otwarte indeksowanie

### Co powiedzieć klientowi, jak zapyta

> „Strona jest przygotowana pod wyszukiwarki i asystentów AI: czytelna struktura, opisy pod Wasze usługi i marki, dane firmy w kodzie dla robotów oraz pełne indeksowanie. Dzięki temu przy pytaniach o serwis kotłów czy pomp w Jeleniej Górze AI ma z czego skorzystać — to standard w cenie nowoczesnej strony.”

### Checklist GEO (przy wdrożeniu Fazy 1–2)

- [x] `robots.txt`: `Allow: /`, bez blokady botów AI — **Faza 1**
- [x] Meta + JSON-LD zaktualizowane pod serwis i `areaServed: Jelenia Góra` — **Faza 1**
- [x] FAQ i usługi z naturalnymi frazami (marki + miasto + typ usługi) — **Faza 2**
- [x] Jeden czytelny H1 + logiczna hierarchia nagłówków po zmianach copy — **Faza 1**

---

## 12. Potwierdzenie klienta — zakres i ustalenia biznesowe (2026-07)

> Treść na podstawie maila potwierdzającego zakres prac. Służy jako odniesienie przy Fazach 2–4 i przy oddaniu projektu.

### 12.1 Zakres poprawek i treść strony

| Punkt | Ustalenie |
|-------|-----------|
| **Wygląd** | Szata graficzna **pozostaje bez zmian** (zgodnie z przesłanym wcześniej demo) |
| **Nacisk na serwis** | Głównym punktem strony: **naprawy, przeglądy i uruchomienia**. Montaż przesunięty na dalszy plan |
| **Partnerzy** | Wyróżnione marki: Buderus, Bosch, Junkers, Termet, Broetje, Kaisai |
| **Lokalizacja** | Usuwamy adres stacjonarny. Komunikat: **„Jelenia Góra i okolice, dojazd do klienta”** |
| **Formularz** | Na górze listy opcje serwisowe; montaż na dole. Przycisk: **„Wyślij zapytanie / zgłoś zlecenie”** |
| **Klimatyzacja** | **Zostaje w ofercie, na drugim planie** — nie promować w hero/SEO |
| **Zdjęcia** | **Na razie obecne** — klient podmieni w wolnej chwili, gdy prześle nowe |

### 12.2 Domena, hosting i rozliczenie

| Temat | Ustalenie |
|-------|-----------|
| **Domena** | Zostaje tam, gdzie klient ją obecnie opłaca. Po zakończeniu prac: **krótka rozmowa (~3 min)** i pomoc w przekierowaniu na nową stronę |
| **Hosting i SSL** | Utrzymanie na szybkim serwerze + certyfikat SSL — **pierwszy rok gratis** u wykonawcy |
| **Abonament** | **Brak opłat abonamentowych** w pierwszym roku |
| **Przyszłe poprawki** | Rozliczane **jednorazowo**, tylko gdy faktycznie potrzebne |

### 12.3 Zadania operacyjne (poza kodem strony)

- [ ] Po zakończeniu Faz 2–3: umówić 3-min rozmowę o przekierowaniu DNS domeny
- [ ] Udokumentować klientowi: hosting + SSL gratis rok 1, brak abonamentu
- [ ] Przy ewentualnych zmianach po roku 1 — wycena jednorazowa per zlecenie
