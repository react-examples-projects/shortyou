const { error } = require("../helpers/httpResponses");
const { message } = require("../helpers/utils");
const { DEV } = require("../config/variables").SERVER;

function logErrors(err, req, res, next) {
  message.error(err?.message || err);
  if (err?.stack) message.error(err?.stack);

  let _error = {};
  if (err?.stack && DEV) _error.stack = err.stack;
  if (err?.message) _error.description = err.message;
  if (typeof err === "string") {
    _error = err;
  }
  error(res, _error, 500);
}

function wrapServerErrors(app) {
  if (typeof app.use !== "function") {
    throw new Error("The `app` param isn't a instace of express ");
  }
  // insertar los middlewares de errores en el servidor `app`
  app.use(logErrors);
}

module.exports = wrapServerErrors;
