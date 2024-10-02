import { Row } from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useDebounce } from "@/hooks/use-debounce";
import { ILesson } from "@/lib/interfaces";

import DraggableRow from "./draggable-row";

type DraggableRowContainerProps = {
  rows: Row<ILesson>[];
  onChange: (newRows: ILesson[]) => void;
  debouncedTime?: number;
};
export default function DraggableRowContainer({
  rows,
  onChange,
  debouncedTime = 2000,
}: DraggableRowContainerProps) {
  const [lessons, setLessons] = useState<Row<ILesson>[]>(rows);
  const debouncedLessons = useDebounce<Row<ILesson>[]>(lessons, debouncedTime);
  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    setLessons((prevLessons) => {
      const newLessons = [...prevLessons];
      const dragLesson = newLessons[dragIndex];

      newLessons.splice(dragIndex, 1);
      newLessons.splice(hoverIndex, 0, dragLesson);

      return newLessons;
    });
  }, []);
  useEffect(() => {
    onChange(debouncedLessons.map((lesson) => lesson.original));
  }, [debouncedLessons]);
  return (
    <DndProvider backend={HTML5Backend}>
      {lessons.map((row, index) => (
        <DraggableRow key={row.id} id={row.id} index={index} row={row} moveRow={moveRow} />
      ))}
    </DndProvider>
  );
}
