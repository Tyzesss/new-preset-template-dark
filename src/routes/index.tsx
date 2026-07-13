import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { toast } from "sonner";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Wrench,
  ShieldCheck,
  Zap,
  Flame,
  AlertTriangle,
  CheckCircle2,
  Menu,
  X,
  Star,
  ChevronDown,
} from "lucide-react";
import { MobileCarousel } from "@/components/MobileCarousel";
import { SiteLogo } from "@/components/SiteLogo";
import { PartnersSection } from "@/components/PartnersSection";
import { StickyCallBar } from "@/components/StickyCallBar";
import { HowItWorks } from "@/components/HowItWorks";
import { GoogleReviewsSection } from "@/components/GoogleReviewsSection";
import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";
import { submitLeadForm } from "@/lib/web3forms";

import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_CITY,
  PHONE_DISPLAY,
  PHONE_HREF,
  EMAIL,
  EMAIL_HREF,
  CONTACT_LOCATION,
  CONTACT_LOCATION_LABEL,
  HAS_PHYSICAL_ADDRESS,
  HOURS,
  MAPS_URL,
  NIP,
  GALLERY,
  GOOGLE_REVIEWS_URL,
  HERO_IMAGE,
  HERO_HEADLINE,
  HERO_BULLETS,
  FOOTER_TAGLINE,
  SERVICES_SECTION_SUBTITLE,
  GALLERY_SECTION_SUBTITLE,
  SERVICES,
  FAQS,
  SERVICE_OPTION_GROUPS,
} from "@/lib/site";
import type { ServiceIcon, ServiceItem } from "@/lib/presets";

export const Route = createFileRoute("/")({
  loader: async () => {
    const { getGoogleReviews } = await import("@/lib/google-reviews.server");
    return { googleReviews: await getGoogleReviews() };
  },
  component: Index,
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
    ],
  }),
});

const NAV_LINKS = [
  { href: "#uslugi", label: "Usługi" },
  { href: "#jak-dzialamy", label: "Jak to działa" },
  { href: "#opinie", label: "Opinie" },
  { href: "#realizacje", label: "Realizacje" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

const SERVICE_ICONS: Record<ServiceIcon, typeof Wrench> = {
  wrench: Wrench,
  "shield-check": ShieldCheck,
  zap: Zap,
  "alert-triangle": AlertTriangle,
  "check-circle": CheckCircle2,
  flame: Flame,
};

const services = SERVICES.map((s) => ({ ...s, icon: SERVICE_ICONS[s.icon] }));

const gallery = GALLERY;
const GALLERY_PREVIEW_COUNT = 3;

const faqs = FAQS;


function HeroGoogleRating({
  rating,
  reviewCount,
  profileUrl,
}: {
  rating: number;
  reviewCount: number;
  profileUrl: string;
}) {
  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-xs text-white/85 backdrop-blur-sm transition-smooth hover:border-white/25 hover:bg-white/10 sm:text-sm"
    >
      <div className="flex shrink-0" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400 sm:h-3.5 sm:w-3.5" />
        ))}
      </div>
      <span className="font-semibold text-white">{rating.toFixed(1)}</span>
      <span className="text-white/65">· {reviewCount} opinii Google</span>
    </a>
  );
}

function CTAButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={PHONE_HREF}
      className={`btn-cta px-6 py-3.5 text-sm md:px-10 md:py-4 md:text-lg ${className}`}
    >
      <Phone className="h-5 w-5 shrink-0 md:h-6 md:w-6" />
      <span>Zadzwoń · {PHONE_DISPLAY}</span>
    </a>
  );
}

const FORM_HEADLINE = "Nie możesz się skontaktować?";
const FORM_SUBLINE = "Zostaw numer, oddzwonimy do Ciebie.";

