import QuestionListPage from "@/components/pages/questions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/questions")({
  component: () => <QuestionListPage />,
});
