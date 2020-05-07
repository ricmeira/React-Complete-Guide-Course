import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';

class IndexPage extends Component {
    static getInitialProps(context) {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({appName: 'SuperApp'})
            },2000);
        });
        return promise;
    }

    render() {
        return (
            <div>
                <h1>
                    The main Page of {this.props.appName}
                </h1>
                <p>Go to <Link href="auth"><a>Auth</a></Link></p>
                <button onClick={() => Router.push('/auth')}>Go to auth</button>
            </div>
        );
    }
}   ;

export default IndexPage;