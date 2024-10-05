import { useEffect } from "react";
import { create } from "zustand";

import { useGetLessonDetail } from "@/hooks/react-query/useDailyLessons";
import { IQuestion } from "@/lib/types/questions";

type Answer = boolean | "notAnswered";

type State = {
  questions: IQuestion[];
  totalQuestion: number;
  currentQuestionIndex: number;
  currentQuestion: IQuestion | null;
  answers: Answer[];
  isCompleted: boolean;
  learnerAnswer: number[] | null;
};

type Action = {
  setQuestions: (questions: State["questions"]) => void;
  answerQuestion: (newAnswer: boolean) => void;
  nextQuestion: () => void;
  clear: () => void;
};

const initialValue: State = {
  questions: [],
  totalQuestion: 0,
  currentQuestionIndex: 0,
  currentQuestion: null,
  answers: [],
  isCompleted: false,
  learnerAnswer: null,
};
const useLessonStore = create<State & Action>((set, get) => ({
  ...initialValue,
  setQuestions: (questions: State["questions"]) => {
    set({
      questions,
      totalQuestion: questions.length,
      currentQuestion: questions.length ? questions[0] : null,
      answers: Array(questions.length).fill("notAnswered"),
    });
  },
  answerQuestion: (newAnswer) => {
    const { answers, currentQuestionIndex } = get();
    answers[currentQuestionIndex] = newAnswer;
    set({ answers });
  },
  nextQuestion: () => {
    const { questions, currentQuestionIndex, totalQuestion, isCompleted } = get();
    if (currentQuestionIndex < totalQuestion - 1) {
      set({
        currentQuestionIndex: currentQuestionIndex + 1,
        currentQuestion: questions[currentQuestionIndex + 1],
      });
    } else {
      if (!isCompleted) {
        set({ isCompleted: true });
      }
    }
  },
  clear: () => {
    set(initialValue);
  },
}));

export default function useLesson(lessonId: string) {
  const { data: lesson, isLoading, isError, isSuccess } = useGetLessonDetail(lessonId);
  const {
    setQuestions,
    nextQuestion,
    totalQuestion,
    currentQuestion,
    answers,
    answerQuestion,
    currentQuestionIndex,
    clear
  } = useLessonStore();

  useEffect(() => {
    if (isSuccess && lesson) {
      setQuestions(lesson.questionToLessons.map((q) => q.question));
    }
  }, [isSuccess, lesson]);

  return {
    isLoading,
    isError,
    isSuccess,
    nextQuestion,
    answerQuestion,
    totalQuestion,
    answers,
    clear,
    currentQuestion,
    currentQuestionIndex,
  };
}
