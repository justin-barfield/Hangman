import React from 'react';
import './style.css';

function GamesLost(props) {

    return (
        <div className="row scores">
            <h3>
                Games Lost: {props.losses}
            </h3>
        </div>
    );
};

export default GamesLost;