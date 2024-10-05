import { useCreateQuestion } from "@/hooks/react-query/useQuestions";

import QuestionForm from "../organisms/question-form";
import { BaseCreateQuestion } from "../organisms/question-form/validation";
import { Separator } from "../ui/separator";
import { Typography } from "../ui/typography";

export default function CreateQuestionPage() {
  const createQuestion = useCreateQuestion();
  const onSubmit = (data: BaseCreateQuestion) => {
    createQuestion.mutate({
      ...data,
      content: {
        ...data.content,
        answer: data.content.answer,
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
