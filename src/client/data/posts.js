Posts = new Meteor.Collection("posts");

Meteor.subscribe("all-posts", function(){});
Meteor.subscribe("userData");

Posts.createPost = function(onCreated){
	var post = {
		title : "",
		content : "",
		live: false,
		createdAt: new Date(),
		lastSavedAt: new Date()
	};
	Posts.insert(post, function(error, id){
		if (onCreated)
			onCreated(id);
	});
};

Posts.setLive = function(id, isLive){
	var update = {
		$set : { 
			live : isLive
		}
	};
	Posts.update(id, update, handleResult());
}

Posts.savePost = function(id, title, content, onSaved){
	console.log(content);
	var update = { 
		$set : { 
			title : title , 
			content : content, 
			lastSavedAt : new Date() 
		} 
	};
  	Posts.update(id, update, handleResult(onSaved));
};

Posts.deletePost = function(id){
	Posts.remove(id, function(err){
     	handleResult()
    });
}

var handleResult = function(continueWith){
	return function(error, affected){
		if (error){
			alert("FAILED TO SYNC");
			console.log(error);
		}

		if (affected){
			console.log("Sync'd succesfully");
			console.log(affected);
		}

		if (continueWith)
			continueWith();
	};
}
