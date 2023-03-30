import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js"; // 1) controllers not made yet
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts); // 2) grab the user feed when on the home page. just spit out every post
// that exists. production level will be curated
router.get("/:userId/posts", verifyToken, getUserPosts); //when click on a user, make sure to display only his posts

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost); // liking and unliking post

export default router;
