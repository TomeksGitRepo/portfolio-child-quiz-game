import React, { useState }  from 'react';
import './CornerRibbon.css'
import Modal from 'react-modal';
import { render } from '@testing-library/react';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};


export class  CornerRibbon extends React.Component<{}, {isModalOpened: boolean}> {

    constructor(props: any) {
      super(props);

      this.state = {
        isModalOpened: false
      }
      this.openModal = this.openModal.bind(this);
       this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
      console.log('IN OpenModal function')
      this.setState({ isModalOpened: true });
    }

    closeModal() {
      console.log(
        "In CloseModal this.state.isModalOpened: ",
        this.state.isModalOpened
      );
      this.setState({isModalOpened: false})
    }
    render() {
      if (this.state.isModalOpened) {
       return (
         <Modal
           ariaHideApp={false}
           isOpen={this.state.isModalOpened}
           style={customStyles}
           onAfterClose={this.closeModal}
           onRequestClose={this.closeModal}
         >
           <div className="row">
             <button
               style={{ position: "fixed", right: "5px", top: "5px" }}
               className="ui icon button"
               onClick={() => this.closeModal()}
             >
               <i className="close icon"></i>
             </button>
           </div>
           <br />
           <br />
           <div
             style={{
               fontSize: "30px",
               lineHeight: "45px",
               fontWeight: "bold",
             }}
           >
             <div>E-lekcja do przeprowadzenia pomiędzy 1 a 2 quizem:</div>
             <ul>
               <li>
                 <a href="/pliki/pdf/e-lekcja.pdf">
                   E-lekcja do przeprowadzenia pomiędzy 1 a 2 quizem.pdf
                 </a>
               </li>
             </ul>
             <div>Wybierz poziom trudności quizu do pobrania:</div>
             <ul>
               <li>
                 <a href="/pliki/pdf/QuizWiek3-4lat.pdf">
                   Wiek 3-4 lata
                 </a>
               </li>
               <li>
                 <a href="/pliki/pdf/QuizWiek5-6lat.pdf">
                   Wiek 5-6 lat
                 </a>
               </li>
               <li>
                 <a href="/pliki/pdf/QuizDorośli.pdf">Dorośli</a>
               </li>
             </ul>
           </div>
         </Modal>
       );
      } else {
        return (
          <div className="corner-ribbon right" onClick={this.openModal}>
            Pobierz materiały do druku
          </div>
        );
      }
      
    }
    
}