import { atom } from "recoil";

export enum questionType {
  PreLesson,
  PostLesson,
}

export interface questionAnswer {
  questionType: questionType;
  questionNumber: number;
  isAnswerCorrect: boolean;
}

export const userAnswers = atom<Array<questionAnswer>>({
  key: "userAnswers",
  default: [], //object representing
});
