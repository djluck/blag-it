Template.post.btnToggleLiveClass = function(){
  return this.live ? "btn-success" : "btn-danger";
};

Template.post.isBeingEdited = function(){
  var currentlyEditingId = Session.get("editing");
   
  return currentlyEditingId !== null && currentlyEditingId === this._id;;
}

Template.post.events({
  "keydown .post-content" : function(event){
    //startAutoSave(this);
  }
});

var autoSaveTimer = null;
var startAutoSave = function(post){
  if (autoSaveTimer !== null){
    return;
  }

  autoSaveTimer = Meteor.setTimeout(function(){
    Meteor.clearTimeout(autoSaveTimer);
    savePost(post._id, function(){
      Session.set("autoSave.isSaving", false);
      autoSaveTimer = null;
    });
    Session.set("autoSave.isSaving", true);
  }, 3000);
};
