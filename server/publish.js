Posts = new Meteor.Collection("posts");

Meteor.publish('all-posts', function () {
  console.log("Found " + Posts.find().count() + " posts in all-posts");
  return Posts.find();
});

Meteor.publish("userData", function(){
  return Meteor.users.find({_id: this.userId}, {
    fields :{
      "isAdmin" : 1
    } 
  });
});

Posts.allow({
  insert: function(userId, post){
    return isItMe(userId);
  },
  remove : function(userId, post){
    return isItMe(userId);
  }
});

var isItMe = function(userId){
  if (userId === null) return false;

  var user = Meteor.users.findOne({_id : userId})
  var email = user.services.google.email;
  console.log("Email is " + email);
  return email === "djluck20@googlemail.com";
}

