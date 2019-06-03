const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

router.post("/", [auth, check("text").exists()], async (req, res) => {
  console.log("USER ID" + req.person.id);
  const user = await User.findOne({ _id: req.person.id });
  console.log("NAME:" + user.name);
  try {
    if (!user) {
      console.log("No user");
      return res.json({ msg: "No user" });
    } else {
      console.log("USER:" + JSON.stringify(user));
      const newPost = new Post({
        user_id: req.person.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      });
      await newPost.save();
      return res.json(newPost);
    }
  } catch (error) {
    console.log("Failed to create post");
    return res.json({ msg: "Failed to create post" });
  }
});

//get all posts
router.get("/", auth, async (req, res) => {
  try {
    console.log("begin to get all posts");
    const posts = await Post.find();
    return res.json(posts);
  } catch (err) {
    return res.json({ msg: "get posts failed" });
  }
});

//get post by id
router.get("/:post_id", auth, async (req, res) => {
  const post = await Post.findById(req.params.post_id);
  try {
    return res.json(post);
  } catch (error) {
    return res.json({ msg: "get wrong post" });
  }
});

//delete post by id
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    await post.remove();
    res.json({ msg: "Delete post ok" });
  } catch (error) {
    res.json({ msg: "Delete post not ok" });
  }
});

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user_id.toString() === req.person.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user_id: req.person.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user_id.toString() === req.person.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not been liked" });
    }

    const removeIndex = post.likes
      .map(like => like.user_id.toString())
      .indexOf(req.person.id);

    post.likes.splice(removeIndex, 1);
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/comment/:id",
  [auth, check("text").exists()],
  async (req, res) => {
    console.log("USER ID" + req.person.id);
    const user = await User.findOne({ _id: req.person.id });
    console.log("NAME:" + user.name);
    const post = await Post.findById(req.params.id);
    console.log("Post:" + JSON.stringify(post));
    try {
      if (!user) {
        console.log("No user");
        return res.json({ msg: "No user" });
      } else {
        console.log("USER:" + JSON.stringify(user));
        const newComment = {
          user_id: req.person.id,
          text: req.body.text,
          name: user.name,
          avatar: user.avatar
        };
        post.comments.unshift(newComment);
        await post.save();
        return res.json(post.comments);
      }
    } catch (error) {
      console.log("Failed to create comments");
      return res.json({ msg: "Failed to create comments" });
    }
  }
);
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check user
    if (comment.user_id.toString() !== req.person.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = post.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
