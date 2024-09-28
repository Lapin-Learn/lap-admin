import { useSearch } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useMemo } from "react";

import {
  useGetLessonsOfQuestionType,
  useGetQuestionTypes,
  useUpdateQuestionType,
} from "@/hooks/react-query/useDailyLessons";
import { bandScores } from "@/lib/consts";
import { EnumBandScore, EnumSkill } from "@/lib/enums";
import { IQuestionType } from "@/lib/interfaces";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import LessonListTable from "./lesson-list-table";
import HoverTextInput from "../mocules/hover-text-input";

export default function QuestionTypeDetail() {
  const { questionType: questionTypeId, skill } = useSearch({ strict: false });
  const { data: lessons } = useGetLessonsOfQuestionType(questionTypeId);
  const { data: questionTypes } = useGetQuestionTypes();
  const questionType: IQuestionType | null = useMemo(() => {
    if (questionTypes) {
      return (
        questionTypes[skill as keyof typeof EnumSkill].find((qt) => qt.id === questionTypeId) ||
        null
      );
    }
    return null;
  }, [questionTypes, questionTypeId, skill]);
  const updateQuestionTypeMutation = useUpdateQuestionType(questionTypeId);
  if (lessons)
    return (
      <div>
        <div className="flex flex-row items-center gap-4">
          <img
            className="size-24 rounded-full"
            alt=""
            src="https://plus.unsplash.com/premium_photo-1664457233806-e1477e52e2ab?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <div className="w-full flex-1">
            <div className="flex items-baseline justify-between">
              <HoverTextInput
                onSubmit={(value) => {
                  updateQuestionTypeMutation.mutate({
                    name: value,
                  });
                }}
              >
                {questionType?.name}
              </HoverTextInput>
              <p className="text-sm text-muted-foreground">
                Last update: {dayjs(questionType?.updatedAt).format("MM/DD/YY")}
              </p>
            </div>
            <div className="mt-4 flex flex-row gap-4">
              <Button variant="secondary">View instructions</Button>{" "}
              <Button variant="secondary">Import lessons</Button>
            </div>
          </div>
        </div>
        <Separator className="mt-4" />
        <Accordion type="multiple">
          {Object.values(EnumBandScore).map((bandScore) => (
            <AccordionItem key={bandScore} value={bandScore} className="border-none">
              <AccordionTrigger className="text-2xl font-semibold">
                <div className="flex w-full flex-1 flex-row items-center justify-between">
                  <span>{bandScores[bandScore]}</span>
                  <Badge variant="secondary">
                    Total:{" "}
                    {lessons[bandScore as EnumBandScore]
                      ? lessons[bandScore as EnumBandScore].length
                      : 0}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <LessonListTable
                  data={lessons[bandScore as EnumBandScore] ?? []}
                  questionTypeId={questionTypeId}
                  bandScore={bandScore}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  return null;
}
