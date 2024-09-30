import { useMemo } from "react";

import { useGetQuestionTypes } from "@/hooks/react-query/useDailyLessons";
import { EnumSkill } from "@/lib/enums";
import { IQuestionType } from "@/lib/interfaces";

export const useFindQuestionType = (questionTypeId: number, skill: string) => {
  const { data: questionTypes } = useGetQuestionTypes();
  const questionType: IQuestionType | null = useMemo(() => {
    if (questionTypes) {
      return (
        questionTypes[skill as keyof typeof EnumSkill].find((qt) => qt.id === questionTypeId) ||
        null
      );
    }
    return null;
  }, [questionTypes, questionTypeId, skill]);
  return questionType;
};
