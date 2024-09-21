import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from "../ui/accordion";
import { bandScores } from "@/lib/consts";
import { Badge } from "../ui/badge";
import { useSearch } from "@tanstack/react-router";
import {
  useGetLessonsOfQuestionType,
  useGetQuestionTypes,
} from "@/hooks/react-query/useDailyLessons";
import { EnumBandScore, EnumSkill } from "@/lib/enums";
import LessonListTable from "./lesson-list-table";
import { useMemo } from "react";
import { QuestionType } from "@/services";
import dayjs from "dayjs";

export default function QuestionTypeDetail() {
  const { questionType: questionTypeId, skill } = useSearch({ strict: false });
  const { data: lessons } = useGetLessonsOfQuestionType(questionTypeId);
  const { data: questionTypes } = useGetQuestionTypes();
  const questionType: QuestionType | null = useMemo(() => {
    if (questionTypes) {
      return (
        questionTypes[skill as keyof typeof EnumSkill].find((qt) => qt.id === questionTypeId) ||
        null
      );
    }
    return null;
  }, [questionTypes, questionTypeId, skill]);
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
              <h5 className="text-2xl font-semibold">{questionType?.name}</h5>
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
