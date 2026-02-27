import { Metadata } from "next";
import { Index } from "./index";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Personal Center | SnapVee",
    description: "Manage your account and change password",
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <Index lang={lang} />;
}
