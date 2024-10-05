import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CONTENT_TYPE_OPTIONS } from "@/lib/consts";
import { EnumQuestion, IQuestion } from "@/lib/types/questions";

const selectColumn: ColumnDef<IQuestion>[] = [
  {
    id: "select",
    // header: ({ table }) => (
    //   <Checkbox
    //     checked={
    //       table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
    //     }
    //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //     aria-label="Select all"
    //   />
    // ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 40,
  },
];

const actionColumn: ColumnDef<IQuestion>[] = [
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="inline-flex w-full flex-row justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0 data-[state=open]:opacity-100">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link to={`${row.original.id}`}>
                <DropdownMenuItem>View question detail</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
export const columns: ColumnDef<IQuestion>[] = [
  {
    accessorKey: "contentType",
    header: "Content type",
    cell: ({ row }) => {
      return (
        CONTENT_TYPE_OPTIONS.find((opt) => opt.value === row.original.contentType)?.label ??
        row.original.contentType
      );
    },
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
    accessorKey: "cefrLevel",
    header: "CEFR Level",
  },
];

export const createColumns = (selectable: boolean = false, action: boolean = false) => {
  const combineColumns: ColumnDef<IQuestion>[] = [
    ...(selectable ? selectColumn : []),
    ...columns,
    ...(action ? actionColumn : []),
  ];
  return combineColumns;
};
