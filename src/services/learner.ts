import { EnumSkill } from "@/lib/enums";
import { ILesson, IQuestionType, IQuestionTypeProgress } from "@/lib/interfaces";
import { FetchingData } from "@/lib/types/pagination";
import { generateSearchParams } from "@/lib/utils";

import api from "./kyInstance";

export const getQuestionTypes = async (skill: EnumSkill) => {
  const searchParams = generateSearchParams({ skill });
  return (
    await api
      .get("daily-lessons/question-types", { searchParams })
      .json<FetchingData<(IQuestionType & { progress: IQuestionTypeProgress })[]>>()
  ).data;
};

export type ILessonList = {
  lessons: ILesson[];
  totalLearningDuration: number;
};

export const getLessons = async (questionTypeId: string) => {
  return (
    await api
      .get(`daily-lessons/question-types/${questionTypeId}/lessons`)
      .json<FetchingData<ILessonList>>()
  ).data;
};
