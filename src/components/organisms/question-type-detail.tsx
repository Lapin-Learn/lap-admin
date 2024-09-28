import { useSearch } from "@tanstack/react-router";
import dayjs from "dayjs";
import { Pencil } from "lucide-react";
import { useMemo } from "react";

import { useCreateBucket, useUpdateBucket } from "@/hooks/react-query/useBuckets";
import {
  useGetLessonsOfQuestionType,
  useGetQuestionTypes,
  useUpdateQuestionType,
} from "@/hooks/react-query/useDailyLessons";
import { bandScores } from "@/lib/consts";
import { EnumBandScore, EnumSkill } from "@/lib/enums";
import { IQuestionType } from "@/lib/interfaces";

import HoverTextInput from "../mocules/hover-text-input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Typography } from "../ui/typography";
import ChangeImageDialog from "./change-image-dialog";
import LessonListTable from "./lesson-list-table";

export default function QuestionTypeDetail() {
  const { questionType: questionTypeId, skill } = useSearch({ strict: false });
  const { data: lessons } = useGetLessonsOfQuestionType(questionTypeId);
  const { data: questionTypes } = useGetQuestionTypes();
  const createBucket = useCreateBucket();
  const updateBucket = useUpdateBucket();
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

  const handleChangeImage = (files: File[]) => {
    const file: File = files[0];
    if (questionType?.image) {
      updateBucket.mutate({
        id: questionType.image.id,
        file,
      });
    } else {
      console.log("create");
      createBucket.mutate(file, {
        onSuccess: (data) => {
          updateQuestionTypeMutation.mutate({
            imageId: data.id,
          });
        },
      });
    }
  };
  if (lessons)
    return (
      <div>
        <div className="flex flex-row items-center gap-4">
          <ChangeImageDialog onSubmit={handleChangeImage}>
            <div className="relative grid size-24 cursor-pointer place-items-center overflow-hidden rounded-full bg-slate-300 [&_div]:opacity-0 [&_div]:hover:opacity-70">
              {questionType?.image ? (
                <img
                  alt="Question type avatar"
                  src={questionType.image.url}
                  className="size-full object-cover"
                />
              ) : (
                <Typography variant="caption">No image</Typography>
              )}
              <div className="overlay absolute grid size-full place-items-center bg-slate-400 text-white transition-all duration-200">
                <Pencil />
              </div>
            </div>
          </ChangeImageDialog>
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
