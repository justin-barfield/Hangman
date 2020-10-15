import React from 'react';
import './style.css';

function GamesLost(props) {

    return (
        <div className="row">
            
            Games Lost: {props.losses}

        </div>
    )
}

export default GamesLost;