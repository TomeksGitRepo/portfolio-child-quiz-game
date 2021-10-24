import React, { Component } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  questionAnswer,
  userAnswers,
  questionType,
} from "../atoms/userAnswersAtom";

import QuizAnswer from "./QuestionAnswer";
import LessonContainer from "./LessonContainer";
import FinalTestBanner from "./FinalTestBanner";
import { difficultyLevel, difficultyLevelAtom } from "../atoms/difficultyAtom";
import { useMediaQuery } from "react-responsive";

export const backgroundImages = [
  "/childgame/questionImages/background_question.png",
  "/childgame/questionImages/background_question.png",
  "/childgame/questionImages/background_question.png",
  "/childgame/questionImages/background_question.png",
  "/childgame/questionImages/background_question.png",
  "/childgame/questionImages/background_question.png",
  "/childgame/questionImages/background_question.png"
];

export const easyQuestionsAnswers = [
  "/images/questionsEasy/question_easy_nr_5/bialy.png",
  "/images/questionsEasy/question_easy_nr_5/szary.png",
  "/images/questionsEasy/question_easy_nr_5/zielony.png",
  "/images/questionsEasy/question_easy_nr_6/krowa.png",
  "/images/questionsEasy/question_easy_nr_6/kura.png",
  "/images/questionsEasy/question_easy_nr_6/swinia.png",
  "/images/questionsEasy/question_easy_nr_7/kot.png",
  "/images/questionsEasy/question_easy_nr_7/sowa.png",
  "/images/questionsEasy/question_easy_nr_7/zyrafa.png",
  "/images/questionsEasy/question_easy_nr_9/jablko.png",
  "/images/questionsEasy/question_easy_nr_9/pomarancza.png",
  "/images/questionsEasy/question_easy_nr_9/ser.png",
  "/images/questionsEasy/question_easy_nr_10/dwie.jpg",
  "/images/questionsEasy/question_easy_nr_10/dzieciak.jpg",
  "/images/questionsEasy/question_easy_nr_7/zyrafa.png",
];

