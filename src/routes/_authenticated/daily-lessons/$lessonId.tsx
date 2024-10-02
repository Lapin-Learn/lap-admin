import { createFileRoute } from "@tanstack/react-router";

import LessonDetailPage from "@/components/pages/lesson-detail";

export const Route = createFileRoute("/_authenticated/daily-lessons/$lessonId")({
  component: () => <LessonDetailPage />,
});
