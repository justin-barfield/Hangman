import React from 'react';

function Attempts(props) {
    return (
        <div className="row scores">
            <h3>
                Letters used: {props.badAttempts}
            </h3>
        </div>
    );
};

export default Attempts;