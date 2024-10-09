import { useMemo } from "react";

import { useGetQuestionTypes } from "@/hooks/react-query/useDailyLessons";
import { EnumSkill } from "@/lib/enums";
import { IQuestionType } from "@/lib/interfaces";

export const useFindQuestionType = (questionTypeId: number, skill?: string) => {
  const { data: questionTypes } = useGetQuestionTypes();
  const questionType: IQuestionType | null = useMemo(() => {
    if (questionTypes) {
      if (skill)
        return (
          questionTypes[skill as keyof typeof EnumSkill].find((qt) => qt.id === questionTypeId) ||
          null
        );
      else {
        const skills = Object.keys(EnumSkill);
        for (let i = 0; i < skills.length; i++) {
          const skill = skills[i];
          const temp =
            questionTypes[skill as keyof typeof EnumSkill].find((qt) => qt.id === questionTypeId) ||
            null;
          if (temp) {
            return temp;
          }
        }
        return null;
      }
    }
    return null;
  }, [questionTypes, questionTypeId, skill]);
  return questionType;
};
