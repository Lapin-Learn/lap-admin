import { generateJSON } from "@tiptap/core";
import { useState } from "react";

import {
  useCreateInstruction,
  useGetInstruction,
  useUpdateInstruction,
} from "@/hooks/react-query/useInstructions";
import { Route } from "@/routes/_authenticated/daily-lessons/$questionTypeId/instruction";

import TailwindAdvancedEditor from "../organisms/editor/advanced-editor";
import { defaultExtensions } from "../organisms/editor/extensions";
import { useFindQuestionType } from "../organisms/question-type-detail/use-question-type";
import { Button, Typography } from "../ui";

export default function InstructionPage() {
  const [content, setContent] = useState<string>("");
  const { questionTypeId } = Route.useParams();
  const questionType = useFindQuestionType(Number(questionTypeId));
  const { data: instruction, isSuccess } = useGetInstruction(Number(questionTypeId));
  const updateInstructionMutation = useUpdateInstruction();
  const createInstructionMutation = useCreateInstruction();
  return (
    <div className="p-6">
      <Typography variant="h3" className="mb-6 inline-flex items-center">
        {questionType ? `${questionType.name} instruction` : "Instruction"}
      </Typography>
      {isSuccess && (
        <>
          <TailwindAdvancedEditor
            initialValue={generateJSON(instruction ? instruction.content : "", defaultExtensions)}
            onChange={(value) => {
              setContent(value);
            }}
          />
          {instruction === null ? (
            <Button
              onClick={() => {
                createInstructionMutation.mutate({
                  questionTypeId: Number(questionTypeId),
                  content: content ?? "",
                });
              }}
              disabled={createInstructionMutation.isPending}
              className="mt-6"
            >
              Create
            </Button>
          ) : (
            <Button
              onClick={() => {
                updateInstructionMutation.mutate({
                  id: instruction.id,
                  content,
                });
              }}
              disabled={updateInstructionMutation.isPending}
              className="mt-6"
            >
              Save
            </Button>
          )}
        </>
      )}
    </div>
  );
}
