import { createFileRoute } from "@tanstack/react-router";

import QuestionDetailPage from "@/components/pages/question-detail";

export const Route = createFileRoute("/_authenticated/questions/$questionId")({
  component: () => <QuestionDetailPage />,
});
