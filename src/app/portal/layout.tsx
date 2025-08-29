import { Gem } from "lucide-react";
import Link from "next/link";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
        <Link href="/portal/dashboard">
            <div className="flex items-center gap-2 text-primary">
                <Gem className="h-8 w-8 text-accent" />
                <h1 className="truncate text-lg font-semibold text-primary">
                    Gilded Events - Client Portal
                </h1>
            </div>
        </Link>
        {/* Add UserNav or logout button here if needed */}
      </header>
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
}
