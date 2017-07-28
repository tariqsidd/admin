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
            project: {name: '', status:'',amount:'',statedAt: '', client: { name: ''}}
        };
    }

    update(project){
        console.log(project)
        this.setState({project})

    }
    onSubmit(){
        this.updateProject()
    }

    updateProject(){
        const {_id, name, clientName,  amount, status, startAt} = this.state;
        Meteor.call('projects.update', {
            project: {
                _id,
                name,
                client: {
                    name: clientName
                },

                amount: Number(amount),
                status,
                startAt
            }
        }, (err, response) => {
            if(err){
                this.setState({
                    active: true,
                    barMessage: err.reason,
                    barIcon: 'error_outline',
                    barType: 'cancel'
                });
            }else{
                this.setState({
                    active: true,
                    barMessage: 'Project updated successfully',
                    barIcon: 'done',
                    barType: 'accept'
                });
                this.props.closePopup();
            }
            this.setState({loading: false})
        });
    }

    onChange(val, e){
        let label = val.target.name
        console.log(label)
        this.setState({[label]: val});
        console.log(label)
        console.log(val)
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
                                    <td><a href="#"><i className="fa fa-pencil " data-toggle="modal" data-target="#myModalHorizontal" onClick={this.update.bind(this,project)}></i></a></td>
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
        console.log(this.state.project)
        console.log(this.state.project.name)
         let{ project } = this.state
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

                <div className="modal fade" id="myModalHorizontal" tabIndex="-1" role="dialog"
                     aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close"
                                        data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                    <span className="sr-only">Close</span>
                                </button>
                                <h4 className="project-update" id="myprojectUpdate">
                                    Project Update from
                                </h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal" role="form" onSubmit={this.onSubmit.bind(this)}>
                                    <div className="form-group">
                                        <label  className="col-sm-2 control-label">Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="name"
                                                   id="inputName3" placeholder="Name" value={ project.name} onChange={this.onChange.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label  className="col-sm-2 control-label">Client Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="client.name"
                                                   id="inputClientName3" placeholder="Client Name" value={ project.client.name} onChange={this.onChange.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label  className="col-sm-2 control-label">Status</label>
                                        <div className="col-sm-10">
                                            <select type="text" className="form-control" name="status"
                                                   id="inputStatus3" placeholder="Status" value={ project.status} onChange={this.onChange.bind(this)}>
                                                <option value="progress">Progress</option>
                                                <option value="waiting">Waiting</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label  className="col-sm-2 control-label">Amount</label>
                                        <div className="col-sm-10">
                                            <input type="number" className="form-control" name="amount"
                                                   id="inputAmount3" placeholder="Amount" value={ project.amount} onChange={this.onChange.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label  className="col-sm-2 control-label">Date</label>
                                        <div className="col-sm-10">
                                            <input type="date" className="form-control" name="startedAt"
                                                   id="inputDate3" placeholder="Date" value={this.dateFormate(project)} onChange={this.onChange.bind(this)}/>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-default"
                                                data-dismiss="modal">
                                            Close
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Save Updates
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
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