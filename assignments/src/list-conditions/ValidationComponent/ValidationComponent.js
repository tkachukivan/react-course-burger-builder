import React from 'react';

const ValidationComponent = ({ textLength }) => {
    if (textLength < 5) {
        return (<p>Text too short</p>)
    }

    return null;
}

export default ValidationComponent;