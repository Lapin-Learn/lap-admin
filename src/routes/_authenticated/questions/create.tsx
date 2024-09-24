import CreateQuestionPage from "@/components/pages/create-question";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/questions/create")({
  component: CreateQuestionPage,
});
