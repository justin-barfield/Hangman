import React from 'react';
import './style.css';

function Attempts(props) {
    return (
        <div className="row scores">
            <h3>
                Letters used: {props.allAttempts}
            </h3>
        </div>
    );
};

export default Attempts;