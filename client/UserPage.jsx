import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Link} from 'react-router'
import AccountUi from './AccountUi'
class UserPage extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
         // let projectNumber = this.props.projectNumber;
         console.log(this.props.projectNumber , 'Projects2');
         console.log(this.props.accountsNumber , 'Accounts');

        console.log(this.props.params.id, 'ID')
        console.log(this.props, 'params')
        console.log(this.props.userProfile)
        let ID = this.props.params.id;
        let ProjectsUrl =  `/Projects/${ID}`;
        let TransactionsUrl =  `/Transactions/${ID}`;
        let CategoriesUrl =  `/Categories/${ID}`;
        let AccountsUrl =  `/Accounts/${ID}`;
        return(
            <div>
                    <header>
                        <h2>{this.props.userProfile ? this.props.userProfile.profile.fullName: 'Not Found'}</h2>
                        <nav>
                            <Link to="AllUsers">Users</Link>
                            <AccountUi />
                        </nav>
                    </header>
                <nav className="side-nav">
                    <Link to={ProjectsUrl}><i className="fa fa-briefcase"></i>Projects <span className="Counter">{this.props.projectNumber}</span></Link>
                    <Link to={TransactionsUrl}><i className="fa fa-usd"></i>Transactions</Link>
                    <Link to={CategoriesUrl}><i className="fa fa-th"></i>Categories</Link>
                    <Link to={AccountsUrl}><i className="fa fa-university"></i>Accounts<span className="Counter">{this.props.accountsNumber}</span></Link>
                </nav>
                <div><h1>hello</h1></div>
            </div>
        )
    }
}

export default createContainer( (props)=>{
    Meteor.subscribe('projects',props.params.id )
    Meteor.subscribe('accounts',props.params.id )
    Meteor.subscribe('allUsers',{_id: props.params.id})
    const userProfile = Meteor.users.findOne({_id: props.params.id})
    console.log('found', userProfile)
    return{
        user: Meteor.user(),
        userProfile: userProfile,
        projectNumber: Counts.get('projectCounter'),
        accountsNumber: Counts.get('accountsCounter')
    }
},UserPage)