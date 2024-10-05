import { cva } from "class-variance-authority";
import { useEffect, useState } from "react";

import { Button, Checkbox, Label } from "@/components/ui";
import { MultipleChoiceContent } from "@/lib/types/questions";

import { Answer } from "../../useLesson";

type MultipleChoiceProps = MultipleChoiceContent & {
  onAnswer: (isCorrect: boolean) => void;
  result: Answer;
};

const optionButtonVariants = cva("", {
  variants: {
    variant: {
      default: "",
      selected: "border-orange-500",
      correct: "border-green-500 bg-green-100 text-green-700",
      incorrect: "border-red-500 bg-red-100 text-red-700",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default function MultipleChoice({ options, answer, onAnswer, result }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<number[]>([]);

  const answerQuestion = () => {
    const isCorrect = selected.every((index) => answer.includes(index));
    onAnswer(isCorrect);
  };

  useEffect(() => {
    if (result == "notAnswered") setSelected([]);
  }, [result]);

  const handlePress = (index: number) => {
    setSelected((prev) => {
      if (answer.length == 1) {
        return [index];
      }
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const getVariant = (index: number) => {
    const isSelected = selected.includes(index);
    const isAnswered = typeof result == "boolean";
    if (isAnswered) {
      if (isSelected) {
        return answer.includes(index) ? "correct" : "incorrect";
      }
      return answer.includes(index) ? "correct" : "default";
    }
    return isSelected ? "selected" : "default";
  };
  return (
    <div className="flex flex-col gap-2">
      {answer.length === 1
        ? options.map((option, index) => (
            <Button
              key={index}
              type="button"
              variant="outline"
              className={optionButtonVariants({
                variant: getVariant(index),
              })}
              onClick={() => handlePress(index)}
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
                  handlePress(index);
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
