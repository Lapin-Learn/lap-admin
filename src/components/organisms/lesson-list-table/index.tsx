import React, { useCallback } from "react";
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
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DraggableRow from "./draggable-row";

export type LessonListTableProps = {
  data: Lesson[];
  questionTypeId: number;
  bandScore: EnumBandScore;
};

export default function LessonListTable({ data, questionTypeId, bandScore }: LessonListTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [lessons, setLessons] = React.useState<Lesson[]>(data);

  const table = useReactTable({
    data: lessons,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    setLessons((prevLessons) => {
      const newLessons = [...prevLessons];
      const dragLesson = newLessons[dragIndex];

      newLessons.splice(dragIndex, 1);
      newLessons.splice(hoverIndex, 0, dragLesson);

      return newLessons;
    });
  }, []);
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
          <DndProvider backend={HTML5Backend}>
            {table.getRowModel().rows.map((row, index) => {
              return (
                <DraggableRow key={row.id} id={row.id} index={index} row={row} moveRow={moveRow} />
              );
            })}
          </DndProvider>
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
