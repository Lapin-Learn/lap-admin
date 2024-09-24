import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { BaseTable } from "../base-table";
import { Question } from "@/lib/types/questions";
import { columns } from "./columns";

export type QuestionListTableProps = {
  data: Question[];
};

export default function QuestionListTable({ data }: QuestionListTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return <BaseTable table={table} columns={columns} className="mt-6" />;
}
