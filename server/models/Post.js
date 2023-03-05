const { model, Schema } = require("mongoose");

const PreviewImageSchema = new Schema(
  {
    width: Number,
    height: Number,
    url: String,
  },
  {
    _id: false,
  }
);

const PreviewSchema = new Schema(
  {
    thumbail: {
      type: PreviewImageSchema,
    },
    original: {
      type: PreviewImageSchema,
    },
  },
  {
    _id: false,
  }
);

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The title field is required"],
      maxlength: [200, "The maximun title length is 200"],
      trim: true,
    },
    description: {
      type: String,
      maxlength: [1000, "The maximun description length is 1000"],
      trim: true,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    width: {
      type: Number,
      required: [true, "The width is required"],
    },
    height: {
      type: Number,
      required: [true, "The height is required"],
    },
    preview: {
      type: PreviewSchema,
      required: [true, "preview thumbails is required"],
    },
    assetId: {
      type: String,
      required: [true, "The asset id is required"],
    },
    publicId: {
      type: String,
      required: [true, "The public id is required"],
    },
    url: {
      type: String,
      required: [true, "The url is required"],
    },
    folder: {
      type: String,
      required: [true, "The folder is required"],
    },
    fps: {
      type: Number,
      required: [true, "The fps is required"],
    },
    duration: {
      type: Number,
      required: [true, "The duration is required"],
    },
    mimetype: {
      type: String,
      required: [true, "The mime-type is required"],
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = model("Post", PostSchema, "posts");
module.exports = PostModel;
