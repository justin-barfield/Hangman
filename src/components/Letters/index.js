import React from 'react';
import './style.css';


function Letters(props) {
    
    const mapAll = props.word.map((value, index) =>
    
        <div 
            className="card bg-primary letter-card"
            key={value.id}
        >
            <div className="card-body">
                <h5
                    id={index} 
                    className="card-title"
                >
                    {props.word[index].found ? (
                        <>{props.word[index].val}</>
                    ) : (<>_</>)}
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