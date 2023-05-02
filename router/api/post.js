const express = require("express");
const { body, validationResult } = require("express-validator");
const auth = require("../../middlwere/auth");
const Profile = require("../../model/Profile");
const User = require("../../model/Users");
const Post = require("../../model/Post");

const router = express.Router();
//post api/post
//create post
//access private
router.post(
  "/",
  auth,
  [body("text", "text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("serveur error");
    }
  }
);
//get api/posts
//get all post
//access private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("serveur error");
  }
});
//get api/post/:id
//get post by id
//access private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.find(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    // if(error.kind==='ObjectId'){
    //     return res.status(404).json({msg:'post not found'})
    // }
    res.status(500).send("serveur error");
  }
});
//delete api/posts/:id
//delete post
//access private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    // if (!post) {
    //   return res.status(404).json({ msg: "post not found" });
    // }
    // // chek user
    // if (post.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: "User not authorized" });
    // }
    // await post.findByIda();
    res.status(200).send("post removed")
  } catch (error) {
    console.error(error.message);
    if(error.kind==='ObjectId'){
        return res.status(404).json({msg:'post not found'})
    }
    res.status(500).send("serveur error");
  }
});
//put api/posts/likes/:id
//like a post
//access private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //chek if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "post already liked" });
    }else{
      post.likes.unshift({ user: req.user.id });
      await post.save();
      res.json(post.likes);
    }
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error);
  }
});
//put api/posts/unlikes/:id
//unlike a post
//access private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //chek if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "post has not yet been liked " });
    }
    //  get remove index
    const removeIndex = post.likes
      .map((e) => e.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("serveur error");
  }
});
//post api/posts/comments/:id
//create comment on a post
//access private
router.post(
  "/comment/:id",
  auth,
  [body("text", "text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("serveur error");
    }
  }
);
//delete api/posts/comments/:id/:commet_id
//create delete comment
//access private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    //make sure comments exists
    if (!comment) {
      return res.status(404).json({ msg: "comment does not exist" });
    }
    //check of user
    if (comment.user.toString() !== req.params.id) {
      return res.status(401).json({ msg: "user not authorized" });
    }
    //  get remove index
    const removeIndex = post.comments
      .map((e) => e.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("serveur error");
  }
});
module.exports = router;
