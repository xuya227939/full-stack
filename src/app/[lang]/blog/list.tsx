import ServerMainLayout from "@/components/layouts/ServerMainLayout";
import { ListItem } from "./listItem";
import type { Locale } from "@/lib/i18n";

export function BlogList({ currentLocale }: { currentLocale: Locale }) {
  return (
    <ServerMainLayout isLanding>
      <ListItem currentLocale={currentLocale} />
    </ServerMainLayout>
  );
}
