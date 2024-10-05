import { useState } from "react";

import { Button, Checkbox, Label } from "@/components/ui";
import { MultipleChoiceContent } from "@/lib/types/questions";

type MultipleChoiceProps = MultipleChoiceContent & {
  onAnswer: (isCorrect: boolean) => void;
};
export default function MultipleChoice({ options, answer, onAnswer }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<number[]>([]);

  const answerQuestion = () => {
    const isCorrect = selected.every((index) => answer.includes(index));
    onAnswer(isCorrect);
    setSelected([]);
  };

  const handleOptionClick = (index: number) => {
    setSelected((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {answer.length === 1
        ? options.map((option, index) => (
            <Button
              key={index}
              type="button"
              variant="outline"
              className={selected.includes(index) ? "border-orange-500" : ""}
              onClick={() => handleOptionClick(index)}
            >
              {option}
            </Button>
          ))
        : options.map((option, index) => (
            <div>
              <Checkbox
                id={option}
                className="mr-2"
                onCheckedChange={() => {
                  handleOptionClick(index);
                }}
              />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
      {((answer.length === 1 && selected.length > 0) || selected.length > 1) && (
        <Button onClick={answerQuestion} className="w-full">
          Kiểm tra
        </Button>
      )}
    </div>
  );
}
