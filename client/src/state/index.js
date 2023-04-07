import { createSlice } from "@reduxjs/toolkit";

// accessable globally, so we dont need to pass in state and props into different components
const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth", // the auth workflow
    initialState, // "passing initial state into initial state"
    //  action in reducers are functions that modify the global state
    reducers: {
        //state.mode represents the previous state, and what we set it to represents the new state
        // redux has it so that you never change the inital state directly, you completely replace the 
        // object as opposed to directly modifying the state
        // toolkit has built in library immur that has you act like you are modifying the state directly
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        // action is where you set 'payload' - params/ arguments for your function
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        // setting the state of the app for this particular user. widget will probably use this info
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existant :(")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },

        // this is for updating a post after a user edits it im assuming
        // would call this function to update app state after user has update post
        // action would contain a post
        // updated post we changed that is coming from the backend, we only update that particular post
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id) return action.payload.post;
                return post; 
            });
            state.posts = updatedPosts;
        }
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;
export default authSlice.reducer; 