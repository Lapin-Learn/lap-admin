import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableRow from "./draggable-row";
import { Row } from "@tanstack/react-table";
import { Lesson } from "@/services";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

type DraggableRowContainerProps = {
  rows: Row<Lesson>[];
  onChange: (newRows: Lesson[]) => void;
  debouncedTime?: number;
};
export default function DraggableRowContainer({
  rows,
  onChange,
  debouncedTime = 2000,
}: DraggableRowContainerProps) {
  const [lessons, setLessons] = useState<Row<Lesson>[]>(rows);
  const debouncedLessons = useDebounce<Row<Lesson>[]>(lessons, debouncedTime);
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
    console.log(new Date());
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
