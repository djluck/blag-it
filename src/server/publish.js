Posts = new Meteor.Collection("posts");

Meteor.publish('all-posts', function () {
  var opts = {
    sort : [["createdAt", "desc"]]
  };
  return Posts.find({}, opts);
});

Meteor.publish("userData", function(){
  return Meteor.users.find({_id: this.userId}, {
    fields :{
      "isAdmin" : 1
    } 
  });
});

Posts.allow({
  insert : function(uId, post) { return canPost(uId, post) },
  remove : function(uId, post) { return canPost(uId, post) },
  update : function(uId, post) { return canPost(uId, post) } 
});

var canPost = function(userId, post){
  console.log("HIHI" + userId);
  if (userId < 1){
    return false;
  }
  var user = Meteor.users.findOne(userId);
  return user !== null && user.isAdmin;
}

var isItMe = function(user){
  var email = user.services.google.email;
  console.log("Email is " + email);
  return email === "djluck20@googlemail.com";
}

Accounts.onCreateUser(function(options, user){
  user.isAdmin = isItMe(user);
  return user;
});
