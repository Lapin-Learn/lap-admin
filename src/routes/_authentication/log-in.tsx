import LogInPage from "@/components/pages/log-in";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authentication/log-in")({
  component: LogInPage,
});
