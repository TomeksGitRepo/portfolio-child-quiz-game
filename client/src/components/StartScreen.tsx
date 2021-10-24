import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./StartScreen.css";
import { Link } from "react-router-dom";
import DifficultyLevel from "./DifficultyLevel";
import { winnerURL } from "./FinishGameScreen";
import { backgroundImages, mobileBackgroundImages } from "./LessonContainer";
import {
  easyQuestionsAnswers,
  backgroundImages as answersBackgroundImages,
} from "./QuizAnswerContainer";
import {
  backgroundImages as FinalBackgroundImages,
  mobileBackgroundImages as FinalMobileBackgroundImages,
} from "./FinalTestBanner";
import { useRecoilSnapshot } from "recoil";
import { CornerRibbon } from "./CornerRibbon";

const combineImagesArray = [
  "/childgame/questionImages/krowa.png",
  "/childgame/backgroundInGameMobile.png",
  ...backgroundImages,
  ...mobileBackgroundImages,
  ...easyQuestionsAnswers,
  ...answersBackgroundImages,
  ...winnerURL,
  ...FinalBackgroundImages,
  ...FinalMobileBackgroundImages,
];

export const SCHOOL_NAME_STORAGE_KEY = "school_name";
export default class StartScreen extends Component<
  {},
  { diffcultyLevel: string; isInputEmpty?: boolean; schoolName?: string }
> {
  constructor(props: any, context: any) {
    super(props);
    this.state = {
      diffcultyLevel: "easy",
    };
  }

  async preDownloadAllImages() {
    combineImagesArray.forEach((pictureURL) => {
      const img = new Image();
      img.src = pictureURL;
    });
  }

  renderDiffcultyLevelInPolish() {
    if (this.state.diffcultyLevel === "easy") {
      return "Ławty";
    } else if (this.state.diffcultyLevel === "medium") {
      return "Średni";
    } else if (this.state.diffcultyLevel === "hard") {
      return "Trudny";
    }
  }

  setDiffcultyLevel(level: string) {
    this.setState({
      diffcultyLevel: level,
    });
  }

  validateInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length > 0) {
      this.setState({
        isInputEmpty: false,
        schoolName: event.target.value,
      });
    } else if (event.target.value.length === 0) {
      this.setState({
        isInputEmpty: true,
        schoolName: "",
      });
    }
  }

  saveSchoolNameToLocalStorage(schoolName: string) {
    localStorage.setItem(SCHOOL_NAME_STORAGE_KEY, schoolName);
  }

  async getSchoolNameFromLocalStorage(): Promise<string | null> {
    return localStorage.getItem(SCHOOL_NAME_STORAGE_KEY);
  }

  componentDidMount() {
    this.preDownloadAllImages();
    this.getSchoolNameFromLocalStorage().then((result) => {
      if (result != undefined) {
        this.setState({
          schoolName: result,
          isInputEmpty: false,
        });
      }
    });
  }

  InputField = withRouter(({ history }) => {
    return (
      <input
        type="text"
        placeholder="Wpisz pełną nazwę placówki"
        value={this.state.schoolName != null ? this.state.schoolName : ""}
        onChange={(event) => this.validateInput(event)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            console.log("event in onKeyPress is:" + event);
            this.saveSchoolNameToLocalStorage(this.state.schoolName!);
            history.push(`/game/${this.state.diffcultyLevel}`);
          }
        }}
      ></input>
    );

    history.push(`/game/${this.state.diffcultyLevel}`);
  });

  render() {
    return (
      <div
        className="ui start_screen centered grid"
        style={{
          backgroundImage: `url('/childgame/startBackground.png')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          height: "100vh",
          width: "auto",
        }}
      >
        <CornerRibbon />
        <div className="ui fiveteen wide column" style={{ display: "none" }}>
          Poziom trudności:
          <div style={{ display: "inline-block", marginLeft: "4px" }}>
            <button
              className={`ui button ${
                this.state.diffcultyLevel === "easy" ? "active" : ""
              }`}
              onClick={() => this.setDiffcultyLevel("easy")}
            >
              Łatwy
            </button>
            <button
              className={`ui button ${
                this.state.diffcultyLevel === "medium" ? "active" : ""
              }`}
              onClick={() => this.setDiffcultyLevel("medium")}
            >
              Średni
            </button>
            <button
              className={`ui button ${
                this.state.diffcultyLevel === "hard" ? "active" : ""
              }`}
              onClick={() => this.setDiffcultyLevel("hard")}
            >
              Trudny
            </button>
          </div>
        </div>

        <div className="ui container start_button">
          <div
            style={{ color: "#32afe1" }}
            className="ui huge fluid icon input column"
          >
            <this.InputField />
            <i className="book icon"></i>
          </div>
          {this.state.isInputEmpty === true ? (
            <p style={{ color: "red" }}>
              Musisz podać nazwę placówki aby rozpocząć quiz
            </p>
          ) : null}
          <DifficultyLevel />
          <p style={{ height: "6px" }}></p>
          {this.state.isInputEmpty === false ? (
            <div
              className="ui row"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Link
                to={`/game/${this.state.diffcultyLevel}`}
                onClick={() => {
                  this.saveSchoolNameToLocalStorage(this.state.schoolName!);
                }}
              >
                <img src="/childgame/startButton.png" />
              </Link>
            </div>
          ) : (
            <div
              className="ui row"
              style={{ textAlign: "center", cursor: "pointer" }}
            >
              <a
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => {
                  this.setState({
                    isInputEmpty: true,
                  });
                }}
              >
                <img src="/childgame/startButtonDisabled.png" />
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }
}
