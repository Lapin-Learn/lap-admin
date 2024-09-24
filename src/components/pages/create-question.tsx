import { Separator } from "../ui/separator";
import { Typography } from "../ui/typography";
import { useCreateQuestion } from "@/hooks/react-query/useQuestions";
import QuestionForm, { BaseCreateQuestion } from "../organisms/question-form";

export default function CreateQuestionPage() {
  const createQuestion = useCreateQuestion();
  const onSubmit = (data: BaseCreateQuestion) => {
    createQuestion.mutate({
      ...data,
      content: {
        ...data.content,
        answer: data.content.answer.length == 1 ? data.content.answer[0] : data.content.answer,
      },
    });
  };
  return (
    <div className="p-6">
      <Typography variant="h3">New question</Typography>
      <Separator className="my-4" />
      <QuestionForm onSubmit={onSubmit} disabledSubmit={createQuestion.isPending} />
    </div>
  );
}
