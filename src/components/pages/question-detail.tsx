import { useMemo } from "react";

import { useGetQuestions, useUpdateQuestion } from "@/hooks/react-query/useQuestions";
import { EnumQuestion } from "@/lib/types/questions";
import { Route } from "@/routes/_authenticated/questions/$questionId";

import QuestionForm from "../organisms/question-form";
import { BaseCreateQuestion } from "../organisms/question-form/validation";
import { Separator } from "../ui/separator";
import { Typography } from "../ui/typography";

export default function QuestionDetailPage() {
  const { questionId } = Route.useParams();
  const updateQuestion = useUpdateQuestion(questionId);
  const { data: questionList, isSuccess } = useGetQuestions();
  const onSubmit = (data: BaseCreateQuestion) => {
    updateQuestion.mutate({
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
      {isSuccess && (
        <QuestionForm
          onSubmit={onSubmit}
          disabledSubmit={updateQuestion.isPending}
          {...(selectedQuestion ? { defaultValues: selectedQuestion } : {})}
        />
      )}
    </div>
  );
}
