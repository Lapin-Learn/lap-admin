import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { useCreateLesson } from "@/hooks/react-query/useDailyLessons";
import { EnumBandScore } from "@/lib/enums";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
type NewLessonRowProps = {
  questionTypeId: number;
  bandScore: EnumBandScore;
};
export default function NewLessonRow({ questionTypeId, bandScore }: NewLessonRowProps) {
  const form = useForm<{ name: string }>();
  const { register, handleSubmit, reset } = form;
  const [isEditing, setIsEditing] = useState(false);
  const rowRef = useRef<HTMLTableRowElement>(null);
  const createLessonMutation = useCreateLesson(questionTypeId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (rowRef.current && !rowRef.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [rowRef]);

  const onSubmit = (data: { name: string }) => {
    if (data.name.length) {
      createLessonMutation.mutate({ name: data.name, bandScore, questionTypeId });
      reset();
      setIsEditing(false);
    }
  };

  return (
    <TableRow
      ref={rowRef}
      className={cn(
        "cursor-pointer text-muted-foreground hover:text-black",
        isEditing ? "text-black" : "text-muted-foreground"
      )}
      onClick={() => setIsEditing((prev) => !prev)}
    >
      <TableCell className="px-4 pr-0" width={20}>
        <Plus size={16} />
      </TableCell>
      <TableCell className="h-[41px] px-4 align-middle" colSpan={2}>
        {isEditing ? (
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register("name")}
                className="h-8 w-full"
                autoFocus
                onBlur={() => setIsEditing(false)}
              />
            </form>
          </FormProvider>
        ) : (
          "New lesson"
        )}
      </TableCell>
    </TableRow>
  );
}
