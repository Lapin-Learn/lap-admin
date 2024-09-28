import { EnumBandScore, EnumRank, EnumSkill } from "./enums";

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: string;
  fullName: string | null;
  dob: string | null;
  createdAt: string;
  learnerProfile: ILearnerProfile | null;
}

export interface ILearnerProfile {
  id: string;
  rank: EnumRank;
  levelId: number;
  xp: number;
  carrots: number;
  streakId: number;
  createdAt: string;
  updatedAt: string;
  streak: IStreak;
}

export interface IStreak {
  id: number;
  current: number;
  target: number;
  record: number;
}

export interface IQuestionType {
  id: number;
  name: string;
  skill: EnumSkill;
  imageId: string | null;
  updatedAt: string;
}

export interface ILesson {
  id: number;
  name: string;
  order: number;
  bandScore: EnumBandScore;
}
