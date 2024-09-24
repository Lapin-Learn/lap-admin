import { KeyRound } from "lucide-react";
import { Button } from "../../ui/button";
import { Typography } from "../../ui/typography";
import { cn } from "@/lib/utils";
import { useState } from "react";

type AnswerSheetProps = {
  options: string[];
  selected: number[];
  onChoose: (indexes: number[]) => void;
  isEditing: boolean;
};
export default function AnswerSheet({
  options,
  onChoose,
  selected,
  isEditing = false,
}: AnswerSheetProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(selected);
  return (
    <div className="flex flex-col gap-2">
      {isEditing &&
        options.map((option, index) => (
          <div
            className={cn(
              "flex h-9 w-fit cursor-pointer flex-row items-center rounded-sm px-4",
              selectedAnswers.includes(index)
                ? "border-l-2 border-l-green-500 bg-green-100 pl-[14px]"
                : "hover:bg-muted"
            )}
            key={index}
            onClick={() =>
              setSelectedAnswers((prev) => {
                if (prev.includes(index)) {
                  return prev.filter((i) => i !== index);
                }
                return [...prev, index];
              })
            }
          >
            <span className="mr-4 inline-block aspect-square size-3.5 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"></span>
            <div className="flex w-80 flex-row items-center">
              <Typography className="w-full" variant="body2">
                {option}
              </Typography>
            </div>
          </div>
        ))}

      <Button
        type="button"
        className="w-fit text-blue-500 hover:text-blue-700"
        variant="ghost"
        onClick={() => {
          onChoose(selectedAnswers);
        }}
      >
        {!isEditing ? (
          <>
            <KeyRound size={16} className="mr-2" />
            Choose answer(s)
          </>
        ) : (
          "Done"
        )}
      </Button>
    </div>
  );
}
