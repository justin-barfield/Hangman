import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Title from './components/Title';
import Attempts from './components/Attempts';
import GamesWon from './components/GamesWon';
import GamesLost from './components/GamesLost';
import Hangman from './components/Hangman';
import Letters from './components/Letters';
import pictures from './pictures';
import API from "./utils/API";

class App extends Component {

    state={
        apiWord: "",
        word: [],
        wordLength: 0,
        count: 0,
        goodAttempts: [],
        badAttempts:[],
        allAttempts: [],
        letterIndex: [],
        numberOfBadAttempts: 0,
        remainingAttempts: 8,
        repeat: false,
        wins: 0,
        losses: 0,
        pictures,
        pageLock: false,
        previousWords: [],
    }

    wordNikApi = () => {

        API.getWord()
            .then( response => {

                const regex = /^[A-Za-z]$/;

                let previousWords = this.state.previousWords;
                let fullWord = response.data;
                let wordArray = fullWord.split("");
                let wordLength = wordArray.length;
                let counter = 0;

                // Send wordObj to state with value and index
                let wordObj = wordArray.map((value, index) => {

                    if( !regex.test(value) ) {

                        counter++;

                        return {
                            found: true,
                            val: value,
                            id: index,
                        };

                    } else {

                        return {
                            found: false,
                            val: value,
                            id: index,
                        };

                    };

                });
    
                this.setState({ 
                    apiWord: fullWord,
                    word: wordObj,
                    wordLength: wordLength,
                    remainingAttempts: 8,
                    count: counter,
                    goodAttempts: [],
                    badAttempts:[],
                    allAttempts: [],
                    letterIndex: [],
                    numberOfBadAttempts: 0,
                    repeat: false,
                    pageLock: false,
                    invalidKey: false,
                    previousWords: previousWords
                });
            })
            .catch( ( error ) => {
                console.log("API ERROR: ", error);
            });

    };
    // Clear word state for new incoming word
    resetGame = () => {

        this.wordNikApi();

    };

    // Win count bool
    win = () =>{
        if( this.state.wordLength === this.state.count ) {
            return true
        }
    };

    // Attempt count bool
    loss = () => {
        if( this.state.numberOfBadAttempts === 8 ) {
            return true
        }
    };

    // Record key press
    handleKeyDown = (event) => {
        let match = [...this.state.word];
        let repeat = false;
        let correct = false;
        let letterIndex= [];
        let counter = this.state.count;
        let remainingAttempts = this.state.remainingAttempts;
        const regex = /^[A-Za-z]$/;

        // validate key press is alphabetic
        if( regex.test(event.key) ) {
        
            // Validate if the key pressed is recurring in allAttempts
            this.state.allAttempts.map((value, index) => {

                if( this.state.allAttempts[index] === event.key ) {
                    return repeat = true;
                };

            });

            // Validate if key pressed matches the word
            this.state.word.map((value, index) => {

                if( this.state.word[index].val === event.key ) {

                    match[index] = {...match[index], found: true};          
                    letterIndex.push(index);
                    counter++;
                    correct = true;

                };
                
            });

            // if page is not locked
            if ( !this.state.pageLock ){

                // if repeat = false 
                if( !repeat ) {

                    // If correct letter guessed
                    if( correct ) {

                        this.setState({
                            goodAttempts: this.state.goodAttempts.concat(event.key),
                            allAttempts: this.state.allAttempts.concat(event.key),
                            word: match,
                            repeat: false,
                            letterIndex: this.state.letterIndex.concat(letterIndex),
                            count: counter,
                            invalidKey: false,
                        }, () => {

                            // Update gamesWon
                            if( this.win() ) {

                                let previousWords = [...this.state.previousWords];
                                previousWords.push(this.state.apiWord);
            
                                this.setState({
                                    previousWords: previousWords,
                                    pageLock: true,
                                    wins: this.state.wins +1,
                                }, () => {
                                    setTimeout(() => {
                                        this.resetGame();
                                    }, 5000);
                                });
            
                            };
                        });

                    // If incorrect letter guessed
                    } else if( !correct ) {

                        this.setState({
                            badAttempts: this.state.badAttempts.concat(event.key),
                            allAttempts: this.state.allAttempts.concat(event.key),
                            repeat: false,
                            numberOfBadAttempts: this.state.numberOfBadAttempts + 1,
                            remainingAttempts: remainingAttempts -1,
                            invalidKey: false,
                        }, () => {

                            // Update gamesLost
                            if( this.loss() ) {

                                let previousWords = [...this.state.previousWords];
                                previousWords.push(this.state.apiWord);
                                
                                this.setState({
                                    previousWords: previousWords,
                                    pageLock: true,
                                    losses: this.state.losses + 1,
                                }, () => {
                                    setTimeout(() => {
                                        this.resetGame();
                                    }, 5000);
                                });
            
                            }
                        });

                    } else {

                        console.log("Key event not accounted for...")
                    };

                // If repeat = true
                } else {

                    this.setState({
                        repeat: true,
                    });

                };
            } else {

                return;

            };

        } else {

            this.setState({
                invalidKey:true,
            });

        };
    };

    componentDidMount() {
        this.resetGame();
        if( this.state.pageLock ) {
            return
        } else {
            document.addEventListener("keydown", this.handleKeyDown);
        }
    };

    render(){
        return (

        <>

            <div className="container-fluid" id="page-container">

                <div className="row" id="title">

                    <div className="col">

                        <Title/>

                    </div>
                    
                </div>

                <div className="row">

                    <div id="scores-col" className="col-3">

                        <Attempts
                            badAttempts={this.state.badAttempts}
                        />

                        <GamesWon
                            wins={this.state.wins}
                        />

                        <GamesLost
                            losses={this.state.losses}
                        />

                        <div className="row scores">
                            <h3>
                                Attempts remaining: {this.state.remainingAttempts}
                            </h3>
                        </div>

                    
                    </div>

                    <div className="col-6 border">

                        <div className="row">

                            <div className="col d-flex justify-content-center">

                                <Hangman
                                    pictures={pictures}
                                    badAttempts={this.state.numberOfBadAttempts}
                                />

                            </div>


                        </div>

                    </div>

                    <div className="col-3">
                        <h3>Previous words:</h3>
                        <br></br>

                        { this.state.previousWords.length ? (

                            <>
                                {this.state.previousWords.map( (value, index) => (

                                    <div 
                                    key={index}
                                    className="row">

                                        {value}

                                    </div>

                                ))}
                            </>

                        ):(<></>)}
                    </div>

                </div>
                    
                <div className="row w-auto">

                    <div className="col d-flex justify-content-center">

                        {this.state.repeat ? (
                            <div className="alert alert-danger d-flex justify-content-center" role="alert">
                                Repeat character used!
                            </div>
                        ):(<></>)}

                        {this.state.invalidKey ? (
                            <div className="alert alert-warning d-flex justify-content-center" role="alert">
                                Invalid key pressed!
                            </div>
                        ):(<></>)}

                    </div>

                </div>

                <div className="row  w-auto" id="word-row">

                    <div className="col d-flex justify-content-center">

                        <Letters 
                            word={this.state.word}
                            correct={this.state.correct}
                        />

                    </div>

                </div>

            </div>

        </>

        );
    };

};

export default App;