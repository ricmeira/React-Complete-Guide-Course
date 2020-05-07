import React from 'react';
import User from '../../components/User';

const authIndexPage = props => (
    <div>
        <h1>
            The auth index page - {props.appName}
        </h1>
        <User name="Ricardo" age={28}/>
    </div>
);

authIndexPage.getInitialProps = (context) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({appName: 'SuperApp'})
        },2000);
    });
    return promise;
};

export default authIndexPage;