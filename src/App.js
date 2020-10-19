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
/* import dictionary from './assets/dictionary.json'; */

class App extends Component {

    state={
        apiWord: "",
        word: [],
        wordLength: 0,
        count: 0,
        allAttempts: [],
        letterIndex: [],
        numberOfBadAttempts: 0,
        remainingAttempts: 6,
        repeat: false,
        wins: 0,
        losses: 0,
        pictures,
        pageLock: false,
        previousWords: [],
    }

    // l5uxf3w9xt46ywzterjldr9o5rn0pnh68l93tjrfkzoa2bvvu

    // Clear word state for new incoming word
    resetGame = () => {

        console.log("resetGame");

        // this.wordNikApi();

        fetch(`http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=${process.env.REACT_APP_API_KEY}`)
            .then( res => res.json() )
            .then( ( result ) => {
                this.setState({
                    apiWord: result[0].word,
                }, ()=> {
            
                    let fullWord = this.state.apiWord;
                    let wordArray = fullWord.split("");
                    let wordLength = wordArray.length;
        
                    // Send wordObj to state with value and index
                    let wordObj = wordArray.map((value, index) => {
                        return {
                            found: false,
                            val: value,
                            id: index,
                        }
                    })
        
                    this.setState({ 
                        word: wordObj,
                        wordLength: wordLength,
                        remainingAttempts: 6,
                        count: 0,
                        allAttempts: [],
                        letterIndex: [],
                        numberOfBadAttempts: 0,
                        repeat: false,
                        pageLock: false,
                        invalidKey: false,
                    });
                });
            })
            .catch( ( error ) => {
                console.log("API ERROR: ", error);
            })
    };

    // Win count bool
    win = () =>{
        if( this.state.wordLength === this.state.count ) {
            return true
        }
    };

    // Attempt count bool
    loss = () => {
        if( this.state.numberOfBadAttempts === 5 ) {
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
        const regex = /^[A-Za-z]+$/

        // validate key press is alphabetic
        if( regex.test(event.key) ) {
        
            // Validate if the key pressed is recurring in allAttempts
            this.state.allAttempts.map((value, index) => {

                if( this.state.allAttempts[index] === event.key ) {
                    return repeat = true;
                };

            });

            /* TODO: Unexpected error here. Attempting to have good and bad attempts separately checked causes repeat to never return true. Would like to have the correct letters not display in letters used. To be investigated later. Bypassing error by placing all key strokes into allAttempts state. */

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
                console.log("pageLock status: ", this.state.pageLock)

                // if repeat = false 
                if( !repeat ) {

                    // If not correct letter guessed
                    if( correct ) {
                        console.log("Good Guess")

                        this.setState({
                            allAttempts: this.state.allAttempts.concat(event.key),
                            word: match,
                            repeat: false,
                            letterIndex: this.state.letterIndex.concat(letterIndex),
                            count: counter,
                            invalidKey: false,
                        }, () => {

                            // Update gamesWon
                            if( this.win() ) {
                                console.log("Game Won")
            
                                this.setState({
                                    previousWords: this.state.apiWord,
                                    pageLock: true,
                                    wins: this.state.wins +1,
                                }, () => {
                                    setTimeout(() => {
                                        this.resetGame();
                                        // this.setWord();
                                    }, 5000);
                                });
            
                            };
                        });

                    // If incorrect letter guessed
                    } else if( !correct ) {
                        console.log("Bad Guess")

                        this.setState({
                            allAttempts: this.state.allAttempts.concat(event.key),
                            repeat: false,
                            numberOfBadAttempts: this.state.numberOfBadAttempts + 1,
                            invalidKey: false,
                        }, () => {

                            // Update gamesLost
                            if( this.loss() ) {
                                console.log("Game Lost")
                                
                                this.setState({
                                    previousWords: this.state.apiWord,
                                    pageLock: true,
                                    losses: this.state.losses + 1,
                                }, () => {
                                    setTimeout(() => {
                                        this.resetGame();
                                        // this.setWord();
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

        console.log();
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
                            allAttempts={this.state.allAttempts}
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

                    <div className="col-6">

                        <div className="row">

                            <div className="col d-flex justify-content-center">

                                <Hangman
                                    pictures={pictures}
                                />

                            </div>


                        </div>

                    </div>

                    <div className="col-3">
                        <h3>Previous words:</h3>
                        <br></br>
                        {this.state.previousWords}
                    </div>

                    <div className="row w-100">

                        <div className="col d-flex justify-content-center">

                            {this.state.repeat ? (
                                <div className="alert alert-danger" role="alert">
                                    Repeat character used!
                                </div>
                            ):(<></>)}

                            {this.state.invalidKey ? (
                                <div className="alert alert-warning" role="alert">
                                    Invalid key pressed!
                                </div>
                            ):(<></>)}

                        </div>

                    </div>

                    <div className="row" id="word-row">

                        <div className="col d-flex justify-content-center">

                            <Letters 
                                word={this.state.word}
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