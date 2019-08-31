import React from 'react';
import './CharComponent.css';

const CharComponent = ({ letter, clicked }) => (
    <div className="CharComponent" onClick={clicked}>
        {letter}
    </div>
);

export default CharComponent;