let questionsAndAnswersEasy = [
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_5/bialy.png",
        correct: true,
      },
      { text: "/images/questionsEasy/question_easy_nr_5/szary.png" },
      { text: "/images/questionsEasy/question_easy_nr_5/zielony.png" },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_6/krowa.png",
        correct: true,
      },
      { text: "/images/questionsEasy/question_easy_nr_6/kura.png" },
      { text: "/images/questionsEasy/question_easy_nr_6/swinia.png" },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_7/kot.png",
        correct: true,
      },
      { text: "/images/questionsEasy/question_easy_nr_7/sowa.png" },
      { text: "/images/questionsEasy/question_easy_nr_7/zyrafa.png" },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_9/jablko.png",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_9/pomarancza.png",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_9/ser.png",
        correct: true,
      },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_10/dwie.jpg",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_10/dzieciak.jpg",
        correct: true,
      },
      {
        text: "/images/questionsEasy/question_easy_nr_10/trzy.jpg",
      },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_3/pytanie1_Obszar roboczy 1.png",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_3/pytanie1-02.png",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_3/pytanie1-03.png",
        correct: true,
      },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_1/pytanie2_Obszar roboczy 1.png",
        correct: true,
      },
      {
        text: "/images/questionsEasy/question_easy_nr_1/pytanie2-02.png",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_1/pytanie2-03.png",
      },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_2/pytanie3_Obszar roboczy 1.png",
        correct: true,
      },
      {
        text: "/images/questionsEasy/question_easy_nr_2/pytanie3-02.png",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_2/pytanie3-03.png",
      },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_8/krowa.png",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_8/swinia.png",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_8/zyrafa.png",
        correct: true,
      },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_4/pytanie 4_Obszar roboczy 1.png",
        correct: true,
      },
      {
        text: "/images/questionsEasy/question_easy_nr_4/pytanie 4-02.png",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_4/pytanie 4-03.png",
      },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_5/bialy.png",
        correct: true,
      },
      { text: "/images/questionsEasy/question_easy_nr_5/szary.png" },
      { text: "/images/questionsEasy/question_easy_nr_5/zielony.png" },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_6/krowa.png",
        correct: true,
      },
      { text: "/images/questionsEasy/question_easy_nr_6/kura.png" },
      { text: "/images/questionsEasy/question_easy_nr_6/swinia.png" },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_7/kot.png",
        correct: true,
      },
      { text: "/images/questionsEasy/question_easy_nr_7/sowa.png" },
      { text: "/images/questionsEasy/question_easy_nr_7/zyrafa.png" },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_9/jablko.png",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_9/pomarancza.png",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_9/ser.png",
        correct: true,
      },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_10/dwie.jpg",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_10/dzieciak.jpg",
        correct: true,
      },
      {
        text: "/images/questionsEasy/question_easy_nr_10/trzy.jpg",
      },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_3/pytanie1_Obszar roboczy 1.png",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_3/pytanie1-02.png",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_3/pytanie1-03.png",
        correct: true,
      },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_1/pytanie2_Obszar roboczy 1.png",
        correct: true,
      },
      {
        text: "/images/questionsEasy/question_easy_nr_1/pytanie2-02.png",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_1/pytanie2-03.png",
      },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_2/pytanie3_Obszar roboczy 1.png",
        correct: true,
      },
      {
        text: "/images/questionsEasy/question_easy_nr_2/pytanie3-02.png",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_2/pytanie3-03.png",
      },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_8/krowa.png",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_8/swinia.png",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_8/zyrafa.png",
        correct: true,
      },
    ],
  },
  {
    question: "Pytanie testowe nr xxxx?",
    answers: [
      {
        text: "/images/questionsEasy/question_easy_nr_4/pytanie 4_Obszar roboczy 1.png",
        correct: true,
      },
      {
        text: "/images/questionsEasy/question_easy_nr_4/pytanie 4-02.png",
      },
      {
        text: "/images/questionsEasy/question_easy_nr_4/pytanie 4-03.png",
      },
    ],
  },
];

let questionsAndAnswersMedium = [
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom średni nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
];

let questionsAndAnswersHard = [
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
  {
    question: "Pytanie testowe poziom trudny nr xxxx?",
    answers: [
      { text: "ODP 1", correct: true },
      { text: "ODP 2" },
      { text: "ODP 3" },
    ],
  },
];

let specificQuestionImages: Array<{ index: number; url: string }> = [
  {
    index: 1,
    url: "/childgame/questionImages/background_question.png",
  },
  {
    index: 11,
    url: "/childgame/questionImages/background_question.png",
  },
  {
    index: 2,
    url: "/childgame/questionImages/background_question.png",
  },
  {
    index: 12,
    url: "/childgame/questionImages/background_question.png",
  },
  {
    index: 4,
    url: "/childgame/questionImages/background_question.png",
  },
  {
    index: 14,
    url: "/childgame/questionImages/background_question.png",
  },
];

interface questionSchema {
  question: string;
  answers: { text: string; correct?: boolean }[];
}

