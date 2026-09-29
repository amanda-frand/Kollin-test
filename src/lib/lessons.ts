export type LessonStatus = "done" | "current" | "locked";

export type Lesson = {
  label: string;
  status: LessonStatus;
  done: number;
  total: number;
};

export const unitCategory = "ENVARIABELANALYS";
export const unitName = "Funktionslära";
export const unitLessonCount = 7;

export const lessons: Lesson[] = [
  { label: "Absolutbelopp", status: "done", done: 12, total: 12 },
  { label: "Derivatans definition & deriverbarhet", status: "done", done: 9, total: 9 },
  { label: "Funktionsinvers", status: "current", done: 3, total: 5 },
  { label: "Gränsvärde", status: "locked", done: 0, total: 0 },
  { label: "Slumpmässiga frågor", status: "locked", done: 0, total: 0 },
];

export const currentLesson = lessons.find((lesson) => lesson.status === "current");

export const lessonsCompleted = lessons.filter((lesson) => lesson.status === "done").length;

export const unitProgressPercent = Math.round((lessonsCompleted / unitLessonCount) * 100);

export const currentPercent = currentLesson
  ? Math.round((currentLesson.done / currentLesson.total) * 100)
  : 0;

const firstLockedIndex = lessons.findIndex((lesson) => lesson.status === "locked");

export function lessonDetail(lesson: Lesson, index: number): string {
  if (lesson.status === "done") return `Klart — ${lesson.done} av ${lesson.total} övningar`;
  if (lesson.status === "current") return `${lesson.done} av ${lesson.total} övningar klara`;
  return index === firstLockedIndex && currentLesson
    ? `Låst — klara ${currentLesson.label} först`
    : "Låst";
}
