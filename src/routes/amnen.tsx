import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight, Divide, Lock, Play, Repeat, Shuffle, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  currentLesson,
  currentPercent,
  lessonDetail,
  lessons as lessonData,
  lessonsCompleted,
  unitLessonCount,
  unitName,
  unitProgressPercent,
} from "../lib/lessons";

export const Route = createFileRoute("/amnen")({
  head: () => ({
    meta: [
      { title: "Ämnen — Kollin" },
      { name: "description", content: "Välj ett matteämne att träna på. Små steg, varje dag." },
      { property: "og:title", content: "Ämnen — Kollin" },
      { property: "og:description", content: "Välj ett matteämne att träna på. Små steg, varje dag." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AmnenPage,
});

type TopicStatus = "done" | "current" | "locked";

const topics: { label: string; detail: string; status: TopicStatus; icon: LucideIcon }[] =
  lessonData.map((lesson, index) => ({
    label: lesson.label,
    detail: lessonDetail(lesson, index),
    status: lesson.status,
    icon: [Divide, TrendingUp, Repeat, Lock, Shuffle][index],
  }));

function AmnenPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <p className="text-sm font-black uppercase text-secondary">Översikt</p>
      <h1 className="mt-1 font-display text-3xl font-black text-foreground sm:text-4xl">Ämnen</h1>
      <p className="mt-2 text-sm font-bold text-muted-foreground">Välj var du vill träna — små steg varje dag.</p>

      <Link
        to="/"
        className="mt-6 flex items-center gap-4 rounded-xl border-2 border-border bg-card p-5 shadow-card transition duration-150 hover:bg-panel active:translate-y-0.5"
      >
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border-2 border-primary/25 bg-primary text-primary-foreground shadow-[0_4px_0_var(--button-shadow)]">
          <Play className="h-6 w-6 fill-current" strokeWidth={3} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase text-primary">Pågående</p>
          <p className="mt-0.5 truncate font-black text-foreground">{unitName}</p>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-progress-track">
            <div className="h-full rounded-full bg-primary" style={{ width: `${unitProgressPercent}%` }} />
          </div>
          <p className="mt-1 text-xs font-bold text-muted-foreground">{lessonsCompleted} av {unitLessonCount} lektioner</p>
        </div>
        <ChevronRight className="h-6 w-6 shrink-0 text-muted-foreground" strokeWidth={3} />
      </Link>

      <section aria-labelledby="topic-list-title" className="mt-6">
        <h2 id="topic-list-title" className="text-sm font-black uppercase text-muted-foreground">Alla ämnen</h2>
        <ul className="mt-3 divide-y-2 divide-border overflow-hidden rounded-xl border-2 border-border bg-card shadow-card">
          {topics.map((topic) => {
            const Icon = topic.icon;
            const isDone = topic.status === "done";
            const isCurrent = topic.status === "current";
            const isLocked = topic.status === "locked";
            const row = (
              <div className="flex items-center gap-4 p-4 sm:px-5">
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 ${
                    isDone
                      ? "border-success/30 bg-success/15 text-success"
                      : isCurrent
                        ? "border-primary/25 bg-primary text-primary-foreground"
                        : "border-border bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="h-6 w-6" strokeWidth={3} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`truncate font-black ${isLocked ? "text-muted-foreground" : "text-foreground"}`}>{topic.label}</p>
                  <p className="text-sm font-bold text-muted-foreground">{topic.detail}</p>
                </div>
                {isDone && <Check className="h-6 w-6 shrink-0 text-success" strokeWidth={3} />}
                {isCurrent && (
                  <>
                    <span className="shrink-0 text-sm font-black text-primary">{currentPercent}%</span>
                    <ChevronRight className="h-6 w-6 shrink-0 text-primary" strokeWidth={3} />
                  </>
                )}
                {isLocked && <Lock className="h-6 w-6 shrink-0 text-muted-foreground" strokeWidth={3} />}
              </div>
            );
            return (
              <li key={topic.label}>
                {isCurrent ? (
                  <Link to="/" className="block transition duration-150 hover:bg-panel">{row}</Link>
                ) : (
                  <div aria-disabled={isLocked}>{row}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
