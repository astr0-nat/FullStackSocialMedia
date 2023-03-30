import Post from "../models/Post.js"; // 1) not made model yet. refer to drawn data model
import User from "../models/User.js";

/* CREATE */

export const createPost = async (req, res) => {
  try {
    /* req.body contains key-value pairs of data submitted in the request body. it is only populated
    after using some parsing middleware such as body-parser or multer */
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

/* READ */

export const getFeedPosts = async (req, res) => {
  try {
    /* so here we are using req.params instead, as the userId will be a property in the object
    provided by node that is maps named route "parameters" to properties like "/:userId"  */
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
// a lot of these routes require passing in updated values to the frontEnd so they can update the frontEnd feed
export const likePost = async (req, res) => {
  try {
    const { id } = req.params; // we'll get the id of the post from the params
    const { userId } = req.body; // we'll get the userId who is liking from the body here
    const post = await Post.findById(id); // this id is the created by mongoDM, so they have a special method
    // we check if user exists as true in this posts dict of likes, if so -click means unlike, if not - click means like
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    /* options object that specifies for findByIdAndupdate
     method to return the updated object instead of the originial 
     object, which is the default */

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    // update the front end once clicked like button
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
