import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/daily-lessons/$questionTypeId/instructions")({
  component: () => <div>Hello /_authenticated/daily-lessons/$questionTypeId/instructions!</div>,
});
