import { atom } from "recoil";

export enum difficultyLevel {
  Easy,
  Medium,
  Hard,
}

export const difficultyLevelAtom = atom<difficultyLevel>({
  key: "difficultyLevel",
  default: difficultyLevel.Easy, //object representing
});
