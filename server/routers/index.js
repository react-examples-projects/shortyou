const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const { PostController } = require("../controllers");

router.use(fileUpload());
router.get("/post", PostController.getAll);
router.get("/search", PostController.search);
router.post("/post", PostController.create);

module.exports = router;
