import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { BaseCreateQuestion } from "../validation";
import AnswerSheet from "./answer-sheet";
import FormOptionList from "./form-option-list";

export default function MultipleChoice({ form }: { form: UseFormReturn<BaseCreateQuestion> }) {
  const [isEditingAnswer, setIsEditingAnswer] = useState(false);
  return (
    <div>
      <FormOptionList
        label="Options"
        name="content.options"
        isEditing={isEditingAnswer}
        selected={form.watch("content.answer")}
      />
      <AnswerSheet
        options={form.watch("content.options") || []}
        selected={form.watch("content.answer")}
        onChoose={(indexes) => {
          form.setValue("content.answer", indexes, { shouldValidate: true });
          setIsEditingAnswer((prev) => !prev);
        }}
        isEditing={isEditingAnswer}
      />
      {Boolean(form.formState.errors.content?.answer) && (
        <p className="text-[0.8rem] font-medium text-destructive">
          {form.formState.errors.content?.answer?.message?.toString()}
        </p>
      )}
    </div>
  );
}
