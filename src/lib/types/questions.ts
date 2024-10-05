import { EnumCEFRLevel } from "../enums";
import { IBucket } from "../interfaces";

export enum EnumContentType {
  MultipleChoice = "multiple_choice",
  Matching = "matching",
}

export type ReadingQuestion = {
  paragraph: string;
  question: string;
};

export type BaseQuestion = {
  id: string;
  explanation: string | null;
  cefrLevel: EnumCEFRLevel;
  imageId: string | null;
  image: IBucket | null;
  audioId: string | null;
  audio: IBucket | null;
  createdAt: string;
  updatedAt: string;
};

export type MultipleChoiceContent = {
  options: string[];
  answer: number[];
};

type MultipleChoiceQuestion = BaseQuestion & {
  contentType: EnumContentType.MultipleChoice;
  content: ReadingQuestion & MultipleChoiceContent;
};

export type Column = "columnA" | "columnB";
export type PairAnswer = Record<Column, string[]>;
export type MatchingContent = {
  columnA: {
    title: string;
    options: string[];
  };
  columnB: {
    title: string;
    options: string[];
  };
  answer: PairAnswer[];
};

type MatchingQuestion = BaseQuestion & {
  contentType: EnumContentType.Matching;
  content: ReadingQuestion & MatchingContent;
};

export type IQuestion = MultipleChoiceQuestion | MatchingQuestion;
