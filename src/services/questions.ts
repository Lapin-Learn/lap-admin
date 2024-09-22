import { Question } from "@/lib/types/questions";
import api from "./kyInstance";

export const getQuestions = async () => {
  return (
    await api.get("admin/questions?offset=0&limit=100").json<{ data: { questions: Question[] } }>()
  ).data;
};
