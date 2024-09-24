import QuestionDetailPage from "@/components/pages/question-detail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/questions/$questionId")({
  component: () => <QuestionDetailPage />,
});
