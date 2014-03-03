savePost = function(id, onSaved){
  	Posts.savePost(
  		id, 
	  	$("#title").val(),
	  	$("#wmd-input").val(),
	  	onSaved
  	);
};

editOrFinishEditingPost = function(postId){
  Session.setDefault("editing", null);
  var editing = Session.get("editing");

  //finish editing if in progress
  if (editing === postId){
    savePost(postId);
    Session.set("editing", null);
  }
  else{
  	Session.set("editing", postId);
    Deps.flush();
    var converter = Markdown.getSanitizingConverter();
    var editor = new Markdown.Editor(converter);
    editor.run();
  }
};