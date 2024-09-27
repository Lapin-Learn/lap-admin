import { flexRender, getCoreRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import _ from "lodash";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useReorderLessons } from "@/hooks/react-query/useDailyLessons";
import { EnumBandScore } from "@/lib/enums";
import { cn } from "@/lib/utils";
import { Lesson } from "@/services";

import { columns } from "./columns";
import DraggableRowContainer from "./draggable-row-container";
import NewLessonRow from "./new-lesson-row";

export type LessonListTableProps = {
  data: Lesson[];
  questionTypeId: number;
  bandScore: EnumBandScore;
};

export default function LessonListTable({ data, questionTypeId, bandScore }: LessonListTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const reorderLessonsMutation = useReorderLessons(questionTypeId);
  const sortedData = _.sortBy(data, ["order"]);

  const table = useReactTable({
    data: sortedData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  const onChangeRows = (newLessons: Lesson[]) => {
    if (!_.isEqual(newLessons, sortedData) && sortedData.length > 1) {
      reorderLessonsMutation.mutate({
        bandScore,
        reorderLessons: newLessons.map((lesson, index) => ({
          lessonId: lesson.id,
          order: index + 1,
        })),
      });
    }
  };
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
          <DraggableRowContainer rows={table.getRowModel().rows} onChange={onChangeRows} />
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
