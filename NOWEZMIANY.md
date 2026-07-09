# Nowe zmiany — checklist przed oddaniem klientowi

**Projekt:** Supernowa · serwis i naprawy techniki grzewczej  
**Data:** 2026-07-09  
**Status:** audyt końcowy UX + kod — lista rzeczy do zrobienia  
**Powiązane:** `PLANZMIAN.MD` (plan faz), ten plik = **konkretne zadania do domknięcia**

**Formularz:** wybrana opcja → **[Web3Forms](https://web3forms.com)**  
**Na teraz:** tylko **Twój e-mail** (dev/test). **Mail klienta dopiero przy go-live** — po wcześniejszym uzgodnieniu (żeby nie dostawał maili weryfikacyjnych / testowych bez uprzedzenia).

---

## Już zrobione (nie wracać)

- [x] Faza 1–2: serwis first, adres usunięty, partnerzy, hero, formularz, SEO/schema
- [x] FAQ odchudzone (5 pytań), ceny z supernowa.org w FAQ (bez sekcji Cennik)
- [x] Usługi: 6 kart, krótsze opisy, bez nadmiaru myślników
- [x] Hero H1: „Serwis i naprawy / techniki grzewczej”
- [x] Klimatyzacja tylko w formularzu (na drugim planie), bez karty w siatce usług
- [x] Build przechodzi, domena docelowa w preset: `supernowa-jg.pl`

---

## F. Formularz Web3Forms — plan wdrożenia (2 etapy)

> **Zasada:** kod i testy **teraz** wyłącznie na **Twoim mailu**. Klucz produkcyjny (odbiorca: klient) + domena w Web3Forms **dopiero przy DNS**, po telefonie z klientem.

> **⛔ Nie wpisywać maila klienta w Web3Forms** do czasu go-live — weryfikacja i testowe zgłoszenia trafiłyby do niego bez uprzedzenia.

### F.1 Teraz — kod i testy (bez klienta)

- [ ] Założyć konto na [web3forms.com](https://web3forms.com) i **Access Key na swój e-mail** (tylko do dev/testów)
- [ ] W panelu Web3Forms → **Allowed Domains:**
  - [ ] `localhost`
  - [ ] `*.vercel.app` (preview / deploy przed DNS)
- [ ] Dodać do `.env` (lokalnie, **nie commitować**):
  ```env
  VITE_WEB3FORMS_ACCESS_KEY=twój_klucz_dev
  ```
- [x] Zaktualizować `.env.example`:
  ```env
  VITE_WEB3FORMS_ACCESS_KEY=
  ```
- [x] W `LeadForm` (`index.tsx`): `POST` → `https://api.web3forms.com/submit`
  - pola: `access_key`, `name`, `phone`, opcjonalnie `service` (custom / w treści)
  - sukces → toast „Oddzwonimy…”
  - błąd → toast + zachęta do telefonu
- [x] **Placeholder telefonu** — `600 000 000` → `533 843 330`
- [x] **Tekst RODO w formularzu** — „kontakt w sprawie zgłoszenia serwisowego” (nie „wyceny”)
- [ ] Test lokalny: `npm run dev` → zgłoszenie trafia na **Twój** mail
- [ ] Deploy na Vercel → test z URL `*.vercel.app` → zgłoszenie na **Twój** mail
- [x] `npm run build` bez błędów po zmianach

### F.2 Później — przy podłączaniu domeny (po uzgodnieniu z klientem)

- [ ] **Najpierw:** krótka rozmowa — „będzie mail weryfikacyjny od formularza, kliknij link”
- [ ] Nowy **Access Key** w Web3Forms na **Gmail klienta** (adres z presetu `EMAIL` w `jelenia-gora.ts`)
- [ ] Klient klika **jeden link** weryfikacyjny Web3Forms
- [ ] W Web3Forms → **Allowed Domains** (docelowe):
  - [ ] `supernowa-jg.pl`
  - [ ] `www.supernowa-jg.pl` (jeśli używane)
  - [ ] opcjonalnie usunąć `localhost` / `vercel.app` po testach
- [ ] Vercel → **Environment Variables** → `VITE_WEB3FORMS_ACCESS_KEY` = klucz produkcyjny (Production)
- [ ] DNS: domena → Vercel (~3 min z klientem)
- [ ] `VITE_SITE_URL=https://supernowa-jg.pl` na produkcji
- [ ] Jeden test formularza z **żywej domeny** → mail u klienta (+ sprawdzić spam)
- [x] **RODO** (`polityka-prywatnosci.tsx`): dopisek o **Web3Forms** (§6 — już w kodzie)

### F.3 Uwagi

| Temat | Decyzja |
|-------|---------|
| Odbiorca leadów (prod) | Gmail klienta z presetu — **tylko po F.2 i uzgodnieniu** |
| Testy teraz | Wyłącznie **Twój** mail — nigdy mail klienta w Web3Forms przed go-live |
| Klucz w kodzie | `VITE_*` = widoczny w bundlu; **obowiązkowo** Allowed Domains w panelu Web3Forms |
| Dev vs prod | Osobny klucz dev (Twój mail) i prod (klient) |
| Bez klucza | Formularz nie wysyła — nie oddawać strony z samym `toast` |

---

## A. Blokery — zrób przed oddaniem klientowi

### Formularz i zaufanie

- [x] **Web3Forms** — kod wdrożony (patrz sekcja **F**); klucz dev + testy po Twojej stronie
- [x] **Tekst RODO w formularzu** — patrz F.1
- [x] **Placeholder telefonu** — patrz F.1

### Spójność komunikacji (serwis mobilny)

- [x] **Hero badge** — „Bezpłatna wycena przy dojeździe”.
- [x] **CTA kontaktowe** — sticky bar: WhatsApp (`WHATSAPP_HREF`).
- [x] **Menu nawigacji** — usunięty duplikat „Wycena”; zostaje tylko „Kontakt”.

### Ślady szablonu demo

- [x] **Polityka prywatności** — `SiteLogo` zamiast `Snowflake`; dopisek o Web3Forms w §6.
- [x] **Opinie fallback** (`jelenia-gora.ts`) — inicjały M. K., R. T., A. W., J. P.

---

## B. Poprawa jakości (szybkie, nie blokują deployu)

### Copy i UX

- [x] **FAQ** — myślniki zamienione na kropki / przecinki.
- [ ] **Sekcja usług** — opcjonalnie: lekko wydłużyć 1–2 opisy kart, jeśli nadal wyglądają „pusto” na desktopie (bez powrotu do ściany tekstu).
- [x] **Galeria** — `caption` pod zdjęciem w `GalleryCard`.

### Techniczne porządki

- [x] **Usunąć lub wykluczyć z deployu** duże `public/gallery/*.jpg` (~25 MB) — usunięte + `public/gallery/*.jpg` w `.gitignore`.
- [x] **Fallback hero** w `index.tsx` — ścieżka `.jpg` → `.webp`.
- [ ] **Semantyka HTML** (opcjonalnie): karty usług/kontaktu jako `article` / `address` zamiast gołych `div`.

---

## C. Po wdrożeniu / od klienta

### Zdjęcia (Faza 3 — **oczekuje na klienta**)

> **Status:** klient jeszcze nie przesłał zdjęć — **nie blokujemy deployu**. Na stronie zostają obecne 5 zdjęć `.webp` z presetu (serwis Buderus / pompa ciepła).

- [ ] Klient prześle nowe zdjęcia → `public/gallery/`
- [ ] `node scripts/optimize-gallery.mjs`
- [ ] Aktualizacja `gallery[]`, `heroImage`, `ogImage` w `jelenia-gora.ts`
- [ ] Alt/caption pod nowe realizacje

### Domena i hosting (Faza 4)

- [ ] **Commit + push** zmian na GitHub (`origin/main`) — repo: `Tyzesss/supernowa`
- [ ] Deploy na Vercel (import z GitHub **lub** CLI — patrz § Deploy poniżej)
- [ ] Vercel → **Environment Variables** (Preview + Production na start):
  - `VITE_CITY_PRESET` = `jelenia-gora`
  - `VITE_WEB3FORMS_ACCESS_KEY` = Twój klucz dev (nie klienta)
  - `VITE_SITE_URL` = `https://supernowa-jg.pl` (na preview można zostawić domyślne SEO)
- [ ] **Formularz prod** — sekcja **F.2** (klucz klienta + Allowed Domains) — dopiero przy DNS
- [ ] Krótka rozmowa z klientem (~3 min) — przekierowanie DNS `supernowa-jg.pl` na Vercel
- [ ] Weryfikacja: `VITE_SITE_URL`, `robots.txt`, `sitemap.xml`, canonical
- [ ] Przekazać klientowi info: hosting + SSL rok 1 gratis, brak abonamentu

### Opcjonalnie później

- [ ] Logo partnerów (grafiki od klienta) zamiast samych chipów tekstowych
- [ ] Google Places API — opinie na żywo (`GOOGLE_PLACES_API_KEY` w `.env`)
- [ ] Refaktor: przenieść `services[]`, `faqs[]`, copy z `index.tsx` do presetu `jelenia-gora.ts`

---

## D. Pliki do edycji (mapa)

| Zadanie | Plik(i) |
|---------|---------|
| Web3Forms + placeholder + RODO formularza | `src/routes/index.tsx` |
| Klucz API (dev) | `.env` (gitignore) |
| Klucz API (szablon) | `.env.example` |
| Klucz API (prod) | Vercel → Environment Variables |
| RODO — Web3Forms + logo | `src/routes/polityka-prywatnosci.tsx` |
| Hero badge | `src/routes/index.tsx` |
| Menu (wycena/kontakt) | `src/routes/index.tsx` |
| Sticky bar WhatsApp/SMS | `src/components/StickyCallBar.tsx` |
| HowItWorks WhatsApp | `src/components/HowItWorks.tsx` |
| Opinie fallback | `src/lib/presets/jelenia-gora.ts` |
| FAQ copy | `src/routes/index.tsx` |
| Galeria caption | `src/routes/index.tsx` (`GalleryCard`) |
| JPG cleanup | `public/gallery/*.jpg`, `.gitignore` |
| Nowe zdjęcia | `jelenia-gora.ts`, `public/gallery/` |
| DNS / SEO prod | `.env`, `scripts/generate-seo-files.mjs` |

---

## E. Weryfikacja przed „gotowe”

- [ ] Formularz z **localhost** — mail na skrzynkę dev (wymaga `VITE_WEB3FORMS_ACCESS_KEY` w `.env`)
- [ ] Formularz z **vercel.app** — mail na skrzynkę dev (klucz w Vercel env)
- [ ] Formularz z **supernowa-jg.pl** — mail u klienta (**dopiero po F.2**, po uzgodnieniu)
- [x] Kliknięcie tel. / WhatsApp / mail — linki w HTML (`tel:`, `wa.me`, `mailto:`) — smoke test preview OK
- [x] Brak „Klimatyzacja” w hero, H1, SEO title (preset `jelenia-gora`; klima tylko w formularzu)
- [x] Brak adresu Grunwaldzka (footer, kontakt, RODO, schema)
- [x] Opinie Google linkują do profilu Maps (`maps.app.goo.gl`)
- [x] `npm run build` bez błędów
- [x] Podgląd lokalny (`npm run preview`) — strona główna + RODO 200 OK
- [ ] Podgląd mobile (ręcznie): menu, sticky bar, karuzela realizacji, formularz

---

## F. Deploy na Vercel (krok po kroku)

> **Bez zdjęć od klienta** — deploy preview jest OK. Galeria zostaje z obecnymi 5 zdjęciami.

### Opcja A — GitHub + dashboard (zalecane)

1. Zcommituj i wypchnij zmiany na `main` (lokalnie masz niezacommitowaną pracę z Faz A/B + Web3Forms).
2. [vercel.com/new](https://vercel.com/new) → Import `Tyzesss/supernowa`.
3. Build: domyślne (Nitro preset `vercel` z `vite.config.ts` → output `.vercel/output`).
4. **Environment Variables** (Preview + Production):
   | Zmienna | Wartość |
   |---------|---------|
   | `VITE_CITY_PRESET` | `jelenia-gora` |
   | `VITE_WEB3FORMS_ACCESS_KEY` | Twój klucz dev |
5. Deploy → otwórz URL `*.vercel.app` → test formularza.
6. Web3Forms → Allowed Domains: dodaj `*.vercel.app`.

### Opcja B — CLI (po zalogowaniu)

```bash
npx vercel login
npm run build
npx vercel deploy --prebuilt
```

Przy pierwszym deployu CLI zapyta o projekt — powiąż z repo lub utwórz nowy.

### Po deploy preview

- [ ] Formularz z `*.vercel.app` → mail na **Twój** adres
- [ ] Sprawdź mobile na żywym URL
- [ ] **DNS + klucz klienta** — dopiero F.2, gdy klient gotowy na go-live

---

## Priorytet wdrożenia (kolejność)

1. ~~Formularz Web3Forms — kod (F.1)~~ ✅
2. ~~Spójność CTA + hero badge (A)~~ ✅
3. ~~Snowflake → logo, opinie fallback (A)~~ ✅
4. ~~Menu, FAQ myślniki, JPG cleanup (B)~~ ✅
5. **Web3Forms:** klucz dev + `.env` + test lokalny
6. **Commit + push** → **Deploy na Vercel** → test formularza na `*.vercel.app`
7. **DNS + Web3Forms prod (F.2)** — po rozmowie z klientem
8. **Nowe zdjęcia (C)** — gdy klient prześle (nie blokuje punktów 5–7)
