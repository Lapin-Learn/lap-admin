import DailyLessonsPage from "@/components/pages/daily-lessons";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/daily-lessons")({
  component: DailyLessonsPage,
});
