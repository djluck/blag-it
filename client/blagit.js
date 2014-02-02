Posts = new Meteor.Collection("posts");

Meteor.subscribe("all-posts", function(){
  //alert(Posts.find().fetch().length);
});

Meteor.subscribe("userData");

Template.posts.posts = function(){
  return Posts.find({}, { sort : [["createdAt", "desc"]] }).fetch();
};

Template.posts.showPost = function(){
  console.log(this.live);
  return isAdmin(Meteor.user()) || this.live;
}

Template.post.btnToggleLiveClass = function(){
  return this.live ? "btn-success" : "btn-danger";
};

Template.post.isBeingEdited = function(){
  var currentlyEditingId = Session.get("editing");
   
  return currentlyEditingId !== null && currentlyEditingId === this._id;;
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
    setPostAsEditing(this._id);
  }
});

Template.post.events({
  "keydown .post-content" : function(event){
    startAutoSave(this);
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
    
    if (currentlyEditing === null){
      Session.set("editing", id);
    }
    else{
      Session.set("editing", null);
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

var autoSaveTimer = null;
var startAutoSave = function(post){
  if (autoSaveTimer !== null){
    return;
  }
  autoSaveTimer = Meteor.setTimeout(function(){
    Meteor.clearTimeout(autoSaveTimer);
    autoSaveTimer = null;
    Session.set("autoSave.isSaving", true);
    Posts.update(post._id, {
      $set : { title : $("#title").val() , content : $("#content").val(), lastSavedAt : new Date() }
    }, function(error){
      Session.set("autoSave.isSaving", false);
    });
  }, 3000);
};


Template.autoSave.lastSavedAt = function(){
  return Posts.findOne(Session.get("editing")).lastSavedAt; 
};

Template.autoSave.isSaving = function(){
  return session.get("autoSave.isSaving");
};
