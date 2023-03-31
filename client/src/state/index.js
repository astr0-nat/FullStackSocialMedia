import { createSlice } from "@reduxjs/toolkit";


/* this will be the state stored in our 
    global state. accessable from anywhere in our 
    app so we dont need to pass in state down 
    to different components */

/* Toolkit simplifies a lot of Redux. gets rid of boiler plate */

/* this represents the global state */
const initialState = {
    mode: "Light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth", // represent auth workflow
    initialState, // passing initialState into initialState
    reducers: { // these are actions. these are functions used to regulate the global state
        /* redux says you cant state that initial state object directly, so we 
        replace the object instead of modifying it directly.
        toolkit makes it look like you are changing it directly here. 
        so the syntax here is us 'replacing' the state object (state) */
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        }, 
        /* what action is what is called the 'payload', it is basically the parmas for the function */
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else { 
                console.error("user friends non-existsnt :(")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        /* grab our list of posts and map over them,
        and if we find the same post object in our payload
        we will update the post object with the payload one */
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        }
    }
})

// this is a redux toolkit thing

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = 
    authSlice.actions; 
export default authSlice.reducer;

