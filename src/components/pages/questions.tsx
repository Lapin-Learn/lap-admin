import { useNavigate } from "@tanstack/react-router";
import { FileQuestion } from "lucide-react";

import { useGetQuestions } from "@/hooks/react-query/useQuestions";

import QuestionListTable from "../organisms/question-list-table";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";

export default function QuestionListPage() {
  const { data } = useGetQuestions();
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <div className="flex flex-row justify-between">
        <Typography variant="h3" className="inline-flex items-center">
          <FileQuestion size={24} className="mr-2 inline-block" />
          Question List
        </Typography>
        <Button onClick={() => navigate({ to: "create" })}>Create</Button>
      </div>
      {data && <QuestionListTable data={data.questions} />}
    </div>
  );
}
