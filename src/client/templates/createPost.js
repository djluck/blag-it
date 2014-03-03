Template.createPost.events({
  "click #btn-create-post" : function(event){
    Posts.createPost(editOrFinishEditingPost);
  }
});