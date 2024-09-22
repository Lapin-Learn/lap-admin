import { EnumQuestion, Question } from "@/lib/types/questions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: "contentType",
    header: "Content Type",
  },
  {
    accessorKey: "content.question.paragraph",
    header: "Preview questions",
    cell: ({ row }) => {
      if (row.original.contentType === EnumQuestion.MultipleChoice) {
        return (
          <div className="flex flex-col py-2">
            <span className="line-clamp-3 text-sm">{row.original.content.paragraph}</span>
          </div>
        );
      }
      return null;
    },
    size: 400,
  },
  {
    accessorKey: "cerfLevel",
    header: "CERF Level",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <div className="inline-flex w-full flex-row justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
