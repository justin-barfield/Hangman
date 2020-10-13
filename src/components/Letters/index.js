import React from 'react';
import './style.css';


function Letters(props) {
    console.log("letters: ", props.word)
    var count = props.word.length
    console.log(count)
    // var newObj = Object.assign({}, props.propWord);
    // console.log("newObj: ", newObj)

    // SUDO
    // Take word length and create 1 card for each letter.
    // Assign each container a unique identifier.
    // 
    // Take letter guessed and adjust the container with the corresponding unique id.
    // 
    // create a function that will take the letter from props and place into the inner html for the h5
    
    console.log("props letters: ", props)

    const letters = props.word
    
    const listBlanks = letters.map((value, index) =>
        <div 
            className="card bg-primary letter-card"
            key={index}
        >
            <div className="card-body">
                <h5
                    id={index} 
                    className="card-title letter-card"
                >
                    
                </h5>
            </div>
        </div>
    );

    let indexOf = props.letterIndex

    const listLetters = 0


    
    return (

        <div className="row">
            
            <div className="card-group">

                {listBlanks}
            
            </div>

        </div>
    )
}

export default Letters;