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
    
    console.log("props letters: ", props)

    const letters = props.word
    
    const listBlanks = letters.map((value, index) =>
        <div className="card bg-primary letter-card"
            key={index}
            id={index}
        >
            <div className="card-body" id={index}>
                <h5 className="card-title letter-card">
                    {value}
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