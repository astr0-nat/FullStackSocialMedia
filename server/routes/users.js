import express from "express"
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router();

/* READ */ // routes where we grab information; the R in C R U D
/** the : in express is syntax to let know that id is a variable. the value of :id will be stored in the req.params */
router.get("/:id", verifyToken, getUser); //"query string from the frontEnd". info stored in the route.
router.get("/:id/friends", verifyToken, getUserFriends)

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend)

export default router;