import MainLayout from "@/components/layouts/mainLayout";
import { FaqC } from "@/components/faq";
import type { Locale } from "@/lib/i18n";

export function Faq({ lang }: { lang: Locale }) {
  return (
    <MainLayout>
      <FaqC id="faq" locale={lang} />
    </MainLayout>
  );
}
