import { validationResult } from "express-validator";
import blog from "../model/BlogModel.js";
import BlogRepository from "../repository/BlogRepository.js";

class blogController {
  async createBlog(req, res ) {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const { Title, Content, TopicID } = req.body;
    const Userid = req.user.data._id;
    const BlogId = req.body.blogId;

    try {
      var messages;
      var blog;
      if (BlogId) {
        blog = await BlogRepository.updateBlog({ Title, Content, TopicID, BlogId });
        messages = "Blog has been updated successfully, please create publish request"
      } else {
        blog = await BlogRepository.createBlog({ Title, Content, TopicID, Userid });
        messages = "New blog has been created successfully, please create publish request"
      }
      res.status(200).json({
        message: messages,
        data: blog,
      });
    } catch (error) { 
      res.status(500).json({ message: error.toString() });
    }
  }
  async getBlogDetail(req, res) {
    const blogId = req.params.id;
    try {
      const blogDetail = await blog.findById(blogId).exec();
      if (blogDetail) {
        res.status(500).json({ message: "Blog isn't exist" });
      }
      const roleVertify =
        blogDetail.PublicStatus === true ||
        blogDetail.UserOwnerID === req.user.id ||
        req.user.role === process.env.ROLE_ADMIN ||
        req.user.role === process.env.ROLE_CONTENT_MANAGER;
      if (roleVertify) {
        res.status(200).json({
          data: blogDetail,
        });
      }
      res.status(500).json({
        message: "Invalid permissions to access",
      });
    } catch (error) {
      res.status(500).json({ message: error.toString() });
    }
  }
}
export default new blogController();
