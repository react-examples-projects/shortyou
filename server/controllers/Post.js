const { PostModel } = require("../models");
const { success, error } = require("../helpers/httpResponses");
const { uploadPostToCloudinary } = require("../helpers/cloudinary");
const { isFileTooLarge, isNotValidFileType } = require("../helpers/utils");

class PostController {
  async getAll(req, res, next) {
    try {
      const posts = await PostModel.find({})
        .sort({ createdAt: -1 })
        .select("-folder -fps -duration -updatedAt -__v")
        .lean();
      success(res, posts);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const { name, data: videoBuffer, size, mimetype } = req.files.file;

      if (isNotValidFileType(mimetype)) {
        return error(res, {
          message: "Video type is invalid o not allowed, check the mime-type",
        });
      }

      if (isFileTooLarge(size)) {
        return error(res, {
          message:
            "Video is too long to processing it, the maximum size is 10mb",
        });
      }

      const { title, description, tags, ...body } = req.body;

      const { video, thumbail, original } = await uploadPostToCloudinary(
        videoBuffer,
        body.original
      );
      const {
        asset_id,
        public_id,
        secure_url,
        folder,
        frame_rate,
        duration,
        width,
        height,
        ...args
      } = video;

      const post = new PostModel({
        title,
        description,
        tags,
        preview: {
          thumbail: {
            width: thumbail.width,
            height: thumbail.height,
            url: thumbail.secure_url,
          },
          original: {
            width: original.width,
            height: original.height,
            url: original.secure_url,
          },
        },
        assetId: asset_id,
        publicId: public_id,
        url: secure_url,
        folder,
        fps: frame_rate,
        duration,
        mimetype,
        width,
        height,
      });

      const out = await post.save();
      success(res, out, 201);
    } catch (err) {
      next(err);
    }
  }
}

const controller = new PostController();
module.exports = controller;
