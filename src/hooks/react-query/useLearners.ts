import { useQuery } from "@tanstack/react-query";

import { EnumSkill } from "@/lib/enums";
import { getLessons, getQuestionTypes } from "@/services/learner";

export const useGetQuestionTypes = (skill: EnumSkill) => {
  return useQuery({
    queryKey: ["question-types", skill],
    queryFn: () => getQuestionTypes(skill),
    staleTime: Infinity,
  });
};

export const useGetLessonList = (questionTypeId: string) => {
  return useQuery({
    queryKey: ["question-types", questionTypeId, "lessons"],
    queryFn: () => getLessons(questionTypeId),
    staleTime: Infinity,
  });
};
