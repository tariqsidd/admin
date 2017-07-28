import  React from 'react';
import {createContainer} from 'meteor/react-meteor-data';


export class App extends React.Component{

    render(){
        return(
            <div>
                <h1>user profile</h1>

            </div>
        )
    }
}
export default createContainer( ()=>{
    return{
        user: Meteor.user()
    }
},App)