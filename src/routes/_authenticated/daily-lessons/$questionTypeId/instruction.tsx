import { createFileRoute } from "@tanstack/react-router";

import InstructionPage from "@/components/pages/instruction";

export const Route = createFileRoute("/_authenticated/daily-lessons/$questionTypeId/instruction")({
  component: InstructionPage,
});
