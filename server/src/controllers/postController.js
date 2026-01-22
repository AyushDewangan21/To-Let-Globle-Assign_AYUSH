const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const post = await Post.create({
    ...req.body,
    username: req.user.username,
    authorId: req.user.id,
  });
  res.status(201).json(post);
};

exports.getPosts = async (req, res) => {
  const { search = "", page = 1, limit = 5 } = req.query;

  const query = {
    $or: [
      { title: new RegExp(search, "i") },
      { username: new RegExp(search, "i") },
    ],
  };

  const posts = await Post.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(posts);
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.authorId.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  Object.assign(post, req.body);
  await post.save();
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.authorId.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  await post.deleteOne();
  res.json({ message: "Post deleted" });
};
