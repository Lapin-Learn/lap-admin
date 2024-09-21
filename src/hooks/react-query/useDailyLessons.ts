import { createLesson, getLessonsOfQuestionType, getQuestionTypes, LessonList } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const QuestionTypeKeys = {
  key: ["question-types"],
  list: () => [...QuestionTypeKeys.key, "list"],
};

const LessonKeys = {
  key: ["lessons"],
  list: (questionType: number) => [...LessonKeys.key, "list", questionType],
};

export const useGetQuestionTypes = () => {
  return useQuery({
    queryKey: QuestionTypeKeys.list(),
    queryFn: getQuestionTypes,
  });
};

export const useGetLessonsOfQuestionType = (questionType: number) => {
  return useQuery({
    queryKey: LessonKeys.list(questionType),
    queryFn: () => getLessonsOfQuestionType(questionType),
  });
};

export const useCreateLesson = (questionType: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLesson,
    onSuccess: (returnData) => {
      queryClient.setQueryData(LessonKeys.list(questionType), (oldData: LessonList) => {
        if (oldData[returnData.bandScore] === undefined) {
          oldData[returnData.bandScore] = [];
        }
        return {
          ...oldData,
          [returnData.bandScore]: [...oldData[returnData.bandScore], returnData],
        };
      });
    },
  });
};
