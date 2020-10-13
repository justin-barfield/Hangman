import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Title from './components/Title';
import Attempts from './components/Attempts';
import GamesWon from './components/GamesWon';
import GamesLost from './components/GamesLost';
import Hangman from './components/Hangman';
import Letters from './components/Letters';

class App extends Component {

    state={
        allAttempts: [],
        goodAttempts: [],
        wins: 0,
        losses: 0,
        picture: "",
        word: [],
        remainingAttempts: 6,
        repeat: false,
        letterIndex: [],
        correct: false,
        
    }

    // function for API word


    // function for updating states

    // Clear word state for new incoming word
    clearWord = () => {
        this.setState({ word: [] });
        console.log(this.state.word);
    };

    // Set word state for new incoming word
    setWord = () => {
        const fullWord = "wordd";
        const wordArray = fullWord.split("");

        const wordObj = wordArray.map((value, index) => {
            return {
                id: index,
                val: value
            }
        })
        
        // console.log("setWord: wordObj: ", wordObj);

        this.setState({ word: wordObj });
        
    };

    // Record key press
    handleKeyDown = (event) => {
        let match = [];
        let repeat = false;
        let letterIndex= [];
        let correct = false;
        
        // Validate if the key pressed is recurring in allAttempts
        this.state.allAttempts.map((value, index) => {

            if( this.state.allAttempts[index] === event.key ) {
                return repeat = true;
            }

        })

        // Validate if the key pressed is recurring in goodAttempts

        /* TODO: Unexpected error here. Attempting to have good and bad attempts separately checked causes repeat to never return true. Would like to have the correct letters not display in letters used. To be investigated later. Bypassing error by placing all key strokes into allAttempts state. */

        // this.state.goodAttempts.map((value, index) => {

        //     if( this.state.goodAttempts[index] === event.key ) {
        //         return repeat = true;
        //     }

        // })

        // Validate if key pressed matches the word
        this.state.word.map((value, index) => {

            console.log(value)

            // console.log(this.state.word[0].val)
            
            if( this.state.word[index].val === event.key ) {
                letterIndex.push(index);
                match.push(this.state.word[index]);
                correct = true;
                return
            }
            
        })

        // if repeat is false set allAttempts and repeat. else set repeat to true
        if( !repeat ) {

            this.setState({
                allAttempts: this.state.allAttempts.concat(event.key),
                goodAttempts: this.state.goodAttempts.concat(match),
                repeat: false,
                letterIndex: this.state.letterIndex.concat(letterIndex),
            });
            
        } else {

            this.setState({
                repeat: true,
            })

        }


        console.log("handleKeyDown: allAttempts: ", this.state.allAttempts);
        console.log("handleKeyDown: goodAttempts: ", this.state.goodAttempts);
        console.log("handleKeyDown: letterIndex: ", this.state.letterIndex);
        console.log("handleKeyDown: repeat: ", repeat);
        console.log("handleKeyDown: match: ", match);
        console.log("handleKeyDown: letterIndex: ", letterIndex);
    }



    // function for breaking up word and breaking it out into the necessary components. May be easier to break word into array or obj then count how many letters have been selected correctly.


    // function to take key press, validate against word, and update state accordingly. If/else statement or condition will be needed.

    componentDidMount() {
        this.clearWord();
        this.setWord();
        document.addEventListener("keydown", this.handleKeyDown)
        
    }



    render(){
        return (

        <>

            <div className="container-fluid">

                <div className="row">

                    <Title/>
                    
                </div>

                <div className="row">

                    <div className="col-4">

                        <Attempts
                            allAttempts={this.state.allAttempts}
                        />

                        <GamesWon/>

                        <GamesLost/>

                    
                    </div>

                    <div className="col-8">

                        <div className="row">

                            <Hangman/>

                        </div>

                        <div className="row">

                            {this.state.repeat ? (
                                <div className="alert alert-primary" role="alert">
                                    Repeat character used!
                                </div>
                            ):(<></>)}

                            <Letters 
                                letterIndex={this.state.letterIndex}
                                word={this.state.word}
                                goodAttempts={this.state.goodAttempts}
                                correct={this.state.correct}
                            />

                        </div>

                    </div>
                    
                </div>

            </div>

        </>

        )
    }

}

export default App;