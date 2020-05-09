import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  const self = this;
  this.COUNTERTIME = 1*10*1000;
  this.counter = new ReactiveVar(this.COUNTERTIME);
  this.dataToSave ="test";
  this.counterVar;
  // this.counter = COUNTERTIME;

  this.sendEmail = function(emailId){
    Meteor.call("sendEmail", emailId, "test", "testMail", (err, res)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log('success', res);
      }
    });
  }

  this.reduceTime = function(){
    self.counter.set(self.counter.get()-1000);
    if(self.counter.get()<=0){
      self.counter.set(0);
      clearInterval(self.testInterval);
      //save data to pdf
      //send email
      self.sendEmail(Meteor.user().emails[0].address);
    }
  }

  self.testInterval = setInterval(this.reduceTime, 1000);

});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get()/1000;
  },

  loggedIn(){
    return MediaStreamError.userId();
  }
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    clearTimeout(instance.counterVar);
    instance.counter.set(instance.COUNTERTIME);
    clearInterval(instance.testInterval);
    instance.testInterval = setInterval(instance.reduceTime, 1000);
  },
});
