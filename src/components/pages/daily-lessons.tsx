import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Link, useSearch } from "@tanstack/react-router";
import { BookOpen, ChartColumnDecreasing, Search } from "lucide-react";

import CreateQuestionTypeDialog from "@/components/organisms/create-question-type-dialog";
import QuestionTypeDetail from "@/components/organisms/question-type-detail";
import { Button, Input, Typography } from "@/components/ui";
import { useGetQuestionTypes } from "@/hooks/react-query/useDailyLessons";
import { EnumSkill } from "@/lib/enums";

export default function DailyLessonsPage() {
  const skills = Object.keys(EnumSkill);
  const { questionType: questionTypeId, skill } = useSearch({ strict: false });
  const { data: questionTypes } = useGetQuestionTypes();

  return (
    <div className="grid grid-cols-[1fr_2fr] gap-10 p-6">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h3">
            <BookOpen size={24} className="mr-2 inline-block" />
            Daily lessons bank
          </Typography>
          <Button variant="secondary" size="sm" className="size-10 p-1">
            <ChartColumnDecreasing size={24} />
          </Button>
        </div>
        <div className="mb-2 flex flex-row items-center gap-4">
          <div className="relative h-fit w-full">
            <Input placeholder="Search question type" className="w-full" />
            <button className="absolute inset-y-0 right-3 rounded-full text-muted-foreground hover:text-black">
              <Search size={16} />
            </button>
          </div>
          <CreateQuestionTypeDialog />
        </div>
        <Accordion type="multiple" className="w-full">
          {skills.map((key) => (
            <AccordionItem value={key} key={key}>
              <AccordionTrigger className="pb-2 capitalize">{key}</AccordionTrigger>
              <AccordionContent>
                {questionTypes && questionTypes[key as EnumSkill] ? (
                  questionTypes[key as EnumSkill].map((qt) => {
                    return (
                      <Link
                        to=""
                        search={{
                          skill: key,
                          questionType: qt.id,
                        }}
                        key={qt.id}
                      >
                        <div className="ml-4 rounded-sm p-2 hover:bg-muted">{qt.name}</div>
                      </Link>
                    );
                  })
                ) : (
                  <Typography
                    variant="subtitle1"
                    className="ml-4 grid h-10 place-items-center text-muted-foreground"
                  >
                    No question type found
                  </Typography>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {questionTypeId && skill && <QuestionTypeDetail />}
    </div>
  );
}
