import { bandScores } from "@/lib/consts";
import { EnumBandScore } from "@/lib/enums";
import { LessonList } from "@/services";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { Badge } from "../../ui/badge";
import LessonListTable from "../lesson-list-table";

type GroupedLessonListProps = {
  lessonList: LessonList;
  questionTypeId: number;
};

export default function GroupedLessonList({ lessonList, questionTypeId }: GroupedLessonListProps) {
  return (
    <Accordion type="multiple">
      {Object.values(EnumBandScore).map((bandScore) => {
        const mappedLessonList = lessonList[bandScore as EnumBandScore] ?? [];
        return (
          <AccordionItem key={bandScore} value={bandScore} className="border-none">
            <AccordionTrigger className="text-2xl font-semibold">
              <div className="flex w-full flex-1 flex-row items-center justify-between">
                <span>{bandScores[bandScore]}</span>
                <Badge variant="secondary">Total: {mappedLessonList.length}</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <LessonListTable
                data={mappedLessonList}
                questionTypeId={questionTypeId}
                bandScore={bandScore}
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
