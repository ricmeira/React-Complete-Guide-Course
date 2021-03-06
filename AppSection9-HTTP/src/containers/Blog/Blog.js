import React, { Component, Suspense } from 'react';
//import axios from 'axios';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';

import './Blog.css';


const NewPost = React.lazy(() => import('./NewPost/NewPost') );
//import NewPost from './NewPost/NewPost';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    }

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                to="/posts" 
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'                     
                                }}
                                exact>Posts</NavLink></li>
                            <li>
                                <NavLink to={{
                                    pathname: '/new-post',
                                    /*pathname: this.props.match.url + '/new-post',*/
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/*<Route path="/" exact render={() => <h1>Home</h1>}/>
                <Route path="/" render={() => <h1>Home2</h1>}/>*/}
                <Switch>
            {this.state.auth ? <Route render={() => <Suspense fallback={<div>Loading</div>}><NewPost /></Suspense>} path="/new-post" /> : null}
                    {/*{this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null}*/}
                    <Route path="/posts" component={Posts}/>
                    <Route render={() => <h1>Not found!</h1>}/>
                    {/*<Redirect from="/" to="/posts" />*/}
                    {/*<Route path="/posts" component={Posts}/>*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;