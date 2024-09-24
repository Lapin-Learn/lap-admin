import LessonDetailPage from "@/components/pages/lesson-detail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/daily-lessons/$lessonId")({
  component: () => <LessonDetailPage />,
});
