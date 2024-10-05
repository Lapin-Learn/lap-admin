import { getCoreRowModel, RowSelectionState, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { IQuestion } from "@/lib/types/questions";

import { BaseTable } from "../base-table";
import { createColumns } from "./columns";

type GeneralTable = {
  data: IQuestion[];
  actionColumn?: boolean;
};

type UnselectableRowTable = GeneralTable & {
  selectableRows?: false;
};

type SelectableRowTable = GeneralTable & {
  selectableRows?: true;
  onSelectRow: (rows: IQuestion[]) => void;
  defaultValues?: number[];
};

export type QuestionListTableProps = UnselectableRowTable | SelectableRowTable;

export default function QuestionListTable(props: QuestionListTableProps) {
  const { data, selectableRows = false, actionColumn = false } = props;
  const tableColumns = createColumns(selectableRows, actionColumn);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    props.selectableRows
      ? (props.defaultValues?.reduce(
          (acc, value) => {
            acc[value] = true;
            return acc;
          },
          {} as Record<number, boolean>
        ) as Record<number, boolean>)
      : {}
  );
  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: (rows) => setRowSelection(rows),
    state: {
      rowSelection,
    },
  });
  useEffect(() => {
    console.log(rowSelection);
    const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
    if (props.selectableRows) {
      props.onSelectRow(selectedRows);
    }
  }, [rowSelection]);
  return <BaseTable table={table} columns={tableColumns} className="mt-6" />;
}
