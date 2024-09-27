import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import {
  createQuestion,
  getQuestions,
  updateQuestion,
  UpdateQuestionParams,
} from "@/services/questions";

import { useToast } from "../use-toast";

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
      toast({
        title: "Question created",
      });
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

export const useUpdateQuestion = (questionId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: UpdateQuestionParams) => updateQuestion(questionId, value),
    onSuccess: (returnData) => {
      queryClient.invalidateQueries({
        queryKey: QuestionKeys.list(),
      });
      queryClient.setQueryData(QuestionKeys.detail(returnData.id), returnData);
      toast({
        title: "Question updated",
        description: "Question has been updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error in updating question",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
