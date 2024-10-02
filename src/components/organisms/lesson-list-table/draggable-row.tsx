import { flexRender, Row } from "@tanstack/react-table";
import type { XYCoord } from "dnd-core";
import type { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { TableCell, TableRow } from "@/components/ui/table";
import { ILesson } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

const ItemTypes = {
  ROW: "row",
};

export type DraggableRowProps<T> = {
  id: number | string;
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  row: Row<T>;
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DraggableRow: FC<DraggableRowProps<ILesson>> = ({ id, index, moveRow, row }) => {
  const ref = useRef<HTMLTableRowElement>(null);

  const [, drop] = useDrop({
    accept: ItemTypes.ROW,
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ROW,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <TableRow
      ref={ref}
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
      className={cn(
        row.getIsSelected() ? "" : "[&:hover_button]:opacity-100 [&_button]:opacity-0",
        `cursor-move transition-transform duration-300 ease-in-out ${
          isDragging ? "opacity-0" : "opacity-100"
        }`
      )}
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
};

export default DraggableRow;
