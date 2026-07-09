import { Reveal } from "@/components/Reveal";
import { PARTNERS } from "@/lib/site";

export function PartnersSection() {
  if (PARTNERS.length === 0) return null;

  return (
    <Reveal className="relative z-10 px-4 pb-6 md:pb-8">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-white/55">Autoryzowany partner</p>
        <p className="mx-auto mt-2 max-w-3xl text-sm font-medium text-white/80 md:text-base">
          {PARTNERS.join(" · ")}
        </p>
      </div>
    </Reveal>
  );
}
