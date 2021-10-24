import { render } from "@testing-library/react";
import React from "react";
import { difficultyLevelAtom } from "../atoms/difficultyAtom";
import { useRecoilState } from "recoil";
import Select from "react-select";
import { colors } from "react-select/src/theme";

const DIFF_LVL_KEY = "difficulty_level";
var diffLevels = ["Łatwy", "Średni", "Trudny"];
const options = [
  { value: 0, label: "Wiek 3-4 lata" },
  { value: 1, label: "Wiek 5-6 lat" },
  { value: 2, label: "Dorośli" },
];

interface selectedOption {
  value: number;
  label: string;
}

export default function DifficultyLevel() {
  return (
    <div>
      <RenderDiffLevel />
    </div>
  );
}

function checkDiffucltyLevelSavedInLocalStorage(): string | null {
  return localStorage.getItem(DIFF_LVL_KEY);
}

function saveDiffucltyLevelToLocalStorage(value: number) {
  localStorage.setItem(DIFF_LVL_KEY, value.toString());
}

function getOption(number: number): selectedOption | undefined {
  return options.find((item) => {
    return item.value === number;
  });
}

function RenderDiffLevel() {
  const [diffLvl, setDiffLvl] = useRecoilState(difficultyLevelAtom);
  var diffLevelFromLocalStorage = checkDiffucltyLevelSavedInLocalStorage();
  if (
    diffLevelFromLocalStorage != null &&
    parseInt(diffLevelFromLocalStorage) != diffLvl
  ) {
    setDiffLvl(parseInt(diffLevelFromLocalStorage));
  }
  return (
    <div className="ui row" style={{ marginTop: "5px", fontSize: "15px" }}>
      <div style={{ color: "white", fontWeight: "bold" }}>
        Poziom trudności:
      </div>
      <Select
        options={options}
        onChange={(selectedOption) => {
          if (selectedOption != null) {
            setDiffLvl(selectedOption.value);
            saveDiffucltyLevelToLocalStorage(selectedOption.value);
          }
        }}
        value={getOption(diffLvl)}
      />
      {/* Wybierz poziom trudności:
      <div
        className="ui compact menu"
        style={{ marginLeft: "5px", minWidth: "100px" }}
      >
        <div
          className="ui simple dropdown item"
          id="drop_down_diff"
          style={{ minWidth: "100px" }}
        >
          {diffLevels[diffLvl]}
          <i className="dropdown icon"></i>
          <div className="menu">
            {diffLevels.map((item, index) => {
              return (
                <div
                  className="item"
                  onClick={() => {
                    setDiffLvl(index);
                    saveDiffucltyLevelToLocalStorage(index);
                    console.log(
                      (document.querySelector("#drop_down_diff") as any)
                        .classList
                    );
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div> */}
      {/* </div> */}
      {/* <label htmlFor="difficulty">Wybierz poziom trudności</label>
      <select
        name="difficulty"
        onChange={(event) => console.log(event.target.value)}
      >
       
      </select> */}
    </div>
  );
}
