import {
  createLesson,
  createQuestionType,
  getLessonDetail,
  getLessonsOfQuestionType,
  getQuestionTypes,
  LessonList,
  QuestionTypeList,
} from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const QuestionTypeKeys = {
  key: ["question-types"],
  list: () => [...QuestionTypeKeys.key, "list"],
};

const LessonKeys = {
  key: ["lessons"],
  list: (questionType: number) => [...LessonKeys.key, "list", questionType],
  detail: (lessonId: string) => [...LessonKeys.key, "detail", lessonId],
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

export const useCreateQuestionType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createQuestionType,
    onSuccess: (returnData) => {
      queryClient.setQueryData(QuestionTypeKeys.list(), (oldData: QuestionTypeList) => {
        if (oldData[returnData.skill] === undefined) {
          oldData[returnData.skill] = [];
        }
        return {
          ...oldData,
          [returnData.skill]: [...oldData[returnData.skill], returnData],
        };
      });
    },
  });
};

export const useGetLessonDetail = (lessonId: string) => {
  return useQuery({
    queryKey: LessonKeys.detail(lessonId),
    queryFn: () => getLessonDetail(lessonId),
  });
};
