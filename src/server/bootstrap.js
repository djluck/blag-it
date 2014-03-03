Meteor.startup(function () {
  console.log("Bootstrapping..");
  var postCount = Posts.find().count();
  console.log("There are " + postCount + " posts currently in the DB");

  if (postCount === 0) {
    console.log("No posts present. Creating test post.");
    Posts.insert({ title: "Test post", content: "This is some lovely test content. *Marvellous*."});
  }
});
