import { EnumRank } from "./enums";

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
