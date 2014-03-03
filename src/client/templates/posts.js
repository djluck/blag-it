Template.posts.posts = function(){
  return Posts.find({}, { sort : [["createdAt", "desc"]] }).fetch();
};

Template.posts.showPost = function(){
  return isAdmin(Meteor.user()) || this.live;
}

Template.posts.events({
  "click .btn-delete-post" : function(event){
    Posts.deletePost(this._id);
  },
  "click .btn-toggle-live" : function(event){
    Posts.setLive(this._id, !this.live);
  },
  "click .btn-edit-post": function(event, template){
    console.log(this);
    editOrFinishEditingPost(this._id);
  }
});



