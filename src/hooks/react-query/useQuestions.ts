import { createQuestion, getQuestions } from "@/services/questions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { useNavigate } from "@tanstack/react-router";

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

export const useCreateQuestion = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QuestionKeys.list(),
      });
      navigate({ to: "/questions" });
    },
    onError: (error) => {
      toast({
        title: "Error in creating question",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
