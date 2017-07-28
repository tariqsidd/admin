import React, {Component} from 'react';
import moment from 'moment';
import {createContainer} from 'meteor/react-meteor-data';
import {Link} from 'react-router'
import {Accounts} from '/imports/accounts'
class Account extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    dateFormate(UserAccounts) {
        return moment (UserAccounts.createdAt).format('MMMM D YYYY');
    }

    currentUser(){
        return Meteor.user();
    }
    getUserAccounts(){
        if(this.currentUser() && this.currentUser().roles && this.currentUser().roles.includes("admin")){
            return (<div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Country</th>
                            <th>Number</th>
                            <th>Bank</th>
                            <th>CreatedAt</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.UserAccounts.map((accounts, i) => {
                            return <tr key={i}>
                                <td>{accounts.country}</td>
                                <td>{accounts.number}</td>
                                <td>{accounts.bank}</td>
                                <td>{this.dateFormate(accounts)}</td>

                            </tr>

                        })
                        }
                        </tbody>
                    </table>

                </div>

            )

        }
        else {
            return <h1>Not Authorised</h1>
        }
    }


    render(){
        console.log(this.props.UserAccounts);
        let ID = this.props.params.id;
        let ProjectsUrl =  `/Projects/${ID}`;
        let TransactionsUrl =  `/Transactions/${ID}`;
        let CategoriesUrl =  `/Categories/${ID}`;
        let AccountsUrl =  `/Accounts/${ID}`;
        return(
            <div>
                <header>
                    <h2>Accounts</h2>
                </header>
                <nav className="side-nav">
                    <Link to={ProjectsUrl}><i className="fa fa-briefcase"></i>Projects</Link>
                    <Link to={TransactionsUrl}><i className="fa fa-usd"></i>Transactions</Link>
                    <Link to={CategoriesUrl}><i className="fa fa-th"></i>Categories</Link>
                    <Link to={AccountsUrl}><i className="fa fa-university"></i>Accounts</Link>
                </nav>
                {this.getUserAccounts()}
            </div>
        )
    }
}

export default createContainer( (props)=>{
Meteor.subscribe('accounts',props.params.id)
    return{
    UserAccounts : Accounts.find({owner: props.params.id}).fetch()
    }
},Account)