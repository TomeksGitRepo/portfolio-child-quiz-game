import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { RecoilRoot, useRecoilState } from "recoil";
import StartScreen from "./components/StartScreen";

import "./App.css";

import QuizAnswerContainer from "./components/QuizAnswerContainer";
import FinishGameScreen from "./components/FinishGameScreen";
import LessonContainer from "./components/LessonContainer";
import { difficultyLevel, difficultyLevelAtom } from "./atoms/difficultyAtom";



function App() {
  return (
    <Router>
      <RecoilRoot>
        <Switch>
          <Route path="/game">
            <div
              className="App" id="App"
              style={{
                backgroundImage: `url('/childgame/backgroundInGame.png')`, //TODO change this url
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                height: "100vh",
              }}
            >
              <QuizAnswerContainer/>
            </div>
          </Route>
          <Route
            path="/finish_screen/:result"
            render={(props: any) => {
              return (
                <div
                  className="App"
                  id="App"
                  style={{
                    backgroundImage: `url('/childgame/backgroundInGame.png')`, //TODO change this url
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    height: "100vh",
                  }}
                >
                  <FinishGameScreen match={props.match} />
                </div>
              );
            }}
          ></Route>
          <Route path="/">
            <StartScreen />
          </Route>
        </Switch>
      </RecoilRoot>
    </Router>
  );
}



export default App;
