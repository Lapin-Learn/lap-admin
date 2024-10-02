import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { IUser } from "@/lib/interfaces";

import { BaseTable } from "../base-table";
import { columns } from "./columns";

export type UserListTableProps = {
  data: IUser[];
};

export default function UserListTable({ data }: UserListTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return <BaseTable table={table} columns={columns} className="mt-6" />;
}
