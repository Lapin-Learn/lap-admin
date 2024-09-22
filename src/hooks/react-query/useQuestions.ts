import { getQuestions } from "@/services/questions";
import { useQuery } from "@tanstack/react-query";

const QuestionKeys = {
  key: ["questions"],
  list: () => [...QuestionKeys.key, "list"],
  pagination: (page: number, pageSize: number) => [...QuestionKeys.list(), { page, pageSize }],
  detail: (questionId: string) => [...QuestionKeys.key, "detail", questionId],
};

export const useGetQuestions = () => {
  return useQuery({
    queryKey: QuestionKeys.list(),
    queryFn: getQuestions,
  });
};
