import React from 'react';
import './style.css';

function GamesWon(props) {
    return (
        <div className="row">
            
            Games Won: {props.wins}

        </div>
    )
}

export default GamesWon;