import { Separator } from "../ui/separator";
import { Typography } from "../ui/typography";
import { useCreateQuestion, useGetQuestions } from "@/hooks/react-query/useQuestions";
import QuestionForm, { BaseCreateQuestion } from "../organisms/question-form";
import { useMemo } from "react";
import { useParams } from "@tanstack/react-router";
import { Route } from "@/routes/_authenticated/questions/$questionId";
import { EnumQuestion } from "@/lib/types/questions";

export default function QuestionDetailPage() {
  const { questionId } = useParams({ from: Route.fullPath });
  const createQuestion = useCreateQuestion();
  const { data: questionList } = useGetQuestions();
  const onSubmit = (data: BaseCreateQuestion) => {
    createQuestion.mutate({
      ...data,
      content: {
        ...data.content,
        answer: data.content.answer.length == 1 ? data.content.answer[0] : data.content.answer,
      },
    });
  };
  const selectedQuestion = useMemo(() => {
    const res = questionList?.questions.find((question) => question.id === questionId);
    if (
      res &&
      res.contentType == EnumQuestion.MultipleChoice &&
      !Array.isArray(res.content.answer)
    ) {
      return {
        ...res,
        content: {
          ...res.content,
          answer: [res.content.answer],
        },
      };
    }
    return res;
  }, [questionList]);
  return (
    <div className="p-6">
      <Typography variant="h3">Question detail</Typography>
      <Separator className="my-4" />
      <QuestionForm
        onSubmit={onSubmit}
        disabledSubmit={createQuestion.isPending}
        {...(selectedQuestion ? { defaultValues: selectedQuestion } : {})}
      />
    </div>
  );
}
