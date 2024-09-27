import { FetchingData, PagedData } from "@/lib/types/pagination";
import { Question } from "@/lib/types/questions";

import api from "./kyInstance";

export const getQuestions = async () => {
  return (
    await api
      .get("admin/questions?offset=0&limit=100")
      .json<FetchingData<PagedData<Question, "questions">>>()
  ).data;
};

type CreateQuestionParams = Omit<Question, "createdAt" | "updatedAt" | "id">;
export const createQuestion = async (params: CreateQuestionParams) => {
  return (await api.post("admin/questions", { json: params }).json<FetchingData<Question>>()).data;
};

export type UpdateQuestionParams = Partial<CreateQuestionParams>;
export const updateQuestion = async (questionId: string, params: UpdateQuestionParams) => {
  return (
    await api.put(`admin/questions/${questionId}`, { json: params }).json<FetchingData<Question>>()
  ).data;
};
