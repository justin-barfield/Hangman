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
        attempts: [],
        wins: "",
        losses: "test",
        picture: "",
        word: [],
        remainingAttempts: 6,
        repeat: false,
        letterIndex: [],
        
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
        
        console.log("wordArray inside setWord: ", wordArray);

        this.setState({ word: wordArray });
        
    };

    // Record attempts on key press
    handleKeyDown = (event) => {
        let match = false;
        let repeat = false;
        let letterIndex= [];
        
        // Validate if key pressed matches the word
        this.state.word.map((value, index) => {
            
            if( this.state.word[index] === event.key ) {
                letterIndex.push(index);
                return match = true, letterIndex;
            }
            
        })

        // Validate if the key pressed is recurring
        this.state.attempts.map((value, index) => {

            if( this.state.attempts[index] === event.key ) {
                return repeat = true
            }
        })


        // if repeat is false set attempts and repeat. else set repeat to true
        if( !repeat ) {

            this.setState({
                attempts: this.state.attempts.concat(event.key),
                repeat: false,
                letterIndex: this.state.letterIndex.concat(letterIndex),
            });
            
        } else {

            this.setState({
                repeat: true,
            })

        }


        console.log(this.state.attempts);
        console.log(this.state.letterIndex);
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

                        <Attempts/>

                        <GamesWon/>

                        <GamesLost/>

                    
                    </div>

                    <div className="col-8">

                        <div className="row">

                            <Hangman/>

                        </div>

                        <div className="row">

                            {this.state.repeat ? (
                                <div class="alert alert-primary" role="alert">
                                    Repeat character used!
                                </div>
                            ):(<></>)}

                            <Letters 
                            letterIndex={this.state.letterIndex}
                            word={this.state.word}
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