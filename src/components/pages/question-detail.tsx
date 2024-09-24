import { Separator } from "../ui/separator";
import { Typography } from "../ui/typography";
import { useGetQuestions, useUpdateQuestion } from "@/hooks/react-query/useQuestions";
import QuestionForm, { BaseCreateQuestion } from "../organisms/question-form";
import { useMemo } from "react";
import { Route } from "@/routes/_authenticated/questions/$questionId";
import { EnumQuestion } from "@/lib/types/questions";

export default function QuestionDetailPage() {
  const { questionId } = Route.useParams();
  const updateQuestion = useUpdateQuestion(questionId);
  const { data: questionList } = useGetQuestions();
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
      <QuestionForm
        onSubmit={onSubmit}
        disabledSubmit={updateQuestion.isPending}
        {...(selectedQuestion ? { defaultValues: selectedQuestion } : {})}
      />
    </div>
  );
}
