isAdmin = function(user){
  return user != null && user.isAdmin;
}

Handlebars.registerHelper("isAdmin", function(){
  var user = Meteor.user();
  return isAdmin(user);
});

