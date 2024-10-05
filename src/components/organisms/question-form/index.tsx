import { zodResolver } from "@hookform/resolvers/zod";
import { generateJSON } from "@tiptap/core";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

import FormSelect from "@/components/mocules/form-inputs/form-select";
import FormTextArea from "@/components/mocules/form-inputs/form-text-area";
import { Button } from "@/components/ui/button";
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
import { CONTENT_TYPE_OPTIONS } from "@/lib/consts";
import { EnumCEFRLevel } from "@/lib/enums";
import { EnumContentType, IQuestion } from "@/lib/types/questions";

import TailwindAdvancedEditor from "../editor/advanced-editor";
import { defaultExtensions } from "../editor/extensions";
import MultipleChoice from "./multiple-choice";
import { BaseCreateQuestion, baseCreateQuestionSchema } from "./validation";

type QuestionFormProps = {
  onSubmit: (data: BaseCreateQuestion) => void;
  defaultValues?: BaseCreateQuestion | IQuestion;
  disabledSubmit?: boolean;
};

export default function QuestionForm({
  onSubmit,
  defaultValues,
  disabledSubmit,
}: QuestionFormProps) {
  const form = useForm<BaseCreateQuestion>({
    defaultValues: (defaultValues as BaseCreateQuestion) || {
      contentType: EnumContentType.MultipleChoice,
      content: {
        paragraph: "",
        question: "",
        answer: [],
      },
      cefrLevel: EnumCEFRLevel.A1,
      explanation: null,
      imageId: null,
      audioId: null,
    },
    resolver: zodResolver(baseCreateQuestionSchema),
  });
  useEffect(() => {
    if (defaultValues) form.reset(defaultValues as BaseCreateQuestion);
  }, [defaultValues]);
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
            label="CEFR Level"
            name="cefrLevel"
            options={
              Object.values(EnumCEFRLevel).map((value) => ({
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
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Explanation</FormLabel>
              <FormControl>
                <TailwindAdvancedEditor
                  initialValue={generateJSON(field.value || "", defaultExtensions)}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormTextArea name="explanation" label="Explanation" /> */}
        <Button className="w-fit" disabled={disabledSubmit ?? false}>
          {defaultValues ? "Save changes" : "Create question"}
        </Button>
      </form>
    </Form>
  );
}

function createContentQuestion(form: UseFormReturn<BaseCreateQuestion>) {
  switch (form.watch("contentType")) {
    case EnumContentType.MultipleChoice:
      return <MultipleChoice form={form} />;
    default:
      return null;
  }
}
