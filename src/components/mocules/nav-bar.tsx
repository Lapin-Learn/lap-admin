import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { useSignOut } from "@/hooks/react-query/useAuth";

export default function NavBar() {
  const signOutMutation = useSignOut();
  return (
    <div className="flex h-12 w-full flex-row-reverse items-center border-b bg-white px-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="size-8 rounded-full bg-green-200"></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => signOutMutation.mutate()}>
            <LogOut size={16} className="mr-2" /> Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
