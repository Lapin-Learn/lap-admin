import { IInstruction } from "@/lib/interfaces";
import { FetchingData } from "@/lib/types/pagination";

import api from "./kyInstance";

export const getInstruction = async (questionTypeId: number) => {
  return (
    await api
      .get(`daily-lessons/question-types/${questionTypeId}/instruction`)
      .json<FetchingData<IInstruction | null>>()
  ).data;
};

export type InstructionPayload = Omit<IInstruction, "id">;

export const updateInstruction = async (
  payload: Pick<IInstruction, "id"> & Partial<IInstruction>
) => {
  return (
    await api
      .put(`admin/instructions/${payload.id}`, { json: payload })
      .json<FetchingData<IInstruction>>()
  ).data;
};

export const createInstruction = async (payload: InstructionPayload) => {
  return (
    await api.post("admin/instructions", { json: payload }).json<FetchingData<IInstruction>>()
  ).data;
};
