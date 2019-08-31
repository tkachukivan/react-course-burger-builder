import React from 'react';
import './UserInput.css';

const UserInput = ({ userName, changed}) => (
    <input type="text" value={userName} onChange={changed} className="UserInput"/>
);

export default UserInput;