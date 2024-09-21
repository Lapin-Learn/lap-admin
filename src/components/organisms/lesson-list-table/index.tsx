import React from "react";
import { flexRender, getCoreRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { columns } from "./columns";
import { Lesson } from "@/services";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import NewLessonRow from "./new-lesson-row";
import { EnumBandScore } from "@/lib/enums";

export type LessonListTableProps = {
  data: Lesson[];
  questionTypeId: number;
  bandScore: EnumBandScore;
};

export default function LessonListTable({ data, questionTypeId, bandScore }: LessonListTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });
  return (
    <Table className="overflow-hidden rounded-md">
      <TableHeader className="">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="">
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className={cn(
                    "text-dark px-4 text-[14px]",
                    `w-[${header.column.columnDef.size}px]`,
                    table.getIsAllRowsSelected()
                      ? ""
                      : "[&:hover_button]:opacity-100 [&_button]:opacity-0"
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody className="bg-white">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => {
            return (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(
                  "cursor-pointer",
                  row.getIsSelected() ? "" : "[&:hover_button]:opacity-100 [&_button]:opacity-0"
                )}
                // {...(onClickItem ? { onClick: () => onClickItem(row.original) } : {})}
              >
                {row.getVisibleCells().map((cell) => {
                  const size = cell.column.getSize();
                  return (
                    <TableCell key={cell.id} className="px-4" width={size}>
                      <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No result
            </TableCell>
          </TableRow>
        )}
        <NewLessonRow questionTypeId={questionTypeId} bandScore={bandScore} />
      </TableBody>
    </Table>
  );
}
