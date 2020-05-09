import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  var username = 'uname@gmail.com';
    var password = 'passwd';
    var server = 'smtp.gmail.com';
    var port = '465';

    process.env.MAIL_URL = 'smtps://' +
        encodeURIComponent(username) + ':' +
        encodeURIComponent(password) + '@' +
        encodeURIComponent(server) + ':' + port;

    // 2. Format the email
    //-- Set the from address
    Accounts.emailTemplates.from = 'noreply@test.com';

    //-- Application name
    Accounts.emailTemplates.siteName = 'testSite';

});

Meteor.methods({
  sendEmail(to, subject, text) {
    // Make sure that all arguments are strings.
    // check([to, subject, text], [String]);

    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    console.log('sending email');
    const from = "noreply@test.com";
    Email.send({ to , from , subject, text });
  },

  generatePdf(){
    // var webshot = Meteor.npmRequire('webshot');
      // var fs      = Npm.require('fs');
      var Future = Npm.require('fibers/future');
 
      var fut = new Future();
 
      var fileName = "pokemon-report.pdf";
 
      // GENERATE HTML STRING
      // var css = Assets.getText('main.css');
 
      SSR.compileTemplate('hello', Assets.getText('index.html'));
 
      Template.layout.helpers({
        getDocType: function() {
          return "<!DOCTYPE html>";
        }
      });
 
      SSR.compileTemplate('hello', Assets.getText('main.html'));
 
      // PREPARE DATA
      var data = {
        test: {uname:'123'}
      }
 
      var html_string = SSR.render('layout', {
      
        template: "hello",
        data: data
      });
 
      console.log(html_string);
    }

});
