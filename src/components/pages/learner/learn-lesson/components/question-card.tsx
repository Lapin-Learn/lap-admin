import { ScrollArea } from "@/components/ui/scroll-area";
import { ReadingQuestion } from "@/lib/types/questions";

export default function QuestionCard({ paragraph, question }: ReadingQuestion) {
  return (
    <div>
      <ScrollArea className="max-h-80 rounded-md border p-4">
        <p>{paragraph}</p>
      </ScrollArea>
      <h2 className="my-2 font-semibold">{question}</h2>
    </div>
  );
}
