import { LOGO_INCLUDES_NAME, LOGO_URL, SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  imageClassName?: string;
};

export function SiteLogo({ className, imageClassName }: SiteLogoProps) {
  if (LOGO_URL) {
    return (
      <span className={cn("flex items-center gap-2.5", className)}>
        <img
          src={LOGO_URL}
          alt={LOGO_INCLUDES_NAME ? SITE_NAME : ""}
          className={cn("h-9 w-auto max-w-[140px] object-contain", imageClassName)}
          width={160}
          height={36}
        />
        {!LOGO_INCLUDES_NAME ? (
          <span className="font-bold tracking-tight text-foreground">{SITE_NAME}</span>
        ) : (
          <span className="sr-only">{SITE_NAME}</span>
        )}
      </span>
    );
  }

  return (
    <span className={cn("font-bold tracking-tight text-foreground", className)}>
      {SITE_NAME}
    </span>
  );
}
