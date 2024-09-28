import { Check, X } from "lucide-react";
import { useFieldArray, useForm, useFormContext, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Typography } from "@/components/ui/typography";

export type FormSelectProps = {
  name: string;
  label?: string;
  className?: string;
  isEditing: boolean;
  selected: number[];
};

export default function FormOptionList({
  name,
  label,
  className,
  isEditing = true,
  selected,
}: FormSelectProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });
  const values = useWatch({ control, name });
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          {!isEditing && (
            <RadioGroup className="flex flex-col gap-2">
              {fields.map((field, index) => (
                <div className="flex flex-row items-center gap-4 px-4">
                  <RadioGroupItem key={field.id} value={field.id} />
                  <div className="flex w-80 flex-row items-center">
                    <Typography className="w-full" variant="body2">
                      {values?.[index]}
                    </Typography>
                    {selected.includes(index) && <Check size={16} className="text-green-500" />}
                    <Button
                      className="size-9 rounded-full p-2 [&_svg]:text-muted-foreground"
                      variant="ghost"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              ))}
              <NewOption
                onSubmit={(value) => {
                  if (value) {
                    append(value);
                  }
                }}
              />
            </RadioGroup>
          )}
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function NewOption({ onSubmit }: { onSubmit: (value: string) => void }) {
  const form = useForm<{ value: string }>();
  const handleSubmit = (data: { value: string }) => {
    onSubmit(data.value);
    form.reset();
  };
  return (
    <div className="flex flex-row items-center px-4">
      <span className="mr-4 inline-block aspect-square size-3.5 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"></span>
      <Input
        {...form.register("value")}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            form.handleSubmit(handleSubmit)();
          }
        }}
        className="w-80 rounded-none border-x-0 border-b border-t-0 border-input px-0 focus-visible:border-b-primary focus-visible:outline-none focus-visible:ring-0"
        placeholder="Add new option"
      />
    </div>
  );
}
