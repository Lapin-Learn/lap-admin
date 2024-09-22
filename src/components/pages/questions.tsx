import { FileQuestion } from "lucide-react";
import { Typography } from "../ui/typography";
import QuestionListTable from "../organisms/question-list-table";
import { useGetQuestions } from "@/hooks/react-query/useQuestions";

export default function QuestionListPage() {
  const { data } = useGetQuestions();
  return (
    <div className="p-6">
      <Typography variant="h3">
        <FileQuestion size={24} className="mr-2 inline-block" />
        Question List
      </Typography>
      {data && <QuestionListTable data={data.questions} />}
    </div>
  );
}
