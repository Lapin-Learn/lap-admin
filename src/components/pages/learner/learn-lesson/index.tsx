import { useRouter } from "@tanstack/react-router";
import { MoveLeft } from "lucide-react";
import { useEffect } from "react";

import { Button, Typography } from "@/components/ui";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/learner/lessons/$lessonId";

import AnswerInput from "./components/answer-input";
import useLesson from "./useLesson";
import QuestionCard from "./components/question-card";

const LearnLessonPage = () => {
  const { lessonId } = Route.useParams();
  const {
    totalQuestion,
    isLoading,
    currentQuestionIndex,
    nextQuestion,
    currentQuestion,
    learnerAnswers,
    clear,
    answerQuestion,
  } = useLesson(lessonId);
  const router = useRouter();
  useEffect(() => {
    return clear;
  }, []);
  return (
    <main className="mx-4 grid grid-cols-8 pt-4 md:mx-0">
      <div className="col-span-full col-start-1 md:col-span-2 md:col-start-4">
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
            />
          </div>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              {currentQuestion ? (
                <>
                  <QuestionCard {...currentQuestion.content} />
                  <AnswerInput
                    onAnswer={answerQuestion}
                    result={learnerAnswers[currentQuestionIndex]}
                    {...currentQuestion}
                  />
                </>
              ) : null}
            </div>
            <Sheet open={typeof learnerAnswers[currentQuestionIndex] === "boolean"}>
              <SheetContent
                className={cn(
                  "h-40 w-full px-4",
                  learnerAnswers[currentQuestionIndex] === true
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
                      learnerAnswers[currentQuestionIndex] === true
                        ? "text-green-700"
                        : "text-destructive"
                    )}
                  >
                    {learnerAnswers[currentQuestionIndex] === true ? "Chính xác" : "Chưa chính xác"}
                  </Typography>
                  <Button
                    className={
                      learnerAnswers[currentQuestionIndex] === true
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
          </>
        )}
      </div>
    </main>
  );
};

export default LearnLessonPage;
