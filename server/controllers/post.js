import Post from "../models/Post.js"; // 1) not made model yet. refer to drawn data model
import User from "../models/User.js";

/* CREATE */

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    /* this grabs all the posts in the database afterwards, so the frontend has all the posts updated
    so they can display the feed with the updated post */
    const post = await Post.find();
    /* we status that we've created something and also return the post in a json format */
    res.status(201).json(post);

    /*  hard part of big application is dealing with the api's how theyre sending info, how we're grabbing it, how
    it's formatted */
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
