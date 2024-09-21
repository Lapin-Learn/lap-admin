import { EnumBandScore, EnumSkill } from "@/lib/enums";
import api from "./kyInstance";

export type QuestionType = {
  id: number;
  name: string;
  skill: string;
  imageId: string | null;
};

export type Lesson = {
  id: number;
  name: string;
  order: number;
  bandScore: EnumBandScore;
};

type QuestionTypeList = Record<keyof typeof EnumSkill, QuestionType[]>;
export type LessonList = Record<EnumBandScore, Lesson[]>;

export const getQuestionTypes = async () => {
  return (await api.get("admin/question-types").json<{ data: QuestionTypeList }>()).data;
};

export const getLessonsOfQuestionType = async (questionType: number) => {
  return (await api.get(`admin/question-types/${questionType}`).json<{ data: LessonList }>()).data;
};

type CreateLessonParams = {
  questionTypeId: number;
  bandScore: EnumBandScore;
  name: string;
};

export const createLesson = async (lesson: CreateLessonParams) => {
  return (await api.post(`admin/lessons`, { json: lesson }).json<{ data: Lesson }>()).data;
};