function LeadForm() {
  const [service, setService] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const inputClass =
    "h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3.5 text-sm text-white placeholder:text-white/50 outline-none transition-smooth focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/25";

  const labelClass = "text-xs font-medium text-white/85";

  const selectTriggerClass = cn(
    "h-11 w-full rounded-lg border-white/20 bg-white/10 text-sm text-white shadow-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/25 data-[placeholder]:text-white/50",
  );

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (submitting) return;

        const form = e.currentTarget;
        const formData = new FormData(form);
        const phone = String(formData.get("phone") ?? "").trim();
        const name = String(formData.get("name") ?? "").trim();

        setSubmitting(true);
        try {
          await submitLeadForm({ name, phone, service: service || undefined });
          toast.success("Dziękujemy! Oddzwonimy do Ciebie wkrótce.", {
            description: "Twoje zgłoszenie zostało przyjęte.",
          });
          form.reset();
          setService("");
        } catch {
          toast.error("Nie udało się wysłać zgłoszenia.", {
            description: `Zadzwoń: ${PHONE_DISPLAY}`,
          });
        } finally {
          setSubmitting(false);
        }
      }}
      className="grid gap-3.5 text-left"
    >
      <div className="grid gap-1.5">
        <Label htmlFor="lead-phone" className={labelClass}>
          Telefon
        </Label>
        <input required id="lead-phone" type="tel" name="phone" placeholder={`np. ${PHONE_DISPLAY}`} className={inputClass} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="lead-name" className={labelClass}>
          Imię
        </Label>
        <input required id="lead-name" type="text" name="name" placeholder="Twoje imię" className={inputClass} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="lead-service" className={labelClass}>
          Rodzaj usługi <span className="text-white/50">(opcjonalnie)</span>
        </Label>
        <input type="hidden" name="service" value={service} />
        <Select value={service || undefined} onValueChange={setService}>
          <SelectTrigger id="lead-service" className={selectTriggerClass}>
            <SelectValue placeholder="Wybierz z listy" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            {SERVICE_OPTION_GROUPS.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
      <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-snug text-white/75">
        <input
          required
          type="checkbox"
          name="rodo"
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-white/30 accent-[var(--cta)]"
        />
        <span>
          Akceptuję{" "}
          <Link to="/polityka-prywatnosci" className="text-brand-cyan underline underline-offset-2 hover:text-white">
            Politykę Prywatności
          </Link>{" "}
          i wyrażam zgodę na kontakt w sprawie zgłoszenia serwisowego (RODO).
        </span>
      </label>
      <button type="submit" disabled={submitting} className="btn-cta h-11 w-full text-sm disabled:opacity-60">
        {submitting ? "Wysyłanie…" : "Poproś o kontakt"}
      </button>
    </form>
  );
}

function ServiceCard({ s, index }: { s: ServiceItem & { icon: typeof Wrench }; index: number }) {
  const Icon = s.icon;
  const num = String(index + 1).padStart(2, "0");
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "card-glass group relative h-full overflow-hidden rounded-xl p-5 text-left transition-smooth md:hover:-translate-y-0.5 md:hover:border-brand-cyan/25 md:hover:shadow-glow",
        revealClass,
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="absolute right-4 top-4 text-xs font-semibold tabular-nums text-white/25">{num}</span>
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/8 text-brand-cyan transition-smooth group-hover:scale-110 group-hover:border-brand-cyan/30 group-hover:bg-brand-cyan/10">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="pr-8 text-base font-semibold text-foreground">{s.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
    </div>
  );
}

function GallerySection() {
  const [expanded, setExpanded] = useState(false);
  const hasMore = gallery.length > GALLERY_PREVIEW_COUNT;
  const visible = expanded ? gallery : gallery.slice(0, GALLERY_PREVIEW_COUNT);

  return (
    <>
      {/* Mobile ma karuzelę — pokazujemy wszystko, bez przycisku "Pokaż wszystkie" */}
      <MobileCarousel dark items={gallery} renderItem={(g) => <GalleryCard g={g} />} />
      <div className="hidden md:grid grid-cols-3 gap-5">
        {visible.map((g, i) => (
          <GalleryCard key={g.image} g={g} index={i} />
        ))}
      </div>

      {hasMore ? (
        <Reveal delay={120} className="mt-8 hidden justify-center md:flex">
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="btn-secondary px-6 py-3 text-sm"
            aria-expanded={expanded}
          >
            <ChevronDown
              className={cn("h-4 w-4 transition-transform duration-300", expanded && "rotate-180")}
              aria-hidden
            />
            {expanded ? "Pokaż mniej" : `Pokaż wszystkie realizacje (${gallery.length})`}
          </button>
        </Reveal>
      ) : null}
    </>
  );
}

function GalleryCard({ g, index = 0 }: { g: (typeof gallery)[number]; index?: number }) {
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();
  return (
    <figure
      ref={ref}
      className={cn("group", revealClass)}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/15 bg-brand-deep shadow-card ring-1 ring-white/10 transition-smooth md:group-hover:-translate-y-0.5 md:group-hover:border-brand-cyan/30 md:group-hover:shadow-glow">
        <img
          src={g.image}
          alt={g.alt}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
      </div>
    </figure>
  );
}

