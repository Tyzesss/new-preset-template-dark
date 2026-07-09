import { SITE_NAME, LOGO_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  imageClassName?: string;
  showName?: boolean;
};

export function SiteLogo({ className, imageClassName, showName = true }: SiteLogoProps) {
  if (LOGO_URL) {
    return (
      <span className={cn("flex items-center gap-2.5", className)}>
        <img
          src={LOGO_URL}
          alt={SITE_NAME}
          className={cn("h-9 w-auto object-contain", imageClassName)}
          width={160}
          height={36}
        />
        {showName ? (
          <span className="sr-only font-bold tracking-tight text-foreground">{SITE_NAME}</span>
        ) : null}
      </span>
    );
  }

  return (
    <span className={cn("font-bold tracking-tight text-foreground", className)}>
      {SITE_NAME}
    </span>
  );
}
