import { createFileRoute } from "@tanstack/react-router";

import InstructionsPage from "@/components/pages/instructions";

export const Route = createFileRoute("/_authenticated/daily-lessons/$questionTypeId/instructions")({
  component: InstructionsPage,
});
