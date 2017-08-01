import {Projects} from '../imports/projects'

Meteor.methods({
    deleteUser(id)
    {
        Meteor.users.remove(id)
    },
    deleteProjects(id){
        Projects.remove(id)
    },
    updateProject(project){
        const {_id} = project;
        return Projects.update(_id, {$set: project});
    }
});