const contactCards = [
  { type: "phone", icon: Phone, title: "Zadzwoń", value: PHONE_DISPLAY, href: PHONE_HREF },
  { type: "email", icon: Mail, title: "E-mail", value: EMAIL, href: EMAIL_HREF },
  ...(CONTACT_LOCATION
    ? [
        {
          type: HAS_PHYSICAL_ADDRESS ? ("address" as const) : ("area" as const),
          icon: MapPin,
          title: CONTACT_LOCATION_LABEL,
          value: CONTACT_LOCATION,
          href: HAS_PHYSICAL_ADDRESS ? MAPS_URL : (null as string | null),
        },
      ]
    : []),
  { type: "hours", icon: Clock, title: "Godziny", value: HOURS, href: null as string | null },
];

function ContactCard({
  c,
  index = 0,
  compact = false,
  stretch = false,
}: {
  c: (typeof contactCards)[number];
  index?: number;
  compact?: boolean;
  stretch?: boolean;
}) {
  const Icon = c.icon;
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();
  const isPhone = c.type === "phone";
  const inner = (
    <div
      ref={ref}
      className={cn(
        "panel-glass flex min-w-0 items-center text-left transition-smooth md:hover:border-white/15",
        stretch ? "h-full flex-1" : "h-full",
        compact ? "gap-3 rounded-xl p-3.5" : "gap-4 rounded-2xl p-4",
        isPhone && "border-brand-cyan/20",
        revealClass,
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-brand-cyan transition-smooth group-hover:scale-105",
          compact ? "h-10 w-10" : "h-11 w-11",
          isPhone && "border-brand-cyan/25 bg-brand-cyan/10",
        )}
      >
        <Icon className={compact ? "h-[1.125rem] w-[1.125rem]" : "h-5 w-5"} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-white/55">{c.title}</p>
        <p
          className={cn(
            "mt-0.5 font-semibold text-white leading-snug",
            compact ? "text-base" : "text-sm",
            c.type === "email" ? "break-all leading-snug" : "break-words",
          )}
        >
          {c.value}
        </p>
      </div>
    </div>
  );
  return c.href ? (
    <a
      href={c.href}
      target={c.type === "address" ? "_blank" : undefined}
      rel="noreferrer"
      className={cn("group block min-w-0", stretch ? "flex min-h-0 flex-1 flex-col" : "h-full")}
    >
      {inner}
    </a>
  ) : (
    <div className={cn(stretch && "flex min-h-0 flex-1 flex-col")}>{inner}</div>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl transition-smooth",
        scrolled ? "bg-background/80 shadow-card" : "bg-background/60",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <a
          href="#top"
          className="flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <SiteLogo />
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-smooth hover:text-brand-cyan hover:underline hover:underline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={PHONE_HREF}
            className="btn-cta max-md:!hidden md:inline-flex px-5 py-2.5 text-sm"
          >
            <Phone className="h-4 w-4" /> Zadzwoń
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex rounded-full p-2 text-foreground transition-smooth hover:bg-white/10 md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="animate-fade-in border-b border-white/10 bg-background/98 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-4 text-left">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-3 text-base font-semibold text-foreground transition-smooth last:border-0 hover:text-brand-cyan"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Index() {
  const { googleReviews } = Route.useLoaderData();

  return (
    <div className="page-shell">
      <div className="page-ambient-scatter" aria-hidden />
      <div className="page-content">
      <SiteHeader />

      <div className="hero-services-unit">
        <div className="hero-services-bg" aria-hidden>
          <div
            className="hero-photo"
            style={{ backgroundImage: `url(${HERO_IMAGE ?? "/gallery/placeholder-1.svg"})` }}
          />
          <div className="hero-photo-scrim" />
        </div>

        <section
          id="top"
          className="relative z-10 scroll-mt-24 px-4 pt-6 pb-12 text-foreground max-md:min-h-[36rem] md:min-h-[34rem] md:pt-12 md:pb-16"
        >
        <div className="relative mx-auto max-w-6xl md:grid md:grid-cols-2 md:gap-12 md:items-center">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="hero-enter hero-enter-delay-0 order-1 flex justify-center md:order-3 md:mt-3 md:justify-start">
              <HeroGoogleRating
                rating={googleReviews.rating}
                reviewCount={googleReviews.reviewCount}
                profileUrl={googleReviews.profileUrl || GOOGLE_REVIEWS_URL}
              />
            </div>

            <h1 className="hero-enter hero-enter-delay-1 order-2 mt-3 text-[2.5rem] font-bold leading-[1.06] max-md:mx-auto md:order-1 md:mt-4 md:text-[3.25rem] lg:text-[3.5rem]">
              {HERO_HEADLINE}
            </h1>

            <p className="hero-enter hero-enter-delay-2 order-3 mt-2 text-xl font-medium text-white/85 md:order-2 md:mt-2 md:text-2xl">
              {SITE_CITY}
            </p>

            <ul className="hero-enter hero-enter-delay-4 order-4 mx-auto mt-4 hidden max-w-xl space-y-2.5 text-left text-base leading-snug text-white/85 md:mx-0 md:block md:text-lg">
              {HERO_BULLETS.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan shadow-[0_0_8px] shadow-brand-cyan/60"
                    aria-hidden
                  />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="hero-enter hero-enter-delay-5 order-5 mt-4 flex justify-center md:mt-6 md:justify-start">
              <CTAButton />
            </div>
          </div>

          <div className="hero-enter hero-enter-delay-7 panel-glass mt-5 w-full rounded-2xl p-5 text-center max-md:[&_form]:text-left md:mt-0 md:text-left">
            <p className="text-sm font-semibold text-white">{FORM_HEADLINE}</p>
            <p className="mt-1 text-xs text-white/75">{FORM_SUBLINE}</p>
            <div className="mt-4">
              <LeadForm />
            </div>
          </div>
        </div>
        </section>

        <Section
          id="uslugi"
          eyebrow="Usługi"
          title="Nasze usługi"
          subtitle={SERVICES_SECTION_SUBTITLE}
          glow={{ x: "22%", y: "58%", strength: 0.035 }}
        >
          <MobileCarousel dark items={services} renderItem={(s) => <ServiceCard s={s} index={services.indexOf(s)} />} />
          <div className="hidden md:grid grid-cols-3 gap-5">
            {services.map((s, i) => (
              <ServiceCard key={s.title} s={s} index={i} />
            ))}
          </div>

          <div className="mt-8">
            <PartnersSection />
          </div>
        </Section>
      </div>

      <HowItWorks />

      {/* REVIEWS */}
      <Section
        id="opinie"
        eyebrow="Opinie Google"
        title="Opinie klientów"
        subtitle="Sprawdzone recenzje z profilu Google Maps. Możesz je zweryfikować jednym kliknięciem."
        glow={{ x: "78%", y: "36%", cyan: true }}
      >
        <GoogleReviewsSection data={googleReviews} />
      </Section>

      {/* GALLERY */}
      <Section
        id="realizacje"
        panel
        eyebrow="Portfolio"
        title="Nasze realizacje"
        subtitle={GALLERY_SECTION_SUBTITLE}
        glow={{ x: "44%", y: "48%" }}
      >
        <GallerySection />
      </Section>

      {/* FAQ */}
      <Section
        id="faq"
        eyebrow="FAQ"
        title="Najczęstsze pytania"
        subtitle="Odpowiedzi na pytania o przeglądy, naprawy, wycenę i dojazd do klienta."
      >
        <Reveal>
          <div className="card-glass mx-auto max-w-3xl rounded-xl px-2 md:px-4">
            <Accordion type="single" collapsible className="w-full text-left">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10 px-2">
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-brand-cyan hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground md:text-base">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
            </Accordion>
          </div>
        </Reveal>
      </Section>

      {/* KONTAKT + WYCENA */}
      <section
        id="kontakt"
        className="relative scroll-mt-24 overflow-hidden px-4 pt-10 pb-14 text-foreground md:pt-16 md:pb-20"
      >
        <div
          className="section-glow section-glow--cyan pointer-events-none"
          style={{ "--glow-x": "16%", "--glow-y": "55%", "--glow-strength": "0.05" } as CSSProperties}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl">
          <div id="wycena" className="scroll-mt-24">
            <div className="panel-glass rounded-2xl p-5 md:hidden">
              <Reveal className="text-center">
                <p className="section-eyebrow">Kontakt</p>
                <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white">Skontaktuj się z nami</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75">Zadzwoń, napisz lub zostaw numer.</p>
              </Reveal>

              <Reveal delay={80} className="mt-6">
                <p className="text-sm font-semibold text-white">{FORM_HEADLINE}</p>
                <p className="mt-1 text-xs text-white/75">{FORM_SUBLINE}</p>
                <div className="mt-4 [&_form]:text-left">
                  <LeadForm />
                </div>
              </Reveal>

              <div className="my-6 h-px bg-white/10" aria-hidden />

              <div className="flex flex-col gap-3">
                {contactCards.map((c, i) => (
                  <ContactCard key={c.title} c={c} index={i} compact />
                ))}
              </div>
            </div>

            <div className="panel-glass mx-auto hidden max-w-4xl rounded-2xl p-5 md:block md:p-8 lg:p-10">
              <Reveal className="text-center">
                <p className="section-eyebrow">Kontakt</p>
                <h2 className="mt-1.5 text-4xl font-bold tracking-tight text-white">Skontaktuj się z nami</h2>
                <p className="mt-1.5 text-base leading-relaxed text-white/75">Zadzwoń, napisz lub zostaw numer.</p>
              </Reveal>

              <div className="mx-auto mt-8 grid w-full md:grid-cols-[minmax(0,26rem)_minmax(0,24rem)] md:items-stretch md:justify-center md:gap-7 lg:mt-10 lg:gap-8">
                <Reveal className="h-full text-left">
                  <p className="text-sm font-semibold text-white">{FORM_HEADLINE}</p>
                  <p className="mt-1 text-xs text-white/75">{FORM_SUBLINE}</p>
                  <div className="mt-4 flex flex-1 flex-col">
                    <LeadForm />
                  </div>
                </Reveal>

                <div className="flex h-full min-h-0 flex-col gap-3">
                  {contactCards.map((c, i) => (
                    <ContactCard key={c.title} c={c} index={i} compact stretch />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative px-4 pt-10 pb-24 text-foreground md:pb-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <p className="font-bold text-foreground">{SITE_NAME} · {FOOTER_TAGLINE}</p>
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <a href={PHONE_HREF} className="inline-flex items-center gap-1.5 transition-smooth hover:text-foreground">
              <Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
            </a>
            <a
              href={EMAIL_HREF}
              className="inline-flex max-w-full items-center gap-1.5 break-all transition-smooth hover:text-foreground"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" /> {EMAIL}
            </a>
            {CONTACT_LOCATION ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0" /> {CONTACT_LOCATION}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0" /> {HOURS}
            </span>
          </p>
          <p className="mt-3 text-xs text-white/45">NIP: {NIP}</p>
          <p className="mt-4 text-xs text-white/45">
            <Link
              to="/polityka-prywatnosci"
              className="underline underline-offset-2 transition-smooth hover:text-foreground"
            >
              Polityka Prywatności (RODO)
            </Link>
            {" · "}© {new Date().getFullYear()} {SITE_NAME}. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </footer>

      <StickyCallBar />
      </div>
    </div>
  );
}

type SectionGlow = {
  x: string;
  y: string;
  cyan?: boolean;
  strong?: boolean;
  strength?: number;
};

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  glow,
  panel = false,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  glow?: SectionGlow;
  panel?: boolean;
  className?: string;
}) {
  const glowStyle = glow
    ? ({
        "--glow-x": glow.x,
        "--glow-y": glow.y,
        ...(glow.strength != null ? { "--glow-strength": String(glow.strength) } : {}),
      } as CSSProperties)
    : undefined;

  const header = (
    <Reveal className={`text-center ${eyebrow ? "mb-6 md:mb-10" : "mb-8 md:mb-12"}`}>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2
        className={cn(
          "text-2xl font-bold tracking-tight md:text-4xl",
          panel ? "text-white" : "text-foreground",
          eyebrow && "mt-1.5",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-sm leading-relaxed md:text-base",
            panel ? "text-white/75" : "text-muted-foreground",
            eyebrow ? "mt-1.5" : "mt-2",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );

  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 overflow-hidden px-4 pt-10 pb-14 text-foreground md:pt-16 md:pb-20",
        className,
      )}
    >
      {glow && (
        <div
          className={cn(
            "section-glow",
            glow.cyan && "section-glow--cyan",
            glow.strong && "section-glow--strong",
          )}
          style={glowStyle}
          aria-hidden
        />
      )}
      <div className="relative mx-auto max-w-6xl">
        {panel ? (
          <div className="panel-glass rounded-2xl p-5 text-center md:p-8 lg:p-10">
            {header}
            {children}
          </div>
        ) : (
          <>
            {header}
            {children}
          </>
        )}
      </div>
    </section>
  );
}