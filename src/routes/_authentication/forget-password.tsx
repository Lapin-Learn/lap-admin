import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authentication/forget-password")({
  component: () => <div>Hello /_authentication/forget-password!</div>,
});
