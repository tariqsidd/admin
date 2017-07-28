import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Link} from 'react-router'
class Transactions extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        let ID = this.props.params.id;
        let ProjectsUrl =  `/Projects/${ID}`;
        let TransactionsUrl =  `/Transactions/${ID}`;
        let CategoriesUrl =  `/Categories/${ID}`;
        let AccountsUrl =  `/Accounts/${ID}`;
        return(
            <div>
                <header>
                    <h2>Transactions</h2>
                </header>
                <nav className="side-nav">
                    <Link to={ProjectsUrl}><i className="fa fa-briefcase"></i>Projects</Link>
                    <Link to={TransactionsUrl}><i className="fa fa-usd"></i>Transactions</Link>
                    <Link to={CategoriesUrl}><i className="fa fa-th"></i>Categories</Link>
                    <Link to={AccountsUrl}><i className="fa fa-university"></i>Accounts</Link>
                </nav>
            </div>
        )
    }
}

export default createContainer( (props)=>{

    return{}
},Transactions)