import UserListPage from "@/components/pages/users";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/users/")({
  component: UserListPage,
});
