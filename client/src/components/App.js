import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header';
import Login from '../components/Login';
import UserDetails from '../components/UserDetails';

export default ({ history }) => (
    <div>
        <Header { ...{history} } />

        <main role="main" className="container">
            <Route path="/login" render={ () => (
                <Login { ...{history} } />
            )} />
            <Route path="/details" render={ () => (
                <UserDetails { ...{history} } />
            )} />
        </main>
    </div>
);
