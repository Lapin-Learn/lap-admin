import { EnumBandScore, EnumSkill } from "@/lib/enums";
import { ILesson, IQuestionType } from "@/lib/interfaces";
import { FetchingData } from "@/lib/types/pagination";
import { Question } from "@/lib/types/questions";

import api from "./kyInstance";

export type LessonDetail = Omit<ILesson, "bandScore"> & {
  questionToLessons: {
    question: Question;
    order: number;
    questionId: string;
  }[];
};

export type QuestionTypeList = Record<EnumSkill, IQuestionType[]>;
export type LessonList = Record<EnumBandScore, ILesson[]>;

export const getQuestionTypes = async () => {
  return (await api.get("admin/question-types").json<FetchingData<QuestionTypeList>>()).data;
};

export const getLessonsOfQuestionType = async (questionType: number) => {
  return (await api.get(`admin/question-types/${questionType}`).json<FetchingData<LessonList>>())
    .data;
};

type CreateLessonParams = {
  questionTypeId: number;
  bandScore: EnumBandScore;
  name: string;
};

export const createLesson = async (lesson: CreateLessonParams) => {
  return (await api.post(`admin/lessons`, { json: lesson }).json<FetchingData<ILesson>>()).data;
};

type CreateQuestionTypeParams = {
  name: string;
  skill: EnumSkill;
  imageId: string | null;
};

export const createQuestionType = async (questionType: CreateQuestionTypeParams) => {
  return (
    await api
      .post("admin/question-types", { json: questionType })
      .json<FetchingData<IQuestionType>>()
  ).data;
};

export const getLessonDetail = async (lessonId: string) => {
  return (
    await api.get(`daily-lessons/lessons/${lessonId}/questions`).json<FetchingData<LessonDetail>>()
  ).data;
};

export type ReorderLessonParams = {
  bandScore: EnumBandScore;
  reorderLessons: {
    lessonId: number;
    order: number;
  }[];
};

export const reorderLessons = async (params: ReorderLessonParams & { questionTypeId: number }) => {
  return (
    await api
      .put(`admin/question-types/${params.questionTypeId}`, { json: params })
      .json<FetchingData<{ lessons: ILesson[] }>>()
  ).data;
};

export type UpdateQuestionTypeParams = {
  name: string;
};
export const updateQuestionType = async (
  params: UpdateQuestionTypeParams & { questionTypeId: number }
) => {
  return (
    await api
      .put(`admin/question-types/${params.questionTypeId}`, { json: params })
      .json<FetchingData<IQuestionType>>()
  ).data;
};
