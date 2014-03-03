Template.autoSave.lastSavedAt = function(){
  return Posts.findOne(Session.get("editing")).lastSavedAt; 
};

Template.autoSave.isSaving = function(){
  return session.get("autoSave.isSaving");
};