import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import ErrorFallback from "@/components/ErrorFallback";
import DashboardLayout from "@/components/layouts/dashboard";
import { authKeys } from "@/hooks/react-query/useAuth";
import { getAuthUser, getAuthValueFromStorage, signOut } from "@/services";
import { EnumRole } from "@/lib/enums";

const AuthenticatedPage = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location, context: { queryClient } }) => {
    try {
      if (!getAuthValueFromStorage()) {
        return redirect({ to: "/log-in" });
      }
      const user = await queryClient?.ensureQueryData({
        queryKey: authKeys.detail(),
        queryFn: () => getAuthUser(),
        staleTime: Infinity,
      });
      if (!user) {
        signOut();
        return redirect({ to: "/log-in" });
      }
      if (user.role === EnumRole.learner && location.href !== "/learner")
        return redirect({ to: "/learner" });
      if (location.href == "/") return redirect({ to: "/daily-lessons" });
      return true;
    } catch (e) {
      console.error(e);
      return redirect({ to: "/log-in" });
    }
  },
  pendingComponent: () => {
    return <span>Loading Protected</span>;
  },
  errorComponent: (error) => {
    console.error(error);
    return <ErrorFallback />;
  },
  component: AuthenticatedPage,
});
