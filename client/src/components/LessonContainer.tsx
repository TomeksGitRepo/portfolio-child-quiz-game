import React, { Component } from "react";
import { useMediaQuery } from "react-responsive";
import { SwitchTransition, CSSTransition } from "react-transition-group";

export let backgroundImages = [
  "/childgame/lessonImages/e-lekcja.jpg",
  "/childgame/lessonImages/e-lekcja1.jpg",
  "/childgame/lessonImages/e-lekcja2.jpg",
  "/childgame/lessonImages/droga.jpg",
  "/childgame/lessonImages/DROGA1.jpg",
  "/childgame/lessonImages/DROGA2.jpg",
  "/childgame/lessonImages/DROGA3.jpg",
];

export const mobileBackgroundImages = [
  "/images/mobileElessons/E-LEKACJA.jpg", 
  "/images/mobileElessons/E-LEKCJA1.jpg", 
  "/images/mobileElessons/E-LEKCJA2.jpg", 
  "/images/mobileElessons/E-LEKCJA3.jpg", 
  "/images/mobileElessons/E-LEKCJA4.jpg", 
  "/images/mobileElessons/E-LEKCJA5.jpg", 
  "/images/mobileElessons/E-LEKCJA6.jpg"
]

enum UserButtonAction {
  Increase,
  Decrease,
}

class LessonContainer extends Component<
  { markMessageAsFinished: () => void, isMobile?: boolean },
  {
    currentLesson: number;
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentLesson: 0,
    };
  }

  processUserActionButtonClick = (action: UserButtonAction) => {
    if (action === UserButtonAction.Decrease) {
      if (this.state.currentLesson === 0) {
        return;
      }
      this.setState({ currentLesson: this.state.currentLesson - 1 });
      return;
    } else if (action === UserButtonAction.Increase) {
      if (this.state.currentLesson < backgroundImages.length - 1) {
        this.setState({ currentLesson: this.state.currentLesson + 1 });
      }
    }
  };

  async preDownloadImages() {
    backgroundImages.forEach((pictureURL) => {
      const img = new Image();
      img.src = pictureURL;
    });
  }

  componentDidMount() {
    this.preDownloadImages();
  }

  render() {
    if (
      this.state.currentLesson >= backgroundImages.length //this is last lesson add button to start secend quiz
      
    ) {
      console.log("This is last lesson");
    }
    return (
      <div
        style={{
          marginTop: "10px",
          height: "99vh",
          width: "98vw",
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
          alignItems: "center",
          background: "white",
        }}
      >
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={this.state.currentLesson}
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
              <div>
                <img
                  src={this.props.isMobile === true ? `${mobileBackgroundImages[this.state.currentLesson]}` : `${backgroundImages[this.state.currentLesson]}`}
                  style={{ height: "85vh", width: "auto" }}
                />
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>
        <div className="ui centered grid" style={{ display: "flex", width: '100vw'}}>
          {this.state.currentLesson !== 0 ? (
           <div className="eight wide column" style={{textAlign: 'right'}}>
           <img
              src="/childgame/lessonButtons/prevButton.png"
              style={{ cursor: "pointer", width: '48vw', maxWidth: '250px', }}
              onClick={() =>
                this.processUserActionButtonClick(UserButtonAction.Decrease)
              }
            />
            </div>
          ) : null}
          <div className="eight wide column" style={this.state.currentLesson === 0 ? {textAlign: 'center'} : {}}>
          <img
            src="/childgame/lessonButtons/nextButton.png"
            style={{ cursor: "pointer", width: '48vw', maxWidth: '250px'   }}
            onClick={() => {
              if (this.state.currentLesson >= backgroundImages.length - 1) {
                this.props.markMessageAsFinished();
              }
              this.processUserActionButtonClick(UserButtonAction.Increase);
            }}
          />
          </div>
        </div>
      </div>
    );
  }
}

export default function LessonContainerWrapper(props: any) {
  var isMobile: boolean | undefined;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  if (isPortrait || isTabletOrMobile) {
    isMobile = true
  }
  return (
    <LessonContainer markMessageAsFinished={props.markMessageAsFinished} isMobile={isMobile} />
  )
}
