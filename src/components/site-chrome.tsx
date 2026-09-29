import { Link } from "@tanstack/react-router";
import { BarChart3, BookOpen, Flame, Heart, Home, Medal } from "lucide-react";
import type { ReactNode } from "react";

export function Stat({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2" aria-label={`${label}: ${value}`}>
      {icon}
      <span className="font-black text-foreground">{value}</span>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b-2 border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 rotate-3 place-items-center rounded-lg bg-secondary text-xl font-black text-secondary-foreground shadow-[0_4px_0_color-mix(in_oklab,var(--secondary)_65%,var(--foreground))]">K</div>
          <span className="font-display text-2xl font-black text-primary">Kollin</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-7">
          <Stat icon={<Flame className="h-6 w-6 fill-coral text-coral" />} value="12" label="Dagar i rad" />
          <Stat icon={<Heart className="h-6 w-6 fill-primary text-primary" />} value="5" label="Liv" />
          <div className="hidden sm:block"><Stat icon={<Medal className="h-6 w-6 text-sun" />} value="840" label="Poäng" /></div>
        </div>
      </div>
    </header>
  );
}

export function BottomNav() {
  const itemClasses = "flex flex-col items-center gap-1";
  return (
    <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t-2 border-border bg-card px-3 py-2 lg:hidden">
      <Link to="/" activeOptions={{ exact: true }} className={itemClasses} activeProps={{ className: "text-primary" }} inactiveProps={{ className: "text-muted-foreground" }}>
        <Home className="h-6 w-6" />
        <span className="text-xs font-black">Övningar</span>
      </Link>
      <Link to="/amnen" activeOptions={{ exact: true }} className={itemClasses} activeProps={{ className: "text-primary" }} inactiveProps={{ className: "text-muted-foreground" }}>
        <BookOpen className="h-6 w-6" />
        <span className="text-xs font-black">Ämnen</span>
      </Link>
      <Link to="/" hash="progress" className={`${itemClasses} text-muted-foreground`}>
        <BarChart3 className="h-6 w-6" />
        <span className="text-xs font-black">Framsteg</span>
      </Link>
    </nav>
  );
}
