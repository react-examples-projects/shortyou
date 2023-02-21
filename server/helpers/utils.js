const logger = require("pino")(require("pino-pretty")());

const message = {
  success(str) {
    logger.info(`${str}`);
  },

  error(str, err = null) {
    logger.error(`${str}`);
    err && logger.error(`Error message: ${str}`);
  },

  warn(str) {
    logger.warn(`${str}`);
  },
};

function isFileTooLarge(sizeImage) {
  const SIZE_ALLOWED = 10; // Mb
  const size = (sizeImage / (1024 * 1024)).toFixed(2);
  return size > SIZE_ALLOWED;
}

function isNotValidFileType(mimeType) {
  const SUPPORTED_FORMATS = ["video/mp4", "video/webm"];
  return !SUPPORTED_FORMATS.includes(mimeType);
}

module.exports = {
  message,
  isFileTooLarge,
  isNotValidFileType,
};
