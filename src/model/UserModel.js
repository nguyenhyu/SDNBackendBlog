import mongoose, { Schema } from "mongoose";

const user = mongoose.model(
  "user",
  new Schema({
    id: { type: ObjectID },
    usename: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 1 && value.length < 20,
        message: "Use-name must greater than 1 characters and less than 20 characters",
      },
    },
    gmail: {
      type: String,
      required: true,
      validate: {
        validator: (value) => isEmail(value),
      },
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    ListFavBlog: {
      type: Array,
    },
    ListOwnBlog: {
      type: Array,
    },
    RoleID: {
      type: String,
      required: true,
    },
    Status: {
      type: Boolean,
      required: true,
    },
    TopicManageAssign: {
      type: Array,
    },
  })
);

export default user;
