import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        /* we will check if userId exists in this map to know if user has liked this post. if like it, add to map
        if dislike it, remove from this map. Map not array since if a post has 20,000 likes, O(1) to search
        instead of O(n) */
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            types: Array,
            default: []
        }
    },
    { timestamps: true}
);

const Post = mongoose.model("Post", postSchema);
export default Post;