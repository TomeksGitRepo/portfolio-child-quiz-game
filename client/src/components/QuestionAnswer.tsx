import React, { Component } from "react";
import "./QuestionAnswer.css";

export default class QuizAnswer extends Component<
  { displayText: string; onClickHandler: Function, isEasyDifficulty?: boolean },
  { clicked: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  componentDidMount() {
    console.log("Mounted item ", this);
  }

  render() {
    if (this.props.isEasyDifficulty === true) {
      return (
        <div className="ui five wide center aligned column">
          <div className="ui center aligned grid">
          <div
            className={`ui card ${this.state.clicked ? "clicked" : ""}`}
            style={{
              width: "28vh",
              fontSize: "2em",
              lineHeight: "4vh",
              borderRadius: "25px",
              background: 'none'
            }}
            onClick={(event) => {
              console.log("Clicked element", event.target);
              this.setState({ clicked: !this.state.clicked });
              this.props.onClickHandler(this.props.displayText);
            }}
          >
            <img src={this.props.displayText} />
          </div>
          </div>
        </div>
      )
    }
    return (
      <div className="ui grid container" style={{marginTop: "15px"}}>
        <div className="column" style={{marginBottom: "10px"}}>
          <div
            className={`ui card ${this.state.clicked ? "clicked" : ""}`}
            style={{
              width: "100%",
              fontSize: "2em",
              padding: "10px 0",
              lineHeight: "4vh",
              borderRadius: "25px",

            }}
            onClick={(event) => {
              console.log("Clicked element", event.target);
              this.setState({ clicked: !this.state.clicked });
              this.props.onClickHandler(this.props.displayText);
            }}
          >
            {this.props.displayText}
          </div>
        </div>
      </div>
    );
  }
}
