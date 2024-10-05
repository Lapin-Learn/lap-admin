import { createFileRoute } from "@tanstack/react-router";

import LearnLessonPage from "@/components/pages/learner/learn-lesson";

export const Route = createFileRoute("/learner/lessons/$lessonId")({
  component: LearnLessonPage,
});
