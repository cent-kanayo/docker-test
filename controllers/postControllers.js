const Post = require("../models/postSchema");

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    console.log("hello");
    res.status(200).json({
      status: "success",
      nbHits: posts.length,
      result: posts,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      result: [],
    });
    console.log(error);
  }
};

exports.getSinglePost = async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    res.status(200).json({
      status: "success",
      result: posts,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      result: [],
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const posts = await Post.create(req.body);
    res.status(201).json({
      status: "success",
      result: posts,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      result: [],
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      result: posts,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      result: [],
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const posts = await Post.findByIdAndRemove(req.params.id);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      result: [],
    });
  }
};
