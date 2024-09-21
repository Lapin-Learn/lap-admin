import { BookOpen, ChartColumnDecreasing, Search } from "lucide-react";
import SideBar from "../organisms/side-bar";
import { Input } from "../ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@components/ui/accordion";
import { EnumSkill } from "@/lib/enums";
import { useGetQuestionTypes } from "@/hooks/react-query/useDailyLessons";
import { Button } from "../ui/button";
import QuestionTypeDetail from "../organisms/question-type-detail";
import { Link } from "@tanstack/react-router";

export default function DailyLessonsPage() {
  const skills = Object.keys(EnumSkill);
  const { data: questionTypes } = useGetQuestionTypes();

  return (
    <div className="flex h-full">
      <div className="sticky left-0 top-0 z-10 flex h-dvh bg-white">
        <SideBar />
      </div>

      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="grid grid-cols-[1fr_2fr] gap-10 p-6">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h6 className="text-2xl font-semibold">
                <BookOpen size={24} className="mr-2 inline-block" />
                Daily lessons bank
              </h6>
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
              <Button size="sm" variant="secondary">
                New question type
              </Button>
            </div>
            <Accordion type="multiple" className="w-full">
              {skills.map((key) => (
                <AccordionItem value={key}>
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
                          >
                            <div className="ml-4 rounded-sm p-2 hover:bg-muted">{qt.name}</div>
                          </Link>
                        );
                      })
                    ) : (
                      <h6 className="ml-4 grid h-10 place-items-center text-muted-foreground">
                        No question type found
                      </h6>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <QuestionTypeDetail />
        </div>
      </main>
    </div>
  );
}
