import React from 'react';
import './style.css';

function GamesWon(props) {
    return (
        <div className="row scores">
            <h3>
                Games Won: {props.wins}
            </h3>
        </div>
    );
};

export default GamesWon;