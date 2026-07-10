import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { SiteLogo } from "@/components/SiteLogo";
import {
  SITE_NAME,
  SITE_TITLE,
  EMAIL,
  COMPANY_LEGAL_NAME,
  NIP,
  REGON,
  PHONE_DISPLAY,
  SERVICE_AREA,
  HAS_PHYSICAL_ADDRESS,
  PHYSICAL_ADDRESS,
} from "@/lib/site";

export const Route = createFileRoute("/polityka-prywatnosci")({
  component: PolitykaPrywatnosci,
  head: () => ({
    meta: [
      { title: `Polityka Prywatności (RODO) | ${SITE_NAME}` },
      {
        name: "description",
        content: `Polityka prywatności i informacja o przetwarzaniu danych osobowych — ${SITE_NAME}.`,
      },
    ],
  }),
});

function PolitykaPrywatnosci() {
  return (
    <div className="page-shell relative min-h-screen">
      <div className="page-ambient-scatter" aria-hidden />
      <div className="page-content">
      <header className="border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-foreground">
            <SiteLogo />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-smooth hover:text-brand-cyan"
          >
            <ArrowLeft className="h-4 w-4" />
            Strona główna
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Polityka Prywatności (RODO)</h1>
        <p className="mt-2 text-sm text-muted-foreground">Ostatnia aktualizacja: {new Date().getFullYear()}</p>

        <div className="prose-policy mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Administrator danych</h2>
            <p className="mt-2">
              Administratorem danych osobowych jest {COMPANY_LEGAL_NAME} (dalej: „Administrator”), prowadząca
              działalność pod marką {SITE_NAME}
              {HAS_PHYSICAL_ADDRESS
                ? `, z siedzibą: ${PHYSICAL_ADDRESS},`
                : SERVICE_AREA
                  ? `, obsługująca klientów na terenie ${SERVICE_AREA},`
                  : ","}{" "}
              NIP: {NIP}, REGON: {REGON}. W sprawach
              związanych z ochroną danych można kontaktować się pod adresem e-mail:{" "}
              <a href={`mailto:${EMAIL}`} className="text-brand-cyan underline hover:text-foreground">
                {EMAIL}
              </a>{" "}
              lub telefonicznie: {PHONE_DISPLAY}.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Zakres i cele przetwarzania</h2>
            <p className="mt-2">
              Przetwarzamy dane podane w formularzu kontaktowym (imię, numer telefonu, opcjonalnie rodzaj usługi)
              wyłącznie w celu:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>kontaktu zwrotnego w sprawie zgłoszenia serwisowego lub przygotowania wyceny,</li>
              <li>obsługi zapytań oraz realizacji umowy (jeśli dojdzie do jej zawarcia).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Podstawa prawna</h2>
            <p className="mt-2">
              Dane przetwarzamy na podstawie art. 6 ust. 1 lit. b RODO (działania przed zawarciem umowy) oraz
              art. 6 ust. 1 lit. a RODO (zgoda wyrażona poprzez formularz i akceptację niniejszej polityki).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Okres przechowywania</h2>
            <p className="mt-2">
              Dane przechowujemy przez czas niezbędny do udzielenia odpowiedzi i prowadzenia korespondencji
              handlowej, nie dłużej niż jest to wymagane przepisami prawa lub do momentu wycofania zgody —
              jeśli przetwarzanie opiera się wyłącznie na zgodzie.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Prawa osoby, której dane dotyczą</h2>
            <p className="mt-2">Przysługuje Ci prawo do:</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>dostępu do danych, sprostowania, usunięcia lub ograniczenia przetwarzania,</li>
              <li>przenoszenia danych,</li>
              <li>wniesienia sprzeciwu wobec przetwarzania,</li>
              <li>cofnięcia zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania przed cofnięciem),</li>
              <li>wniesienia skargi do Prezesa UODO.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Odbiorcy danych</h2>
            <p className="mt-2">
              Dane mogą być powierzane podmiotom świadczącym usługi hostingu, dostarczania formularza kontaktowego
              (Web3Forms) oraz poczty e-mail — wyłącznie na podstawie umów powierzenia i w zakresie niezbędnym do
              realizacji usług.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Dobrowolność podania danych</h2>
            <p className="mt-2">
              Podanie danych w formularzu jest dobrowolne, lecz niezbędne do kontaktu zwrotnego w sprawie zgłoszenia
              serwisowego.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">8. Pliki cookies</h2>
            <p className="mt-2">
              Strona może wykorzystywać pliki cookies niezbędne do prawidłowego działania serwisu (np. sesja,
              preferencje wyświetlania). Nie stosujemy cookies marketingowych ani narzędzi analitycznych wymagających
              dodatkowej zgody. Użytkownik może zarządzać cookies w ustawieniach przeglądarki.
            </p>
          </section>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">{SITE_TITLE}</p>
      </main>
      </div>
    </div>
  );
}
