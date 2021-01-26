//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();


const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const contactContent = "If you would like to see further work I have done or contact me, please follow the links below.";


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb+srv://a-read1:test123@cluster0.1wro8.mongodb.net/blogDB", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const postSchema = {
  title: String,
  content: String,

};

const Post = mongoose.model("Post", postSchema);


app.get("/", (req, res) => {

  Post.find({}, (err, posts) => {

      res.render("home", {
        posts: posts
      });
 

  });

});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
   
  });

  post.save((err) => {

      if (!err) {

        res.redirect("/");
      }

    });

});

app.get("/posts/:postTitle", (req, res) => {

  const requestedPostTitle = req.params.postTitle;

  Post.findOne({ title: requestedPostTitle }, function (err, post) {

    res.render("post", {
      title: post.title,
      content: post.content
      
    });
  });

});


app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log("Server has started successfully.");
});