class QuizAnswerContainer extends Component<
  {
    difficultyLevel: difficultyLevel;
    currentAnswers: questionAnswer[];
    setCurrentAnswer: (arr: Array<questionAnswer>) => void;
    questionsAndAnswers: {
      question: string;
      answers: { text: string; correct?: boolean }[];
    }[];
    isMobile?: boolean;
  },
  {
    currentQuestion: number;
    correctAnswers: string[];
    userAnswers: string[];
    correctCount: number;
    backgroundImage: string;
    isELessonPlayed: boolean;
    isFinalTestBannerDisplayed: boolean;
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentQuestion: 0,
      correctAnswers: [],
      userAnswers: [],
      correctCount: 0,
      backgroundImage: "",
      isELessonPlayed: false,
      isFinalTestBannerDisplayed: false,
    };

    this.handleAnswerClicked = this.handleAnswerClicked.bind(this);
  }

  async preDownloadImages() {
    backgroundImages.forEach((pictureURL) => {
      const img = new Image();
      img.src = pictureURL;
    });
  }
  componentDidMount() {
    this.preDownloadImages();
    this.generateCorrectAnswers();
    this.generateRandomBackgroundNumber();
  }

  generateRandomBackgroundNumber() {
    var randomOrNotImageURL = this.generateRandomOrSpecificQuestionImage(
      backgroundImages,
      specificQuestionImages
    );
    this.setState({
      backgroundImage: randomOrNotImageURL,
    });
  }

  generateCorrectAnswers = () => {
    //console.log('In generateCorrectAnswers')
    var correctAnswers: string[] = [];
    this.props.questionsAndAnswers.map((item: any, index: any) => {
      // console.log('In map fuction generateCorrectAnswers item:', item)
      item.answers.map((answer: any, index: any) => {
        if (answer.correct) {
          correctAnswers.push(index.toString());
        }
      });
    });
    this.setState({
      correctAnswers,
    });
  };

  handleAnswerClicked(text: string) {
    console.log("In QuizAnswerContainer aswerc picked text: ", text);
    this.props.questionsAndAnswers[this.state.currentQuestion].answers.map(
      (item, index) => {
        if (item.text === text) {
          var newUserAnswer = [...this.state.userAnswers, index.toString()];
          var correctAnswerIndex = parseInt(
            this.state.correctAnswers[this.state.currentQuestion],
            10
          );
          var questionArrayMiddle =
            Math.round(this.props.questionsAndAnswers.length / 2) - 1;
          if (index === correctAnswerIndex) {
            //mark answer as correct
            this.props.setCurrentAnswer([
              ...this.props.currentAnswers,
              {
                isAnswerCorrect: true,
                questionNumber: this.state.currentQuestion,
                questionType:
                  this.state.currentQuestion > questionArrayMiddle
                    ? questionType.PostLesson
                    : questionType.PreLesson,
              },
            ]);
          } else {
            //answer was incorrect
            this.props.setCurrentAnswer([
              ...this.props.currentAnswers,
              {
                isAnswerCorrect: false,
                questionNumber: this.state.currentQuestion,
                questionType:
                  this.state.currentQuestion > questionArrayMiddle
                    ? questionType.PostLesson
                    : questionType.PreLesson,
              },
            ]);
          }
          this.setState(
            {
              userAnswers: newUserAnswer,
              currentQuestion: this.state.currentQuestion + 1,
            },
            () => this.generateRandomBackgroundNumber()
          );
        }
      }
    );
  }

  countCorrectAnswers() {
    let counter = 0;
    this.state.userAnswers.map((item: any, index) => {
      console.log(
        "this.props.questionsAndAnswers[index].answers[item].correct: ",
        this.props.questionsAndAnswers[index].answers[item].correct
      );
      console.log("item: ", item);
      console.log("index: ", index);
      if (
        this.props.questionsAndAnswers[index].answers[item].correct === true
      ) {
        counter++;
      }
    });
    console.log("counter in countCorrectAnswers: ", counter);
    this.setState({
      correctCount: counter,
    });
    return counter;
  }

  markMessageAsFinished = () => {
    this.setState({
      isELessonPlayed: true,
    });
  };

  markFinalBannerAsDisplayed = () => {
    this.setState({
      isFinalTestBannerDisplayed: true,
    });
  };

  generateRandomOrSpecificQuestionImage(
    arrOfImages: Array<string>,
    specificQuestionImage: Array<{ index: number; url: string }>
  ) {
    var specificElement = specificQuestionImage.find(
      (item) => item.index === this.state.currentQuestion
    );
    if (specificElement != undefined) {
      return specificElement.url;
    }
    return arrOfImages[Math.floor(arrOfImages.length * Math.random())];
  }

  generateAnsewersHTML(): JSX.Element | JSX.Element[] {
    if (this.props.difficultyLevel === difficultyLevel.Easy) {
      return (
        <div
          className="ui centered grid"
          style={{ justifyContent: "space-between", padding: "0 8vw" }}
        >
          {this.props.questionsAndAnswers[
            this.state.currentQuestion
          ].answers.map((item) => (
            <QuizAnswer
              isEasyDifficulty={
                this.props.difficultyLevel === difficultyLevel.Easy
              }
              displayText={item.text}
              onClickHandler={this.handleAnswerClicked}
              key={item.text}
            />
          ))}
        </div>
      );
    }
    return this.props.questionsAndAnswers[
      this.state.currentQuestion
    ].answers.map((item) => (
      <QuizAnswer
        isEasyDifficulty={this.props.difficultyLevel === difficultyLevel.Easy}
        displayText={item.text}
        onClickHandler={this.handleAnswerClicked}
        key={item.text}
      />
    ));
  }

  render() {
    if (
      this.state.currentQuestion + 1 >
      this.props.questionsAndAnswers.length
    ) {
      return (
        <Redirect
          to={{
            pathname: `/finish_screen/${this.countCorrectAnswers()}:${
              this.props.questionsAndAnswers.length
            }`,
          }}
        />
      );
    }
    if (
      this.state.currentQuestion ===
        Math.round(this.props.questionsAndAnswers.length / 2) &&
      !this.state.isELessonPlayed
    ) {
      return (
        <LessonContainer markMessageAsFinished={this.markMessageAsFinished} />
      );
    }
    if (
      this.state.currentQuestion ===
        Math.round(this.props.questionsAndAnswers.length / 2) &&
      this.state.isELessonPlayed &&
      !this.state.isFinalTestBannerDisplayed
    ) {
      return (
        <FinalTestBanner
          markFinalBannerAsDisplayed={this.markFinalBannerAsDisplayed}
        />
      );
    }
    return (
      <div
        className="ui middle aligned centered grid"
        style={{ marginTop: "10px", width: "100%" }}
      >
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={this.state.currentQuestion}
            classNames="fade"
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
          >
            <div
              className="ui sixteen wide column"
              style={{
                textAlign: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                height: "100%",
                paddingTop: "5vh",
                // maxWidth: "400px",
                // maxHeight: "667px",
                display: "flex",
                // justifyContent: "space-around",
                marginBottom: "2vh",
              }}
            >
              <div>
                <img
                  src={`${this.state.backgroundImage}`}
                  style={
                    this.props.isMobile === true
                      ? { minHeight: "100px", maxHeight: "100px" }
                      : { minHeight: "200px", maxHeight: "300px" }
                  }
                />
              </div>
              <div className="column" style={{ paddingTop: "1vh" }}>
                <h2 className="ui header" style={{ marginBottom: "25px" }}>
                  {
                    this.props.questionsAndAnswers[this.state.currentQuestion]
                      .question
                  }
                </h2>

                {this.generateAnsewersHTML()}
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    );
  }
}

function switchQuestionDiffLevelBasedOnState(
  diffLvl: difficultyLevel
): questionSchema[] {
  if (diffLvl === difficultyLevel.Easy) {
    return questionsAndAnswersEasy;
  } else if (diffLvl === difficultyLevel.Medium) {
    return questionsAndAnswersMedium;
  }
  return questionsAndAnswersHard;
}

export default function QuizAnswerContainerWrapper(props: any) {
  const [currentAnswers, setCurrentAnswer] = useRecoilState(userAnswers);
  const [diffLvl, setDiffLvl] = useRecoilState(difficultyLevelAtom);

  var questionToDisplay = switchQuestionDiffLevelBasedOnState(diffLvl);

  var isMobile: boolean | undefined;
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  if (isPortrait || isTabletOrMobile) {
    isMobile = true;
  }
  return (
    <QuizAnswerContainer
      difficultyLevel={diffLvl}
      questionsAndAnswers={questionToDisplay}
      setCurrentAnswer={setCurrentAnswer}
      currentAnswers={currentAnswers}
      isMobile={isMobile}
    />
  );
}
