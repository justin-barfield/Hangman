import React from 'react';
import './style.css';


function Letters(props) {

    console.log("Letters: props.word: ", props.word)

    {/* take props, map all cards to page. if attempt is good, update card with letter. else, keep card blank */}
    
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
                    { props.word[index].found ? (
                        <>{props.word[index].val}</>
                    ) : (<></>)}
          
                    
                </h5>
            </div>
        </div>
    
    );
    
    return (

        <div className="row">
            
            <div className="card-group">

                {mapAll}
            
            </div>

        </div>
    )
}

export default Letters;