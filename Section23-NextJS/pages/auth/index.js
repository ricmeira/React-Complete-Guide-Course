import React from 'react';
import User from '../../components/User';

const authIndexPage = () => (
    <div>
        <h1>
            The auth index page
        </h1>
        <User name="Ricardo" age={28}/>
    </div>
);

export default authIndexPage;