Posts = new Meteor.Collection("posts");

Meteor.subscribe("all-posts", function(){
  //alert(Posts.find().fetch().length);
});

Meteor.subscribe("userData");

Template.posts.posts = function(){
  return Posts.find().fetch();
};

Template.posts.showPost = function(){
  console.log(this.live);
  return isAdmin(Meteor.user()) || this.live;
}

Template.post.btnToggleLiveClass = function(){
  return this.live ? "btn-success" : "btn-danger";
};

Template.post.isBeingEdited = function(){
  return this.edited;
}

Template.posts.events({
  "click .btn-delete-post" : function(event){
    Posts.remove(this._id, function(err){
     console.log(err); 
    });
  },
  "click .btn-toggle-live" : function(event){
    Posts.update(this._id, {
      $set : { live : !this.live }
    }, function(err){
     console.log(err); 
    });
  },
  "click .btn-edit-post": function(event){
    this.edited = true;
    setPostAsEditing(this._id);
  }
});

Handlebars.registerHelper("isAdmin", function(){
  var user = Meteor.user();
  return isAdmin(user);
});

var isAdmin = function(user){
  return user != null && user.isAdmin;
}

var setPostAsEditing = function(id){
    Session.setDefault("editing", null);
    var currentlyEditing = Session.get("editing");
    
    if (currentlyEditing !== null){
      Session.set("editing", null);
    }
    else{
      Session.set("editing", id);
    }
};

Template.createPost.events({
  "click #btn-create-post" : function(event){
     var post = {
      title : "",
      content : "",
      live: false,
      createdAt: new Date(),
      lastSavedAt: new Date()
    };
    Posts.insert(post, function(error, id){
      setPostAsEditing(id);
    });
  }
});

var startAutoSave = function(){

};
