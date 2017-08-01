import React, {Component} from 'react';
import moment from 'moment';
import {Link} from 'react-router'
import {createContainer} from 'meteor/react-meteor-data';
import {Projects} from '/imports/projects'
import AccountUi from './AccountUi'
class ProjectsPage extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    dateFormate(userProjects) {
        return moment (userProjects.startAt).format('YYYY-MM-DD');
    }

    currentUser(){
        return Meteor.user();
    }
    removeProject(id){
        Meteor.call('deleteProjects', id);
    }

    getUserProject(){
        console.log(this.props.userProjects)
        let ID = this.props.params.id;
        let projectEditUrl =  `/Edit/${ID}`;
        if(this.currentUser() && this.currentUser().roles && this.currentUser().roles.includes("admin")){
            return (<div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Client Name</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>

                        {this.props.userProjects.map((project, i) => {

                            return (
                                <tr key={i}>
                                    <td>{project.name}</td>
                                    <td>{project.client.name}</td>
                                    <td>{project.status}</td>
                                    <td>{project.amount}</td>
                                    <td>{this.dateFormate(project)}</td>
                                    <td><a href="#"><i className="fa fa-trash" onClick={this.removeProject.bind(this)}></i></a></td>
                                    <td><Link to = {`Edit/${project._id}`}><i className="fa fa-pencil"></i></Link></td>
                                </tr>)

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
        let ID = this.props.params.id;
        let ProjectsUrl =  `/Projects/${ID}`;
        let TransactionsUrl =  `/Transactions/${ID}`;
        let CategoriesUrl =  `/Categories/${ID}`;
        let AccountsUrl =  `/Accounts/${ID}`;


        return(

            <div>
                <header>
                    <h2>Projects</h2>
                    <nav>
                        <Link to="AllUsers">Users</Link>
                        <AccountUi />
                    </nav>
                </header>
                <nav className="side-nav">
                    <Link to={ProjectsUrl}><i className="fa fa-briefcase"></i>Projects</Link>
                    <Link to={TransactionsUrl}><i className="fa fa-usd"></i>Transactions</Link>
                    <Link to={CategoriesUrl}><i className="fa fa-th"></i>Categories</Link>
                    <Link to={AccountsUrl}><i className="fa fa-university"></i>Accounts</Link>


                </nav>
                {this.getUserProject()}
            </div>
        )
    }
}

export default createContainer( (props)=>{
Meteor.subscribe('projects',props.params.id )
    return{
       userProjects: Projects.find({owner: props.params.id}).fetch()
    }
},ProjectsPage)