import { ChevronLeft } from "lucide-react";
import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_authentication")({
  component: AuthLayout,
});

export default function AuthLayout() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-2 overflow-auto bg-slate-50 sm:pb-16 sm:pt-10">
      <div className="flex h-fit w-full flex-col gap-2 px-2 md:w-1/2 lg:w-[30%]">
        <Outlet />
      </div>
    </div>
  );
}
