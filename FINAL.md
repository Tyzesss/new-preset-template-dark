# FINAL — Supernowa · stan projektu i postanowienia

**Klient:** Supernowa Tomasz Piekarski · serwis techniki grzewczej  
**Domena docelowa:** `supernowa-jg.pl`  
**Preset:** `jelenia-gora`  
**Repo:** `Tyzesss/supernowa`  
**Hosting:** Vercel  
**Data:** 2026-07-09  
**Status:** **preview gotowy do pokazania klientowi** · go-live po uzgodnieniu DNS + podmiana odbiorcy w Web3Forms

**Powiązane:** `PLANZMIAN.MD` (plan faz), `NOWEZMIANY.md` (checklist techniczny)

---

## Werdykt

| Etap | Status |
|------|--------|
| Kod + UX (Fazy 1–2 + audyt) | ✅ Gotowe |
| Build produkcyjny | ✅ Przechodzi |
| Preview na Vercel (`*.vercel.app`) | ✅ Działa |
| Formularz localhost | ✅ Działa |
| Formularz Vercel (dev key) | ✅ Działa |
| Pokazanie klientowi (preview URL) | ✅ Można |
| Go-live na `supernowa-jg.pl` | ⏳ Po rozmowie z klientem |
| Nowe zdjęcia od klienta | ⏳ Oczekuje — nie blokuje preview |

---

## Ustalenia z klientem (nie zmieniać bez uzgodnienia)

### Pozycjonowanie i oferta
- **Serwis first** — hero, SEO i komunikacja pod serwis kotłów i pomp ciepła.
- **Klimatyzacja** — zostaje w ofercie **tylko w formularzu** (grupa „opcjonalnie”), **bez** karty w siatce usług, **bez** promowania w hero/SEO.
- **6 kart usług** w siatce (bez klimatyzacji).
- **Brak sekcji Cennik** — ceny wyłącznie w FAQ:
  - przegląd: od **350 zł brutto**
  - naprawa/awaria: od **300 zł brutto** (w zależności od zakresu)
- **Brak adresu stacjonarnego** — Grunwaldzka 31 usunięta wszędzie (footer, kontakt, RODO, schema). Komunikat: dojazd do klienta, Jelenia Góra i okolice.

### Hero (Alternatywa A — wdrożona)
- Odchudzony hero: bez ratingu, bez bulletów, bez chipsów pod CTA.
- **Badge:** „Dojazd do klienta”
- **H1:** „Serwis i naprawy / techniki grzewczej”
- **Pod H1:** „Jelenia Góra i okolice” (tylko raz — nie duplikować w badge)
- **Opis:** „Przeglądy, naprawy i pierwsze uruchomienia kotłów oraz pomp ciepła.”
- **CTA:** telefon
- **Formularz w hero** — zostaje; ton serwisowy:
  - nagłówek: „Oddzwonimy do Ciebie”
  - przycisk: **„Poproś o kontakt”**
  - RODO: zgłoszenie serwisowe (nie „wyceny”)

### Marki serwisowane
- Sekcja **pod „Usługami”** (nie pod hero).
- Format: **jedna linia tekstu** z separatorami `·` (bez chipów, bez scrolla):
  - Buderus · Bosch · Junkers · Termet · Broetje · Kaisai
- Nagłówek: **„Marki serwisowane”**

### Realizacje (galeria)
- **Bez podpisów** pod zdjęciami w UI (`caption` ukryty).
- `alt` zostaje (SEO).
- Na razie **5 zdjęć `.webp`** z presetu — klient **nie przesłał** nowych; to nie blokuje preview.

### Kontakt i CTA
- Sticky bar mobile: **WhatsApp + Zadzwoń** (nie SMS).
- Menu: jeden link **„Kontakt”** (bez duplikatu „Wycena”).
- Opinie Google: sekcja niżej (nie w hero).

---

## Formularz — Web3Forms

