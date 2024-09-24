import { FormField, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

export type FormTextAreaProps = {
  name: string;
  label?: string;
  className?: string;
};

export default function FormTextArea({ name, label, className }: FormTextAreaProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <Textarea {...field} />
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
