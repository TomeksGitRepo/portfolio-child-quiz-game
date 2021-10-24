import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SetterOrUpdater, useRecoilState } from "recoil";
import {
  questionAnswer,
  questionType,
  userAnswers,
} from "../atoms/userAnswersAtom";

import { difficultyLevel, difficultyLevelAtom } from "../atoms/difficultyAtom";

import "./FinishGameScreen.css";
import { SCHOOL_NAME_STORAGE_KEY } from "./StartScreen";
import DifficultyLevel from "./DifficultyLevel";

const SERVER_URL = "/result/results";

export let winnerURL = ["/childgame/questionImages/zwyciezca.png"];

class FinishScreen extends Component<
  {
    currentAnswers: questionAnswer[];
    setCurrentAnswer: SetterOrUpdater<questionAnswer[]>;
    diffLevel: difficultyLevel;
  },
  {
    preTestCorrectAnserws: number;
    preTestPercentageAnswers: number;
    preTestAllQuestionCount: number;
    postTestCorrectAnserws: number;
    postTestPercentageAnswers: number;
    postTestAllQuestionCount: number;
    resultSendSucceffuly?: boolean;
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      preTestCorrectAnserws: 0,
      preTestPercentageAnswers: 0,
      preTestAllQuestionCount: 0,
      postTestCorrectAnserws: 0,
      postTestPercentageAnswers: 0,
      postTestAllQuestionCount: 0,
    };
  }

  getCorrectAnswers(arr: Array<questionAnswer | undefined>): number {
    var correctAnswers = arr.filter((item) => {
      if (item != undefined && item.isAnswerCorrect) {
        return true;
      }
      return false;
    });
    return correctAnswers.length || 0;
  }

  async processPreTestResult() {
    var preTestResult = this.props.currentAnswers.filter((item) => {
      if (item.questionType === questionType.PreLesson) {
        return true;
      }
      return false;
    });

    var preTestNumberQuestionNumber = preTestResult.length;
    var correctPreTestNumber = this.getCorrectAnswers(preTestResult);
    var preTestCorrectAnswersPercentage = Math.round(
      (correctPreTestNumber / preTestNumberQuestionNumber) * 100
    );

    this.setState({
      preTestCorrectAnserws: correctPreTestNumber,
      preTestPercentageAnswers: preTestCorrectAnswersPercentage,
      preTestAllQuestionCount: preTestNumberQuestionNumber,
    });
  }

  async processPostTestResult() {
    var postTestResult = this.props.currentAnswers.filter((item) => {
      if (item.questionType === questionType.PostLesson) {
        return true;
      }

      return false;
    });

    var postTestNumberQuestionNumber = postTestResult.length;
    var correctPostTestNumber = this.getCorrectAnswers(postTestResult);
    var postTestCorrectAnswersPercentage = Math.round(
      (correctPostTestNumber / postTestNumberQuestionNumber) * 100
    );

    this.setState({
      postTestCorrectAnserws: correctPostTestNumber,
      postTestPercentageAnswers: postTestCorrectAnswersPercentage,
      postTestAllQuestionCount: postTestNumberQuestionNumber,
    });
  }

  async sendResultsToServer(result: any): Promise<boolean> {
    debugger;
    var stringifiedValue = JSON.stringify(result);
    var sendResult = await axios.post(SERVER_URL, { data: stringifiedValue });
    if (sendResult.status === 201) {
      return true;
    }
    return false;
  }

  async testSending() {
    var resultToSend = {
      schoolName: localStorage.getItem(SCHOOL_NAME_STORAGE_KEY),
      created_at: new Date(),
      result: this.props.currentAnswers,
      difficulty_level: this.props.diffLevel,
    };
    var resultSuccessful = await this.sendResultsToServer(resultToSend);
    if (resultSuccessful) {
      this.setState({
        resultSendSucceffuly: true,
      });
    } else {
      this.setState({
        resultSendSucceffuly: false,
      });
    }
  }

  componentDidMount() {
    this.processPreTestResult();
    this.processPostTestResult();
    this.testSending();
  }

  render() {
    return (
      <div
        className="ui column finish_screen "
        style={{
          display: "flex",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          height: "100vh",
        }}
      >
        <div className="ui middle aligned grid container">
          <div className="column">
            <div>
              <img
                src={winnerURL[0]}
                style={{ minHeight: "200px", maxHeight: "270px" }}
              />
            </div>
            <h2>Wyniki testu początkowego</h2>
            <p style={{ fontSize: "1.4em" }}>
              Rozwiązałeś poprawnie <b>{this.state.preTestCorrectAnserws}</b> na{" "}
              <b>{this.state.preTestAllQuestionCount}</b> pytań. Co daje wynik:{" "}
              <b>{this.state.preTestPercentageAnswers}%.</b>
            </p>
            <h2>Wyniki testu końcowego</h2>
            <p style={{ fontSize: "1.4em" }}>
              Rozwiązałeś poprawnie <b>{this.state.postTestCorrectAnserws}</b>{" "}
              na <b>{this.state.postTestAllQuestionCount}</b> pytań. Co daje
              wynik: <b>{this.state.postTestPercentageAnswers}%.</b>
            </p>
            <br />
            <br />
            <DifficultyLevel />
            <br />
            <Link
              style={{ fontSize: "20px" }}
              to={`/game/easy`}
              onClick={() => {
                this.props.setCurrentAnswer([]);
              }}
            >
              Zagraj jeszcze raz
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default function FinishScreenWrapper(props: any) {
  const [currentAnswers, setCurrentAnswer] = useRecoilState(userAnswers);
  const [diffLevel, setDiffLevel] = useRecoilState(difficultyLevelAtom);

  return (
    <FinishScreen
      currentAnswers={currentAnswers}
      setCurrentAnswer={setCurrentAnswer}
      diffLevel={diffLevel}
    />
  );
}
