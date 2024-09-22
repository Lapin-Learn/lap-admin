import { EnumBandScore, EnumSkill } from "@/lib/enums";
import api from "./kyInstance";
import { Question } from "@/lib/types/questions";

export type QuestionType = {
  id: number;
  name: string;
  skill: EnumSkill;
  imageId: string | null;
  updatedAt: string;
};

export type Lesson = {
  id: number;
  name: string;
  order: number;
  bandScore: EnumBandScore;
};

export type LessonDetail = Omit<Lesson, "bandScore"> & {
  questionToLessons: {
    question: Question;
    order: number;
    questionId: string;
  }[];
};

export type QuestionTypeList = Record<EnumSkill, QuestionType[]>;
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

type CreateQuestionTypeParams = {
  name: string;
  skill: EnumSkill;
  imageId: string | null;
};

export const createQuestionType = async (questionType: CreateQuestionTypeParams) => {
  return (
    await api.post("admin/question-types", { json: questionType }).json<{ data: QuestionType }>()
  ).data;
};

export const getLessonDetail = async (lessonId: string) => {
  return (
    await api.get(`daily-lessons/lessons/${lessonId}/questions`).json<{ data: LessonDetail }>()
  ).data;
};
