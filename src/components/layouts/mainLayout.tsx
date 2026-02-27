"use client";
import { cn } from "@/utils";
import { Footer } from "../footer";
import { Header } from "../header";

function MainLayout({
  children,
  isLanding = false,
  withHeader = true,
}: {
  children: React.ReactNode;
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
      <Footer />
    </div>
  );
}

export default MainLayout;
