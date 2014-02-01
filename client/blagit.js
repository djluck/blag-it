Posts = new Meteor.Collection("posts");

Meteor.subscribe("all-posts", function(){
  //alert(Posts.find().fetch().length);
});

Meteor.subscribe("userData");

Template.posts.posts = function(){
  return Posts.find().fetch();
};

Template.posts.events({
  "click .btn-delete-post" : function(event){
    Posts.remove(this._id, function(err){
     console.log(err); 
    });
  }
});

Handlebars.registerHelper("isAdmin", function(){
  var user = Meteor.user();
  return user !== null && user.isAdmin;
});

$(function(){
  console.log("RUNNING");
console.log($("#btn-create-post"));
  $("#btn-create-post").click(function(event){
    console.log("HIHI");
    var post = {
      title : "",
      content : "",
      live: false,
      createdAt: new Date(),
      lastSavedAt: new Date()
    };
    console.log(post);
    Posts.insert(post);

    event.preventDefault();
  });

});
