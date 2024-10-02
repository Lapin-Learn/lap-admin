import { Pencil } from "lucide-react";
import { useState } from "react";

import { Button, Separator } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAssignQuestionsToLesson } from "@/hooks/react-query/useDailyLessons";
import { useGetQuestions } from "@/hooks/react-query/useQuestions";
import { Route } from "@/routes/_authenticated/daily-lessons/$lessonId";

import QuestionListTable from "../question-list-table";

type AssignQuestionsDialog = {
  questionIds: string[];
};
export default function AssignQuestionsDialog({ questionIds }: AssignQuestionsDialog) {
  const [open, setOpen] = useState(false);
  const { data } = useGetQuestions();
  const { lessonId } = Route.useParams();
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const assignQuestionsMutation = useAssignQuestionsToLesson(lessonId);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="secondary" size="sm">
          <Pencil size="16" className="mr-2" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen size-[90%] max-h-screen">
        <DialogTitle>
          <DialogHeader className="text-2xl font-bold">Assign questions</DialogHeader>
          <Separator className="mt-4" />
        </DialogTitle>
        {data && (
          <QuestionListTable
            data={data.questions}
            selectableRows
            defaultValues={questionIds.map((questionId) =>
              data.questions.findIndex((question) => question.id === questionId)
            )}
            onSelectRow={(questions) => {
              setSelectedQuestions(questions.map((question) => question.id));
            }}
          />
        )}
        <DialogFooter>
          <Button variant="secondary" size="sm">
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => {
              assignQuestionsMutation.mutate(selectedQuestions, {
                onSuccess: () => {
                  setOpen(false);
                },
              });
            }}
            disabled={assignQuestionsMutation.isPending}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
