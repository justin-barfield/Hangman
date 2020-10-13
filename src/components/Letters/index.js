import React from 'react';
import './style.css';


function Letters(props) {

    // SUDO
    // Take word length and create 1 card for each letter.
    // Assign each container a unique identifier.
    // 
    // Take letter guessed and adjust the container with the corresponding unique id.
    // 
    // create a function that will take the letter from props and place into the inner html for the h5
    
    // console.log("Letters: props: ", props)

    // const mapWord = () => {
    //     props.word.map()
    // }

    // const mapGoodAttempts = () => {
    //     props.goodAttempts.map((value, index) => {
    //         return value;
    //     })
    // }

    // take first index of goodattmpts and compare vs word. if = set value

    // assign word to object with numbers being key and letters being value. loop through object and assign values to corresponding page elements {props.obj.value}. 
    
    // want to compare the values of goodAttempts array vs the index of word.map. Where they are = set output. there they are != set other output
    // props.word.map((value, index) => {
    //     if( mapGoodAttempts() === value ) {
    //         console.log(value)
    //     } else {
    //         console.log(value)
    //     }
        
    // })

    // const test = ()=> {
    //     props.goodAttempts.map((value, index) => {
    //         console.log(value)
    //         if( props.goodAttempts[index].id === props.word[index].id ) {
    //             console.log("test: ", value.val)
    //         }
    //     })
    // }
    // test()

    {/* take props, map all cards to page. if attempt is good, update card with letter. else, keep card blank */}
    const letters = props.word

    const mapAll = props.word.map((value, index) => 
    
        <div 
            className="card bg-primary letter-card"
            key={value.id}
        >
            <div className="card-body">
                <h5
                    id={index} 
                    className="card-title letter-card"
                >
                    {/* {where props.goodAttempts === props.word (
                        {props.goodAttempts}
                    ) : (
                        BLANK
                    )} */}
          
                    
                </h5>
            </div>
        </div>
    
    );

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

                

                {mapAll}
            
            </div>

        </div>
    )
}

export default Letters;