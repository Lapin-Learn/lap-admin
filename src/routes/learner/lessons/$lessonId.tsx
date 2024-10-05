import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/learner/lessons/$lessonId")({
  component: () => <div>Hello /learner/lessons/$lessonId!</div>,
});
