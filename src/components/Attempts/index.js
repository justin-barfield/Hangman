import React from 'react';
import './style.css';

function Attempts(props) {
    return (
        <div className="row scores">
            
            Letters used: {props.allAttempts}

        </div>
    );
};

export default Attempts;