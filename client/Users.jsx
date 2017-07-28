import React, {Component} from 'react';
import {Link} from 'react-router'
import { ReactiveVar } from 'meteor/reactive-var';
import {createContainer} from 'meteor/react-meteor-data';
import moment from 'moment';
const RecordPerPage = 8
let PageNumber = new ReactiveVar(1)
let pageNavigator = new ReactiveVar(0)

let  user = Meteor.userId();
let query = new ReactiveVar({_id: {$ne: user}})

class AllUsers extends Component{

    constructor(props) {
        console.log(props,"alart")
        super(props);
        this.state = {

        };

    }



    currentUser(){
        return Meteor.user();
    }

    dateFormate(users) {
    return moment (users.createdAt).format('MMMM D YYYY');
}
    loadMore(number){
        PageNumber.set(number)
        if (number > 1){
            pageNavigator.set((number * RecordPerPage) - RecordPerPage)

        }
        else{
            pageNavigator.set(0)
        }
}

getUser(){
        if(this.currentUser() && this.currentUser().roles && this.currentUser().roles.includes("admin")){
            //console.log("this.props.users", this.props.users);
            return (<div>
                    <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Emails/User names</th>
                    <th>Created At</th>
                </tr>
                </thead>
                <tbody>
                {this.props.users.map((users, i) => {
                    {/*let url =  "AllUsers/UserPage/" + users._id;*/}
                    let url =  `/UserPage/${users._id}`;
                        return <tr key={i}>
                            <td><Link to={url}>{users._id}</Link></td>
                            <td>{users.emails ? users.emails[0].address : users.username}</td>
                            <td>{this.dateFormate(users)}</td>
                            <td><a href="#"><i className="fa fa-trash" onClick={this.removeUser.bind(this)}></i></a>
                            </td>
                            <td><Link to={url}><i className="fa fa-id-card-o"></i></Link></td>
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

    removeUser(){
        Meteor.call('deleteUser', Meteor.users._id);
    }

    onChange(e){
            var OldQuery = query.get()
            this.setState({[e.target.name]: e.target.value})
            let userFilter = e.target.value;
            if(!userFilter){
                delete OldQuery.username
            }
            else {
                //console.log(OldQuery.username,'oldquery' )
                OldQuery.username = {$regex: `${userFilter}.*`}
                PageNumber.set(1)
                pageNavigator.set(0)
            }
            query.set(OldQuery)
    }
onChangeByEmails(e){

    var OldQuery = query.get()
    this.setState({[e.target.name]: e.target.value})
    let userFilter = e.target.value;
    if(!userFilter){
        delete OldQuery['emails.address']
    }
    else {
        //console.log(OldQuery.emails.address,'oldquery' )
        OldQuery['emails.address'] = {$regex: `${userFilter}.*`}
        PageNumber.set(1)
        pageNavigator.set(0)
    }
    query.set(OldQuery)
}
    render() {
        console.log( Counts.get('userCounter'), 'tariq');
        const pageNumber = [];

        for (let i=1; i<= Math.ceil(Counts.get('userCounter')/RecordPerPage); i++){
            pageNumber.push(i);
        }

        const renderPageNumber = pageNumber.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.loadMore.bind(this, number)}
                >
                    {number}
                </li>
            );
        });

        for(var i=0; i< this.props.users.length; i++){
            Meteor.users._id=this.props.users[i]._id;
        }

        return(
            <div>
                <input type="text" name= "UserName" placeholder="Search by Username" onChange={this.onChange.bind(this)}/>
                <input type="text" name="Email" placeholder="Search by Email" onChange={this.onChangeByEmails.bind(this)}/>
                {this.getUser()}
                <ul id="page-numbers">
                {renderPageNumber}
                </ul>

            </div>
        )
    }
}

export default createContainer( ()=>{
//console.log(query.get(),"query.get");
//console.log(pageNavigator.get(),"PNG");
let object = {limit: RecordPerPage, skip:pageNavigator.get()}
    Meteor.subscribe('allUsers',query.get(), object );
//console.log(query.get().username,'qurey')
    return{
        users: Meteor.users.find(query.get()).fetch()

    }



},AllUsers)

  