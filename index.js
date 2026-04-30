import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set EJS
app.set("view engine", "ejs");

let posts = [];

// Basic route
app.get("/", (req, res) => {
  const blogTitle = "Ink & Ideas ✍️";
  const tagline = "Your thoughts. Your stories. Your space.";

  res.render("index", {
    title: blogTitle,
    tagline: tagline,
    posts: posts
  });
});

// New route - Create Post Page
app.get("/create", (req, res) => {
  res.render("create", {
    pageTitle: "Create a New Post"
  });
});

app.post("/create", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const newPost = {
    title: title,
    content: content
  };

  posts.push(newPost);

  res.redirect("/");
});

app.post("/delete/:index", (req, res) => {
  const index = req.params.index;

  posts.splice(index, 1);

  res.redirect("/");
});

app.get("/edit/:index", (req, res) => {
  const index = req.params.index;

  res.render("edit", {
    post: posts[index],
    index: index
  });
});

app.post("/edit/:index", (req, res) => {
  const index = req.params.index;

  posts[index].title = req.body.title;
  posts[index].content = req.body.content;

  res.redirect("/");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});