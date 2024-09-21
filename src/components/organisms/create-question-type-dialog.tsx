import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { z } from "zod";
import { EnumSkill } from "@/lib/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useCreateQuestionType } from "@/hooks/react-query/useDailyLessons";
import { useState } from "react";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  skill: z.nativeEnum(EnumSkill).default(EnumSkill.reading),
  imageId: z.string().nullable().default(null),
});

type FormValues = z.infer<typeof schema>;
export default function CreateQuestionTypeDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      skill: EnumSkill.reading,
    },
  });
  const createQuestionType = useCreateQuestionType();

  const onSubmit = (data: FormValues) => {
    createQuestionType.mutate(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">
          New question type
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new question type</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Matching Headings"
                      error={Boolean(form.formState.errors.name)}
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skill"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Reading">{field.value}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(EnumSkill).map((skill) => (
                          <SelectItem
                            key={skill}
                            value={skill}
                            className="capitalize"
                            children={skill}
                          />
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
