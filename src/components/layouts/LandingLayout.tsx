import { cn } from "@/utils";
import LandingFooter from "@/components/landing/LandingFooter";
import { Header } from "@/components/header";
import type { Locale } from "@/lib/i18n";

function LandingLayout({
  children,
  currentLocale,
  isLanding = false,
  withHeader = true,
}: {
  children: React.ReactNode;
  currentLocale: Locale;
  isLanding?: boolean;
  withHeader?: boolean;
}) {
  return (
    <div
      className={cn(
        isLanding ? "" : "bg-black",
        "text-foreground flex min-h-screen flex-col overflow-x-hidden",
      )}
    >
      {withHeader && <Header />}
      <main className="relative mb-6 flex-1 md:px-0 overflow-x-hidden">
        {children}
      </main>
      <LandingFooter currentLocale={currentLocale} />
    </div>
  );
}

export default LandingLayout;
