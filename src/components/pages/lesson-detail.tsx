import parse from "html-react-parser";
import { useRef } from "react";

import { useGetLessonDetail } from "@/hooks/react-query/useDailyLessons";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/_authenticated/daily-lessons/$lessonId";

import AssignQuestionsDialog from "../organisms/assign-questions-dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";

export default function LessonDetailPage() {
  const { lessonId } = Route.useParams();
  const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { data, isSuccess } = useGetLessonDetail(lessonId);

  const scrollToQuestion = (questionId: string) => {
    const questionElement = questionRefs.current[questionId];
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isSuccess && data)
    return (
      <div className="p-6">
        <div className="grid grid-cols-[3fr_1fr] gap-20">
          <div>
            <h6 className="top-0 mb-4 text-2xl font-semibold">{data.name}</h6>
            {data.questionToLessons.map(({ questionId, order, question }) => (
              <div
                key={questionId}
                className="mb-8 rounded-md border p-4"
                ref={(el) => (questionRefs.current[questionId] = el)}
              >
                <div className="inline-flex items-center font-semibold">
                  Question {order}
                  <Badge variant="secondary" className="ml-2">
                    {question.cefrLevel}
                  </Badge>
                </div>
                {question.contentType === "multiple_choice" && (
                  <div className="mt-2">
                    <p>{question.content.paragraph}</p>
                    <strong>{question.content.question}</strong>
                    {question.content.answer.length === 1 ? (
                      <RadioGroup
                        className="mt-2 pl-6"
                        value={question.content.answer[0].toString()}
                      >
                        {question.content.options.map((option, index) => (
                          <div
                            className={cn(
                              "inline-flex items-center space-x-2",
                              index == question.content.answer[0]
                                ? "text-green-600 [&_label]:font-semibold [&_svg]:fill-green-600 [&_svg]:text-green-600"
                                : ""
                            )}
                          >
                            <RadioGroupItem
                              value={index.toString()}
                              id={index.toString()}
                              key={index}
                            />
                            <Label htmlFor={index.toString()} className="text-base font-normal">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      <div className="mt-2 flex flex-col gap-2 pl-6">
                        {question.content.options.map((option, index) => (
                          <div
                            className={cn(
                              "inline-flex items-center space-x-2",
                              Array.isArray(question.content.answer) &&
                                question.content.answer.includes(index)
                                ? "text-green-600 [&_label]:font-semibold"
                                : ""
                            )}
                          >
                            <Checkbox
                              value={index.toString()}
                              id={index.toString()}
                              key={index}
                              checked={
                                Array.isArray(question.content.answer) &&
                                question.content.answer.includes(index)
                              }
                            />
                            <Label htmlFor={index.toString()} className="text-base font-normal">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <Separator orientation="horizontal" className="my-4" />
                <strong className="inline-flex items-center gap-2 font-semibold italic">
                  Explanation
                </strong>
                <div className="mt-2 list-inside">{parse(question.explanation || "")}</div>
              </div>
            ))}
          </div>
          <div className="sticky top-12 h-fit">
            <div className="flex flex-row items-center justify-between">
              <h6 className="text-xl font-semibold">Question lists</h6>
              <AssignQuestionsDialog
                questionIds={data.questionToLessons.map((item) => item.questionId)}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.questionToLessons.map(({ questionId, order }) => (
                <Button
                  key={questionId}
                  variant="secondary"
                  onClick={() => scrollToQuestion(questionId)}
                >
                  {order}
                </Button>
              ))}
              {/* <Button variant="secondary" className="w-9 p-2">
                <Plus />
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    );
  return null;
}