### Wybrana technologia
**[Web3Forms](https://web3forms.com)** — POST z przeglądarki na `https://api.web3forms.com/submit`.

### Etap 1 — preview (✅ zrobione)
- Klucz dev na **Twój e-mail** (nie klienta).
- Lokalnie: `.env` → `VITE_WEB3FORMS_ACCESS_KEY` (nie commitować).
- Vercel env (**Production + Preview**):
  - `VITE_CITY_PRESET` = `jelenia-gora`
  - `VITE_WEB3FORMS_ACCESS_KEY` = klucz dev
- Po dodaniu/zmianie env: **obowiązkowy Redeploy** (Vite wkleja `VITE_*` przy buildzie).
- Testy: localhost ✅ · `*.vercel.app` ✅

### Restrict to Domains (Web3Forms)
- Funkcja **PRO** — na darmowym planie **pominięta**.
- Klucz `VITE_*` jest widoczny w bundlu JS — na preview akceptowalne (klucz dev, limit 250/mies.).
- Przy go-live: rozważyć **PRO** albo **proxy serwerowe** (ukrycie klucza), jeśli klient chce twardsze zabezpieczenie.

### Etap 2 — go-live z klientem (⏳ do zrobienia)

**Wybrana metoda (przetestowana ✅):** Linked email + Recipient — **bez nowego klucza**, bez konta u klienta.

Ty zarządzasz Web3Forms; klient tylko klika link weryfikacyjny. Ten sam `VITE_WEB3FORMS_ACCESS_KEY` w Vercel — **bez podmiany env**.

#### Kroki przy go-live

1. **Rozmowa z klientem** (~2 min): „przyjdzie mail weryfikacyjny od formularza — kliknij link”.
2. Web3Forms → **Linked Emails** → dodaj `supernowatpiekarski@gmail.com` (z presetu).
3. Klient klika link weryfikacyjny (nie zakłada konta).
4. Web3Forms → **Email Configuration → Recipient Emails**:
   - na free: limit **1/1**
   - usuń swój mail testowy
   - ustaw **linked email klienta** jako jedynego odbiorcę
5. Vercel → **Production** env (tylko domena — klucz zostaje ten sam):
   - `VITE_SITE_URL` = `https://supernowa-jg.pl`
   - **Redeploy** Production (dla canonical/sitemap)
6. DNS: `supernowa-jg.pl` (+ `www` jeśli używane) → Vercel (~3 min z klientem).
7. Test formularza z żywej domeny → mail u klienta (+ spam).

#### Uwagi

| Temat | Decyzja |
|-------|---------|
| Kto zarządza formularzem | **Ty** (konto Web3Forms) |
| Gdzie trafiają leady (prod) | Gmail klienta jako **Recipient** |
| Zmiana klucza w Vercel | **Nie trzeba** |
| CC / kopia dla Ciebie | **PRO** — na free wybór: albo Ty, albo klient (1/1) |
| Restrict to Domains | **PRO** — pominięte na free |

#### Metoda alternatywna (nieużywana)

Nowy Access Key na Gmail klienta + podmiana `VITE_WEB3FORMS_ACCESS_KEY` w Vercel — działa, ale **niepotrzebna** skoro Linked email + Recipient sprawdzone.

> **⛔ Nie dodawać maila klienta jako Recipient przed go-live** — testowe zgłoszenia trafiłyby do niego bez uprzedzenia.

#### Stan na teraz (preview — potwierdzone)

- **Recipient Emails = Twój mail** — zostaje tak do czasu Twojej komendy przy go-live.
- Klientowi pokazujesz stronę na `vercel.app`; leady z formularza trafiają **do Ciebie** (OK na etapie demo).
- **Nie przełączać** na mail klienta samodzielnie — dopiero gdy dasz znać (DNS + go-live).
- Przy przełączeniu: Linked email klienta → verify → Recipient na `supernowatpiekarski@gmail.com` → test z żywej domeny.

---

## SEO i techniczne

| Element | Stan |
|---------|------|
| Title / description / keywords | ✅ Preset `jelenia-gora` |
| Canonical, OG, Twitter | ✅ `__root.tsx` |
| JSON-LD `HVACBusiness` | ✅ Bez street address |
| `robots.txt` + `sitemap.xml` | ✅ Generowane przy build (`supernowa-jg.pl`) |
| Brak klimatyzacji w hero/SEO title | ✅ |
| Brak Grunwaldzkiej | ✅ |

Po go-live: upewnić się, że `VITE_SITE_URL=https://supernowa-jg.pl` w Vercel Production (canonical i sitemap zgodne z żywą domeną).

---

## Vercel — env (ściąga)

| Zmienna | Preview (teraz) | Production (go-live) |
|---------|-------------------|----------------------|
| `VITE_CITY_PRESET` | `jelenia-gora` | `jelenia-gora` |
| `VITE_WEB3FORMS_ACCESS_KEY` | Twój klucz | **ten sam klucz** (bez zmiany) |
| `VITE_SITE_URL` | opcjonalnie | `https://supernowa-jg.pl` |

**Ważne:** po zmianie `VITE_SITE_URL` → **Redeploy**. Podmiana odbiorcy leadów = **panel Web3Forms** (Recipient Emails), nie Vercel.

---

## Co pokazać klientowi teraz

1. Link **Vercel preview** (`https://….vercel.app`).
2. Krótko: serwis kotłów/pomp, dojazd, telefon/WhatsApp, formularz działa (**leady na Twój mail** — celowo, do go-live).
3. Galeria = tymczasowe zdjęcia — **nowe po przesłaniu od klienta**.
4. Go-live = domena + **podmiana Recipient** na Gmail klienta w Web3Forms (jedna rozmowa, bez nowego klucza).

**Info dla klienta (hosting):** Vercel + SSL, rok 1 w pakiecie, brak miesięcznego abonamentu po stronie strony (poza ewentualnym PRO Web3Forms, jeśli wybiorą).

---

## Po stronie klienta (oczekuje)

### Zdjęcia (Faza 3 — nie blokuje)
- [ ] Klient prześle nowe zdjęcia → `public/gallery/`
- [ ] `node scripts/optimize-gallery.mjs`
- [ ] Aktualizacja `gallery[]`, `heroImage`, `ogImage` w `jelenia-gora.ts`
- [ ] Alt pod nowe realizacje (podpisy w UI nie — decyzja: bez caption)

### Go-live (Faza 4)
- [ ] Rozmowa z klientem + Linked email + podmiana Recipient na `supernowatpiekarski@gmail.com`
- [ ] `VITE_SITE_URL` w Vercel Production + redeploy
- [ ] DNS → Vercel
- [ ] Test formularza z `supernowa-jg.pl`
- [ ] Przekazanie dostępu / info o utrzymaniu

---

## Opcjonalnie później (nie blokuje oddania)

- Logo partnerów (grafiki) zamiast linii tekstowej
- Google Places API — opinie na żywo (`GOOGLE_PLACES_API_KEY`)
- Web3Forms PRO — Restrict to Domains
- Proxy serwerowe dla klucza formularza
- Refaktor: `services[]`, `faqs[]` → preset `jelenia-gora.ts`
- Semantyka HTML (`article` / `address`) — kosmetyka

---

## Kolejność następnych kroków

1. ✅ Preview na Vercel — **zrobione**
2. **Pokaz klientowi** link `vercel.app`
3. **Czekać na zdjęcia** (opcjonalna aktualizacja galerii)
4. **Go-live:** rozmowa → Linked email klienta → Recipient w Web3Forms → `VITE_SITE_URL` + DNS → test
5. Zamknięcie projektu / przekazanie

---

*Ostatnia aktualizacja: 2026-07-09 — go-live Web3Forms: Linked email + Recipient (przetestowane), bez nowego klucza.*
