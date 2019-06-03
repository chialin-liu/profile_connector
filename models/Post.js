const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User_from_Model"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user_id: {
        type: Schema.Types.ObjectId,
        ref: "User_from_Model"
      }
    }
  ],
  comments: [
    {
      user_id: {
        type: Schema.Types.ObjectId,
        ref: "User_from_Model"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("Post", PostSchema);
