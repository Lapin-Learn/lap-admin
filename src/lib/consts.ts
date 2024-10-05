import { EnumBandScore, EnumRole } from "./enums";
import { EnumContentType } from "./types/questions";

export const bandScores = {
  [EnumBandScore.PRE_IELTS]: "Pre IELTS",
  [EnumBandScore.BAND_45]: "Band 4.5",
  [EnumBandScore.BAND_5]: "Band 5.0",
  [EnumBandScore.BAND_55]: "Band 5.5",
  [EnumBandScore.BAND_6]: "Band 6.0",
  [EnumBandScore.BAND_65]: "Band 6.5",
  [EnumBandScore.BAND_7]: "Band 7.0",
};

export const CONTENT_TYPE_OPTIONS = [
  { value: EnumContentType.MultipleChoice, label: "Multiple choice" },
  { value: EnumContentType.Matching, label: "Matching" },
];

export const AUTHORIZATION: Record<PropertyKey, EnumRole> = {
  "daily-lessons": EnumRole.admin,
};
