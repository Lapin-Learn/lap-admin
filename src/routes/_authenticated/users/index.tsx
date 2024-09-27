import { createFileRoute } from "@tanstack/react-router";

import UserListPage from "@/components/pages/users";

export const Route = createFileRoute("/_authenticated/users/")({
  component: UserListPage,
});
