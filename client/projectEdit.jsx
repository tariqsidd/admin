import React, {Component} from 'react';
import moment from 'moment';
import {createContainer} from 'meteor/react-meteor-data';
import {Link} from 'react-router'
import {Projects} from '/imports/projects'
class projectEdit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            project: props.project
        }
    }
    dateFormate(project) {
        return moment (project.startAt).format('YYYY-MM-DD');
    }
    onChange(e){
        let { project } = this.state;
       project[e.target.name] = e.target.value
        this.setState([project]);
    }

    updateProject(event){
        let {project} = this.state
        delete project.client;
        Meteor.call('updateProject',this.state.project, (error, response)=>{
            if(error){console.log(error)}
            else {console.log(response)}
        });
        event.preventDefault()


    }

    render(){

        let{project}  = this.state
        let ID = this.props.params.id;
        let ProjectsUrl =  `/Projects/${ID}`;
        let TransactionsUrl =  `/Transactions/${ID}`;
        let CategoriesUrl =  `/Categories/${ID}`;
        let AccountsUrl =  `/Accounts/${ID}`;


        return(
            <div>
                <header>
                    <h2>Project Update</h2>
                </header>
                <nav className="side-nav">
                    <Link to={ProjectsUrl}><i className="fa fa-briefcase"></i>Projects</Link>
                    <Link to={TransactionsUrl}><i className="fa fa-usd"></i>Transactions</Link>
                    <Link to={CategoriesUrl}><i className="fa fa-th"></i>Categories</Link>
                    <Link to={AccountsUrl}><i className="fa fa-university"></i>Accounts</Link>
                </nav>
                <form className="form" onSubmit={this.updateProject.bind(this)}>
                    <input type="text" name="name" defaultValue={project.name} onChange={this.onChange.bind(this)} />
                    <input type="text" name="client.name" defaultValue={project.client.name} onChange={this.onChange.bind(this)}/>
                    <select name="status" defaultValue={project.status} onChange={this.onChange.bind(this)}>
                        <option value="progress">Progress</option>
                        <option value="waiting">Waiting</option>
                        <option value="completed">Completed</option>
                    </select>
                    <input type="number" name="amount" defaultValue={project.amount} onChange={this.onChange.bind(this)}/>
                    <input type="date" name="startAt" defaultValue={this.dateFormate(project)} onChange={this.onChange.bind(this)}/>
                    <button type="submit">Save</button>
                </form>
            </div>
        )
    }
}

export default createContainer( (props)=>{
    console.log(props.params.id)
    Meteor.subscribe('projects',props.params.id)
    let  project = Projects.findOne({_id: props.params.id})
    return{
        project
    }
},projectEdit)