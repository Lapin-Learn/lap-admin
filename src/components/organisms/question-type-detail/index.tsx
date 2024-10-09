import { Link, useSearch } from "@tanstack/react-router";
import dayjs from "dayjs";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

import HoverTextInput from "@/components/mocules/hover-text-input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { useCreateBucket, useUpdateBucket } from "@/hooks/react-query/useBuckets";
import {
  useGetLessonsOfQuestionType,
  useUpdateQuestionType,
} from "@/hooks/react-query/useDailyLessons";
import { useGetInstruction } from "@/hooks/react-query/useInstructions";
import { IQuestionType } from "@/lib/interfaces";

import ChangeImageDialog from "../change-image-dialog";
import GroupedLessonList from "./lesson-list";
import { useFindQuestionType } from "./use-question-type";

export default function QuestionTypeDetail() {
  const { questionType: questionTypeId, skill } = useSearch({ strict: false });
  const questionType: IQuestionType | null = useFindQuestionType(questionTypeId, skill);
  const { data: lessons } = useGetLessonsOfQuestionType(questionTypeId);
  const { data: instruction, isSuccess } = useGetInstruction(questionTypeId);
  const createBucket = useCreateBucket();
  const updateBucket = useUpdateBucket();
  const [imageUrl, setImageUrl] = useState(questionType?.image?.url || "");
  useEffect(() => {
    setImageUrl(questionType?.image?.url || "");
  }, [questionType]);
  const updateQuestionTypeMutation = useUpdateQuestionType(questionTypeId);

  const handleChangeImage = (files: File[]) => {
    const file: File = files[0];
    if (questionType?.image) {
      updateBucket.mutate(
        {
          id: questionType.image.id,
          file,
        },
        {
          onSuccess: () => {
            setImageUrl(URL.createObjectURL(file));
          },
        }
      );
    } else {
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
              {imageUrl ? (
                <img alt="Question type avatar" src={imageUrl} className="size-full object-cover" />
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
                variant="h3"
                showButton
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
              {isSuccess && (
                <>
                  {instruction ? (
                    <Link to={`${questionTypeId}/instruction`}>
                      <Button variant="secondary">View instruction</Button>
                    </Link>
                  ) : (
                    <Link to={`${questionTypeId}/create-instruction`}>
                      <Button variant="secondary">Create instruction</Button>
                    </Link>
                  )}
                </>
              )}
              <Button variant="secondary">Import lessons</Button>
            </div>
          </div>
        </div>
        <Separator className="mt-4" />
        <GroupedLessonList lessonList={lessons} questionTypeId={questionTypeId} />
      </div>
    );
  return null;
}
