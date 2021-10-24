import React, { Component } from "react";
import { useMediaQuery } from "react-responsive";
import { SwitchTransition, CSSTransition } from "react-transition-group";

export let backgroundImages = ["/childgame/testKoncowyBanner.png"];
export let mobileBackgroundImages = ["/images/endingQuizBanner/koncowy.jpg"];


class FinalTestBanner extends Component<
  { markFinalBannerAsDisplayed: () => void, isMobile?: boolean },
  { timeLeft: number }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      timeLeft: 4,
    };
  }

  generateCorrectImage(isMobile?: boolean) {
    if (isMobile === true) {
      return (
                      <div>
                <img
                  src={`${mobileBackgroundImages[0]}` }
                  style={{ height: "80vh", width: "auto" }}
                />
              </div>
      )
    }
    return (
       <div>
                <img
                  src={`${backgroundImages[0]}`}
                  style={{ height: "80vh", width: "auto" }}
                />
              </div>
    )
  }

  componentDidMount() {
    var downloadTimer = setInterval(() => {
      if (this.state.timeLeft <= 1) {
        clearInterval(downloadTimer);
        this.props.markFinalBannerAsDisplayed();
      }
      this.setState({
        timeLeft: this.state.timeLeft - 1,
      });
    }, 1000);
  }

  render() {
    return (
      <div
        style={{
          marginTop: "10px",
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
          alignItems: "center",
          background: "white",
        }}
      >
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={"one"}
            classNames="fade"
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
          >
            <div
              className="sixteen wide column"
              style={{
                textAlign: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                height: "85%",
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "2vh",
              }}
            > 
            {this.generateCorrectImage(this.props.isMobile)}
            </div>
          </CSSTransition>
        </SwitchTransition>
        <div style={{ display: "flex", flexFlow: "column" }}>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>
            Quiz rozpocznie się za:
          </div>
          <div style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}>
            {this.state.timeLeft}
          </div>
          <img
            src="/childgame/lessonButtons/nextButton.png"
            style={{ cursor: "pointer" }}
            onClick={() => this.props.markFinalBannerAsDisplayed()}
          />
        </div>
      </div>
    );
  }
}

export default function FinalTestBannerWrapper(props: any) {
  var isMobile: boolean | undefined;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  if (isPortrait || isTabletOrMobile) {

    isMobile = true
  }
  return (
    <FinalTestBanner markFinalBannerAsDisplayed={props.markFinalBannerAsDisplayed} isMobile={isMobile} />
  )
}
