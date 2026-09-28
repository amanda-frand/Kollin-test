import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  Check,
  ChevronRight,
  Flame,
  Heart,
  Home,
  Lock,
  Medal,
  Play,
  Sparkles,
  Star,
  Target,
  Trophy,
} from "lucide-react";
import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mathly — Math practice that feels like play" },
      { name: "description", content: "Build real math skills through short, playful lessons and daily practice." },
      { property: "og:title", content: "Mathly — Math practice that feels like play" },
      { property: "og:description", content: "Build real math skills through short, playful lessons and daily practice." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: "primary" | "secondary" | "answer";
};

function Button({ className = "", tone = "primary", ...props }: ButtonProps) {
  const tones = {
    primary: "bg-primary text-primary-foreground border-primary shadow-button hover:brightness-110",
    secondary: "bg-card text-secondary border-border shadow-[0_4px_0_var(--border)] hover:bg-panel",
    answer: "bg-card text-card-foreground border-border shadow-[0_3px_0_var(--border)] hover:border-secondary hover:bg-panel",
  };
  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 px-5 py-3 font-extrabold transition duration-150 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 ${tones[tone]} ${className}`}
      {...props}
    />
  );
}

function Mascot({ small = false }: { small?: boolean }) {
  return (
    <div className={`${small ? "h-14 w-14" : "h-24 w-24"} relative shrink-0 animate-float`} aria-label="Milo, the Mathly mascot" role="img">
      <div className="absolute inset-[9%] rotate-6 rounded-[28%] bg-secondary shadow-[inset_0_-7px_0_color-mix(in_oklab,var(--primary)_24%,transparent)]" />
      <div className="absolute left-[23%] top-[31%] h-[17%] w-[17%] rounded-full bg-card">
        <span className="absolute inset-[28%] rounded-full bg-foreground" />
      </div>
      <div className="absolute right-[23%] top-[31%] h-[17%] w-[17%] rounded-full bg-card">
        <span className="absolute inset-[28%] rounded-full bg-foreground" />
      </div>
      <div className="absolute bottom-[28%] left-[37%] h-[10%] w-[28%] rounded-b-full border-b-[3px] border-foreground" />
      <Sparkles className="absolute -right-1 top-0 h-5 w-5 text-sun" aria-hidden="true" />
    </div>
  );
}

function Stat({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2" aria-label={`${label}: ${value}`}>
      {icon}
      <span className="font-black text-foreground">{value}</span>
    </div>
  );
}

const lessons = [
  { label: "Absolutbelopp", status: "done", icon: Check },
  { label: "Derivations definition\n& deriverbarhet", status: "done", icon: Star },
  { label: "Funktionsinvers", status: "current", icon: Play },
  { label: "Gränsvärde", status: "locked", icon: Lock },
  { label: "Slumpmässiga\nfrågor", status: "locked", icon: Trophy },
] as const;

function LessonPath() {
  return (
    <section aria-labelledby="path-title" className="relative mx-auto w-full max-w-xl pb-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm font-black uppercase text-secondary">ÄMNEN</p>
          <h1 id="path-title" className="mt-1 font-display text-3xl font-black text-foreground sm:text-4xl">Funktionslära</h1>
        </div>
        <span className="rounded-lg bg-secondary/10 px-3 py-2 text-sm font-black text-secondary">8 / 15</span>
      </div>

      <div className="relative flex flex-col items-center gap-7">
        <div className="absolute bottom-10 top-10 w-3 rounded-full bg-progress-track" aria-hidden="true" />
        {lessons.map((lesson, index) => {
          const Icon = lesson.icon;
          const isCurrent = lesson.status === "current";
          return (
            <div key={lesson.label} className={`relative z-10 flex w-full items-center ${index % 2 === 0 ? "justify-start pl-[18%]" : "justify-end pr-[18%]"}`}>
              <div className="relative flex flex-col items-center">
                {isCurrent && (
                  <div className="absolute -top-11 whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-xs font-black text-background after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-[6px] after:border-transparent after:border-t-foreground">
                    START HERE
                  </div>
                )}
                <button
                  aria-label={`${lesson.label}, ${lesson.status}`}
                  disabled={lesson.status === "locked"}
                  onClick={() => {
                    if (isCurrent) document.getElementById("practice-title")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`grid h-20 w-20 place-items-center rounded-full border-[7px] transition active:translate-y-1 sm:h-24 sm:w-24 ${
                    lesson.status === "done"
                      ? "border-success/30 bg-success text-success-foreground shadow-[0_7px_0_color-mix(in_oklab,var(--success)_65%,var(--foreground))]"
                      : isCurrent
                        ? "border-primary/25 bg-primary text-primary-foreground shadow-[0_8px_0_var(--button-shadow)] ring-8 ring-primary/10"
                        : "border-border bg-muted text-muted-foreground shadow-[0_6px_0_var(--border)]"
                  }`}
                >
                  <Icon className="h-8 w-8 fill-current" strokeWidth={3} />
                </button>
                <span className={`mt-3 text-sm font-extrabold ${isCurrent ? "text-primary" : "text-muted-foreground"}`}>{lesson.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PracticeCard() {
  const answers = [7, 8, 9, 10];
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const correct = selected === 8;

  const checkAnswer = () => {
    if (selected !== null) setChecked(true);
  };

  return (
    <section aria-labelledby="practice-title" className="overflow-hidden rounded-xl border-2 border-border bg-card shadow-card">
      <div className="flex items-center justify-between border-b-2 border-border bg-panel px-5 py-4">
        <div>
          <p className="text-xs font-black uppercase text-secondary">Quick practice</p>
          <h2 id="practice-title" className="mt-1 text-xl font-black text-foreground">Warm up your brain</h2>
        </div>
        <Mascot small />
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-sm font-bold text-muted-foreground">Lös denna gränsvärde</p>
        <p className="my-6 text-center text-5xl font-black text-foreground" aria-label="11 minus 3">11 − 3 = ?</p>
        <div className="grid grid-cols-2 gap-3">
          {answers.map((answer) => (
            <Button
              key={answer}
              tone="answer"
              aria-pressed={selected === answer}
              onClick={() => { setSelected(answer); setChecked(false); }}
              className={selected === answer ? "border-secondary bg-secondary/10 text-secondary" : ""}
            >
              {answer}
            </Button>
          ))}
        </div>
        {checked && (
          <div role="status" className={`mt-5 animate-pop rounded-lg p-4 ${correct ? "bg-success/10 text-success" : "bg-coral/10 text-coral"}`}>
            <p className="font-black">{correct ? "Brilliant! That's exactly right." : "Almost! Try counting back three steps."}</p>
          </div>
        )}
        <Button onClick={checkAnswer} disabled={selected === null} className="mt-5 w-full">
          {checked && correct ? "Keep going" : "Check answer"}
          <ChevronRight className="h-5 w-5" strokeWidth={3} />
        </Button>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <header className="sticky top-0 z-30 border-b-2 border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 rotate-3 place-items-center rounded-lg bg-secondary text-xl font-black text-secondary-foreground shadow-[0_4px_0_color-mix(in_oklab,var(--secondary)_65%,var(--foreground))]">K</div>
            <span className="font-display text-2xl font-black text-primary">Kollin</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-7">
            <Stat icon={<Flame className="h-6 w-6 fill-coral text-coral" />} value="12" label="Day streak" />
            <Stat icon={<Heart className="h-6 w-6 fill-primary text-primary" />} value="5" label="Lives" />
            <div className="hidden sm:block"><Stat icon={<Medal className="h-6 w-6 text-sun" />} value="840" label="Points" /></div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-12 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:py-12">
        <LessonPath />

        <aside className="space-y-5 lg:sticky lg:top-24">
          <div className="flex items-center gap-4 rounded-xl bg-primary px-5 py-5 text-primary-foreground shadow-button">
            <Mascot small />
            <div>
              <p className="text-lg font-black">Hey, number hero!</p>
              <p className="mt-1 text-sm font-bold opacity-85">One quick lesson keeps your streak alive.</p>
            </div>
          </div>
          <PracticeCard />
          <section id="progress" aria-label="Daily goal" className="scroll-mt-24 rounded-xl border-2 border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="h-7 w-7 text-coral" strokeWidth={3} />
                <div><p className="font-black">Daily goal</p><p className="text-sm text-muted-foreground">2 of 3 lessons</p></div>
              </div>
              <span className="font-black text-coral">67%</span>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-progress-track">
              <div className="h-full w-2/3 rounded-full bg-coral" />
            </div>
          </section>
        </aside>
      </main>

      <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t-2 border-border bg-card px-3 py-2 lg:hidden">
        <a href="#path-title" className="flex flex-col items-center gap-1 text-primary"><Home className="h-6 w-6 fill-current" /><span className="text-xs font-black">Learn</span></a>
        <a href="#practice-title" className="flex flex-col items-center gap-1 text-muted-foreground"><BookOpen className="h-6 w-6" /><span className="text-xs font-black">Practice</span></a>
        <a href="#progress" className="flex flex-col items-center gap-1 text-muted-foreground"><BarChart3 className="h-6 w-6" /><span className="text-xs font-black">Progress</span></a>
      </nav>
    </div>
  );
}
