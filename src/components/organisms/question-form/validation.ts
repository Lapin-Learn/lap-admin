import { EnumCEFRLevel } from "@/lib/enums";
import { EnumQuestion } from "@/lib/types/questions";
import { z } from "zod";

const questionSchema = z.object({
  options: z.array(z.string()).min(2, "At least 2 options are required"),
  answer: z.array(z.number()).min(1, "At least 1 answer is required"),
});
export const baseCreateQuestionSchema = z.object({
  contentType: z.nativeEnum(EnumQuestion),
  content: z
    .object({
      paragraph: z.string().trim().min(1, "Paragraph is required"),
      question: z.string().trim().min(1, "Question is required"),
    })
    .merge(questionSchema),
  imageId: z.string().nullable().default(null),
  audioId: z.string().nullable().default(null),
  cefrLevel: z.nativeEnum(EnumCEFRLevel),
  explanation: z.string().nullable(),
});

export type BaseCreateQuestion = z.infer<typeof baseCreateQuestionSchema>;
