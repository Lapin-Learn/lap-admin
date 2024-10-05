import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { useGetQuestionTypes } from "@/hooks/react-query/useLearners";
import { EnumSkill } from "@/lib/enums";

const QuestionTypesPage = () => {
  const { skill } = Route.useSearch();
  const { data: questionTypes, isSuccess } = useGetQuestionTypes(skill);
  return (
    <main className="px-40 pt-20">
      {isSuccess && (
        <div className="flex w-full flex-col items-center gap-5">
          {questionTypes.map((questionType) => (
            <Link to={`${questionType.id}`}>
              <Card
                key={questionType.id}
                className="w-80 transition-all duration-300 hover:cursor-pointer hover:shadow-lg"
              >
                <CardHeader>
                  {questionType.image && (
                    <img
                      src={questionType.image.url}
                      alt={questionType.name}
                      className="mb-4 size-20 rounded-full object-cover"
                    />
                  )}
                  <CardTitle>{questionType.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    {questionType.progress.bandScore}: {questionType.progress.totalLearningXP}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

const searchSchema = z.object({
  skill: z.nativeEnum(EnumSkill).catch(EnumSkill.reading),
});

export const Route = createFileRoute("/learner/question-types/")({
  component: QuestionTypesPage,
  validateSearch: (search) => {
    return searchSchema.parse(search);
  },
});
