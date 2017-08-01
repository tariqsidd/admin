import React from 'react';
import { render } from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import { Meteor } from 'meteor/meteor'
import MainLayout from '../client/Layouts/MainLayout'
import AllUsers from './Users'
import UserPage from './UserPage'
import ProjectsPage from './Projects'
import Transactions from './Transactions'
import Categories from './Categories'
import Account from './Accounts'
import projectEdit from './projectEdit'


Meteor.startup(()=>{
    render(
        <Router history={browserHistory}>
            <Route path="/" component={MainLayout}>
                    <Route path="AllUsers" component={{content: AllUsers}} />
                    <Route path="UserPage/:id" component={{content: UserPage}} />
                    <Route path="Projects/:id" component={{content: ProjectsPage}} />
                    <Route path="Transactions/:id" component={{content: Transactions}} />
                    <Route path="Categories/:id" component={{content: Categories}} />
                    <Route path="Accounts/:id" component={{content: Account}} />
                    <Route path="Edit/:id" component={{content: projectEdit}} />

            </Route>
        </Router>,

        document.getElementById('render-root')
    );
});

