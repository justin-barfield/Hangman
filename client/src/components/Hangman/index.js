import React from 'react';

function Hangman(props) {
    return (

        <div className="row pic-div ">
            
            <img src={props.pictures[0].image} id="hangman" className="" alt="placeholder"/>

        </div>

    );
};

export default Hangman;