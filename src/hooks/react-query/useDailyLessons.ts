import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  assignQuestions,
  createLesson,
  createQuestionType,
  getLessonDetail,
  getLessonsOfQuestionType,
  getQuestionTypes,
  LessonList,
  QuestionTypeList,
  ReorderLessonParams,
  reorderLessons,
  updateQuestionType,
  UpdateQuestionTypeParams,
} from "@/services";

import { useToast } from "../use-toast";

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

export const useUpdateQuestionType = (questionTypeId: number) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (params: Partial<UpdateQuestionTypeParams>) =>
      updateQuestionType({ ...params, questionTypeId }),
    onSuccess: (returnData) => {
      queryClient.setQueryData(QuestionTypeKeys.list(), (oldData: QuestionTypeList) => {
        const oldQTs = oldData[returnData.skill];
        return {
          ...oldData,
          [returnData.skill]: oldQTs.map((QT) => {
            if (QT.id == returnData.id) return returnData;
            else return QT;
          }),
        };
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
export const useGetLessonDetail = (lessonId: string) => {
  return useQuery({
    queryKey: LessonKeys.detail(lessonId),
    queryFn: () => getLessonDetail(lessonId),
    staleTime: Infinity,
  });
};

export const useReorderLessons = (questionTypeId: number) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (params: ReorderLessonParams) => reorderLessons({ ...params, questionTypeId }),
    onSuccess: (returnData, variable) => {
      queryClient.setQueryData(LessonKeys.list(questionTypeId), (oldData: LessonList) => {
        return {
          ...oldData,
          [variable.bandScore]: returnData.lessons,
        };
      });
      toast({
        title: "Success",
        description: "Reorder lessons successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useAssignQuestionsToLesson = (lessonId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (questionIds: string[]) => assignQuestions(lessonId, questionIds),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: LessonKeys.detail(lessonId),
      });
      toast({
        title: "Success",
        description: "Assign questions successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
