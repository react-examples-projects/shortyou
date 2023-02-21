const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

function uploadVideo(videoBuffer) {
  return new Promise((resolve, reject) => {
    const streamUpload = cloudinary.uploader.upload_stream(
      { folder: "hackatoon_cloudinary/videos", resource_type: "video" },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    streamifier.createReadStream(videoBuffer).pipe(streamUpload);
  });
}

async function uploadThumbail(thumbail) {
  const res = await cloudinary.uploader.upload(thumbail, {
    folder: "hackatoon_cloudinary/thumbails",
    resource_type: "image",
    width: 50,
    height: 50,
  });
  return res;
}

async function uploadOriginal(original) {
  const res = await cloudinary.uploader.upload(original, {
    folder: "hackatoon_cloudinary/originals",
    resource_type: "image",
  });
  return res;
}

async function uploadPreviewPicture(preview) {
  const [p1, p2] = await Promise.allSettled([
    uploadThumbail(preview),
    uploadOriginal(preview),
  ]);
  return { thumbail: p1.value, original: p2.value };
}

async function uploadPostToCloudinary(videoBuffer, previewPicture) {
  const [video, previewPictures] = await Promise.allSettled([
    uploadVideo(videoBuffer),
    uploadPreviewPicture(previewPicture),
  ]);
  const { thumbail, original } = previewPictures.value;

  const data = {
    video: video.value,
    thumbail: thumbail.secure_url,
    original: original.secure_url,
  };

  return data;
}

module.exports = {
  uploadVideo,
  uploadOriginal,
  uploadThumbail,
  uploadPreviewPicture,
  uploadPostToCloudinary,
};
