import React from 'react';

function Hangman(props) {
    let image = props.badAttempts
    return (

        <img src={props.pictures[image].image} id="hangman" className="" alt="placeholder"/>

    );
};

export default Hangman;