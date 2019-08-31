import React from 'react';
import './UserOutput.css';

const UserOutput = ({ userName }) => (
    <div className="UserOutput">
        <p>
            Hello!!!
        </p>
        <p>
            My name is { userName }
        </p>
    </div>
);

export default UserOutput;