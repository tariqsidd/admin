import React, {Component} from 'react';
import {Link} from 'react-router'
import AccountUi from '../AccountUi.jsx'

// export const MainLayout = () => {
export default class MainLayout extends Component {
    render() {
        return <div className="main-layout">

            <header>
                <h2>Users</h2>
                <nav>
                    <Link to="AllUsers">Users</Link>
                    <AccountUi />
                </nav>
            </header>
            <main>
                {this.props.content}
                {this.props.children}
            </main>
        </div>
    }
}

