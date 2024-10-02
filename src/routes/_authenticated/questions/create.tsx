import { createFileRoute } from "@tanstack/react-router";

import CreateQuestionPage from "@/components/pages/create-question";

export const Route = createFileRoute("/_authenticated/questions/create")({
  component: CreateQuestionPage,
});
