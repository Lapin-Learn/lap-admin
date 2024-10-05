import { useRouter } from "@tanstack/react-router";
import { MoveLeft } from "lucide-react";
import { useEffect } from "react";

import { Button, Typography } from "@/components/ui";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { EnumQuestion } from "@/lib/types/questions";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/learner/lessons/$lessonId";

import MultipleChoice from "./components/content/multiple-choice";
import useLesson from "./useLesson";

const LearnLessonPage = () => {
  const { lessonId } = Route.useParams();
  const {
    totalQuestion,
    isLoading,
    currentQuestionIndex,
    nextQuestion,
    currentQuestion,
    answers,
    clear,
    answerQuestion,
  } = useLesson(lessonId);
  const router = useRouter();
  useEffect(() => {
    return clear;
  }, []);
  return (
    <main className="mx-4 grid grid-cols-8 pt-4">
      <div className="col-span-full col-start-2 md:col-span-2 md:col-start-4">
        <div className="flex flex-row items-center gap-4">
          <Button variant="ghost" onClick={() => router.history.back()}>
            <MoveLeft />
          </Button>
          <div className="h-4 w-full rounded-full bg-neutral-200">
            <span
              className="block h-full rounded-full bg-orange-500"
              style={{
                width: totalQuestion
                  ? `${((currentQuestionIndex + 1) / totalQuestion) * 100}%`
                  : "0",
              }}
            ></span>
          </div>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div>
              {currentQuestion && (
                <div>
                  <ScrollArea className="h-80 rounded-md border p-4">
                    <p>{currentQuestion.content.paragraph}</p>
                  </ScrollArea>
                  <h2 className="my-2 font-semibold">{currentQuestion.content.question}</h2>
                </div>
              )}
              {currentQuestion?.contentType == EnumQuestion.MultipleChoice ? (
                <div className="my-2">
                  <MultipleChoice {...currentQuestion?.content} onAnswer={answerQuestion} />
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <Sheet open={typeof answers[currentQuestionIndex] === "boolean"}>
              <SheetContent
                className={cn(
                  "h-40 w-full px-4",
                  answers[currentQuestionIndex] === true
                    ? "bg-green-100"
                    : "bg-destructive-foreground"
                )}
                side="bottom"
              >
                <SheetHeader />
                <div className="left-1/2 flex w-1/2 translate-x-1/2 flex-col">
                  <Typography
                    variant="h4"
                    className={cn(
                      "mb-4 font-bold",
                      answers[currentQuestionIndex] === true ? "text-green-700" : "text-destructive"
                    )}
                  >
                    {answers[currentQuestionIndex] === true ? "Chính xác" : "Chưa chính xác"}
                  </Typography>
                  <Button
                    className={
                      answers[currentQuestionIndex] === true
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-destructive hover:bg-red-700"
                    }
                    onClick={() => nextQuestion()}
                  >
                    Tiếp tục
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </main>
  );
};

export default LearnLessonPage;
