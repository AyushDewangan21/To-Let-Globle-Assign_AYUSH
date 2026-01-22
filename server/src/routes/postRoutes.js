const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/postController");

router.get("/", ctrl.getPosts);
router.get("/:id", ctrl.getPostById);
router.post("/", auth, ctrl.createPost);
router.put("/:id", auth, ctrl.updatePost);
router.delete("/:id", auth, ctrl.deletePost);

module.exports = router;
