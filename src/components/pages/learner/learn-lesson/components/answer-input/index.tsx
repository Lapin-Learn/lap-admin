import { EnumContentType, IQuestion } from "@/lib/types/questions";

import { Answer } from "../../useLesson";
import Matching from "./matching";
import MultipleChoice from "./multiple-choice";

type BaseAnswerInputProps = {
  onAnswer: (isCorrect: boolean) => void;
  result: Answer;
};

type AnswerInputProps = BaseAnswerInputProps & IQuestion;
const AnswerInput = (props: AnswerInputProps) => {
  const { contentType, content, ...rest } = props;
  switch (contentType) {
    case EnumContentType.MultipleChoice:
      return <MultipleChoice {...content} {...rest} />;
    case EnumContentType.Matching:
      return <Matching {...content} {...rest} />;
    default:
      return null;
  }
};

export default AnswerInput;
