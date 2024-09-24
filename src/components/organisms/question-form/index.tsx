import { useForm, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EnumQuestion, Question } from "@/lib/types/questions";
import { Button } from "@/components/ui/button";
import { EnumCERFLevel } from "@/lib/enums";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSelect from "@/components/mocules/form-inputs/form-select";
import { CONTENT_TYPE_OPTIONS } from "@/lib/consts";
import FormTextArea from "@/components/mocules/form-inputs/form-text-area";
import MultipleChoice from "./content/multiple-choice";

const baseCreateQuestionSchema = z.object({
  contentType: z.nativeEnum(EnumQuestion),
  content: z.object({
    paragraph: z.string().trim().min(1, "Paragraph is required"),
    question: z.string().trim().min(1, "Question is required"),
    options: z.array(z.string()).min(2, "At least 2 options are required"),
    answer: z.array(z.number()).min(1, "At least 1 answer is required"),
  }),
  imageId: z.string().nullable().default(null),
  audioId: z.string().nullable().default(null),
  cerfLevel: z.nativeEnum(EnumCERFLevel),
  explanation: z.string().nullable(),
});

export type BaseCreateQuestion = z.infer<typeof baseCreateQuestionSchema>;

type QuestionFormProps = {
  onSubmit: (data: BaseCreateQuestion) => void;
  defaultValues?: BaseCreateQuestion | Question;
  disabledSubmit?: boolean;
};

export default function CreateQuestionPage({
  onSubmit,
  defaultValues,
  disabledSubmit,
}: QuestionFormProps) {
  const form = useForm<BaseCreateQuestion>({
    defaultValues: (defaultValues as BaseCreateQuestion) || {
      contentType: EnumQuestion.MultipleChoice,
      content: {
        paragraph: "",
        question: "",
        answer: [],
      },
      cerfLevel: EnumCERFLevel.A1,
      explanation: null,
      imageId: null,
      audioId: null,
    },
    resolver: zodResolver(baseCreateQuestionSchema),
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex w-full flex-row gap-4">
          <FormSelect
            label="Content type"
            name="contentType"
            options={CONTENT_TYPE_OPTIONS}
            className="w-full"
          />
          <FormSelect
            label="CERF Level"
            name="cerfLevel"
            options={
              Object.values(EnumCERFLevel).map((value) => ({
                label: value,
                value: value,
              })) || []
            }
            className="w-full"
          />
        </div>
        <FormTextArea name="content.paragraph" label="Paragraph" />
        <FormField
          control={form.control}
          name="content.question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input placeholder="Question" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        {createContentQuestion(form)}
        <FormTextArea name="explanation" label="Explanation" />
        <Button className="w-fit" disabled={disabledSubmit ?? false}>
          {defaultValues ? "Save changes" : "Create question"}
        </Button>
      </form>
    </Form>
  );
}

function createContentQuestion(form: UseFormReturn<BaseCreateQuestion>) {
  switch (form.watch("contentType")) {
    case EnumQuestion.MultipleChoice:
      return <MultipleChoice form={form} />;
    default:
      return null;
  }
}
