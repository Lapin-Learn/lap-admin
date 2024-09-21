import DailyLessonsPage from "@/components/pages/daily-lessons";
import { EnumSkill } from "@/lib/enums";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  skill: z.nativeEnum(EnumSkill).catch(EnumSkill.reading),
  questionType: z.number().default(1),
});
export const Route = createFileRoute("/_authenticated/daily-lessons")({
  validateSearch: (search) => {
    return searchSchema.parse(search);
  },
  component: DailyLessonsPage,
});
