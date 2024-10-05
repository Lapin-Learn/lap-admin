import { useEffect, useState } from "react";

import { Button, Typography } from "@/components/ui";
import { Column, MatchingContent, PairAnswer } from "@/lib/types/questions";

import { Answer } from "../../useLesson";
import MatchingButton from "./matching-button";

export type MatchingProps = MatchingContent & {
  onAnswer: (isCorrect: boolean) => void;
  result: Answer;
};

export default function Matching({ answer, columnA, columnB, onAnswer, result }: MatchingProps) {
  const [selectingPairs, setSelectingPairs] = useState<PairAnswer>({
    columnA: [],
    columnB: [],
  });
  const [selectedPairs, setSelectedPairs] = useState<PairAnswer[]>([]);
  const [correctness, setCorrectness] = useState<boolean[]>(Array(answer.length).fill(false));

  const answerQuestion = () => {
    let isCorrect: boolean = true;
    for (let i = 0; i < selectedPairs.length; i++) {
      const index = answer.findIndex((pair) => pair.columnA.includes(selectedPairs[i].columnA[0]));
      if (index >= 0) {
        if (selectedPairs[i].columnB[0] !== answer[index].columnB[0]) {
          isCorrect = false;
        } else {
          correctness[index] = true;
        }
      } else {
        isCorrect = false;
      }
    }
    setCorrectness(correctness);
    onAnswer(isCorrect);
  };

  useEffect(() => {
    if (result == "notAnswered") {
      setSelectedPairs([]);
      setSelectingPairs({
        columnA: [],
        columnB: [],
      });
    }
  }, [result]);

  useEffect(() => {
    const isFullPair = selectingPairs.columnA.length > 0 && selectingPairs.columnB.length > 0;
    if (isFullPair) {
      setSelectedPairs((prev) => [...prev, selectingPairs]);
      setSelectingPairs({
        columnA: [],
        columnB: [],
      });
    }
  }, [selectingPairs]);

  const findIndexOfPair = (value: string) => {
    const valueInPairA = selectedPairs.find((pair) => pair.columnA.includes(value));
    const valueInPairB = selectedPairs.find((pair) => pair.columnB.includes(value));
    if (valueInPairA) {
      return selectedPairs.indexOf(valueInPairA) === -1
        ? null
        : selectedPairs.indexOf(valueInPairA) + 1;
    }

    if (valueInPairB) {
      return selectedPairs.indexOf(valueInPairB) === -1
        ? null
        : selectedPairs.indexOf(valueInPairB) + 1;
    }
    if (selectingPairs.columnA.includes(value) || selectingPairs.columnB.includes(value)) {
      return selectedPairs.length + 1;
    }
    return null;
  };

  const handlePress = (value: string, column: Column) => {
    const otherCol = column === "columnA" ? "columnB" : "columnA";
    if (value === selectingPairs[column][0]) {
      setSelectingPairs({ ...selectingPairs, [column]: [] });
    } else {
      setSelectingPairs({ ...selectingPairs, [column]: [value] });
      if (findIndexOfPair(value)) {
        setSelectedPairs((pairs) => pairs.filter((pair) => pair[column][0] !== value));
        setSelectingPairs({ ...selectingPairs, [otherCol]: [] });
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex w-full flex-col gap-5">
        <div className="flex flex-col gap-2">
          {/* Only 2 columns, no need to extract to component (WET) */}
          <Typography className="font-semibold">{columnA.title}</Typography>
          {columnA.options.map((option, index) => {
            const pairIndex = findIndexOfPair(option);
            const isCorrect = pairIndex ? correctness[pairIndex - 1] : false;
            return (
              <MatchingButton
                key={index}
                option={option}
                variant={
                  pairIndex
                    ? typeof result === "boolean"
                      ? isCorrect
                        ? "correct"
                        : "incorrect"
                      : "selected"
                    : "default"
                }
                handlePress={() => handlePress(option, "columnA")}
                pair={pairIndex}
              />
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="font-semibold">{columnB.title}</Typography>
          {columnB.options.map((option, index) => {
            const pairIndex = findIndexOfPair(option);
            const isCorrect = pairIndex ? correctness[pairIndex - 1] : false;
            return (
              <MatchingButton
                key={index}
                option={option}
                variant={
                  pairIndex
                    ? typeof result === "boolean"
                      ? isCorrect
                        ? "correct"
                        : "incorrect"
                      : "selected"
                    : "default"
                }
                handlePress={() => handlePress(option, "columnB")}
                pair={pairIndex}
              />
            );
          })}
        </div>
      </div>
      {selectedPairs.length === answer.length && (
        <Button onClick={answerQuestion} className="w-full">
          Kiểm tra
        </Button>
      )}
    </div>
  );
}
