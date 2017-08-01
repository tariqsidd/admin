import { Counts } from 'meteor/tmeasday:publish-counts';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import {Projects} from '../imports/projects.js'
import {Accounts} from '../imports/accounts'

Meteor.publish('allUsers', function(query,obj){
    let limit = 8, skip = 0;
    if (obj){
        limit = obj.limit
        skip = obj.skip
    }

    new SimpleSchema({
       limit:{type: Number},
       skip:{type: Number},
    }).validate({limit: limit, skip: skip})
    if(Roles.userIsInRole(this.userId, 'admin')) {
        Counts.publish(this, 'userCounter', Meteor.users.find(query));
        return Meteor.users.find(query,{ limit: limit, skip: skip});
    }
});

Meteor.publish('projects', function(id) {
    Counts.publish(this, 'projectCounter', Projects.find({owner: id}));
    return Projects.find({owner: id})
});
Meteor.publish('accounts', function(id) {
    Counts.publish(this, 'accountsCounter', Accounts.find({owner: id}));
    return Accounts.find({owner: id})
});


