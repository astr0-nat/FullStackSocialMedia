import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params; // object destructuring. could also do const id = req.params.id. syntax
    const user = await User.findById(id);

    /* we map the findById function over every id in the user.friends array so we can have access to 
  an array of friend objects. We use promise.all because we are working with an iterable of promises.
  each api call is a promise */
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    /* here were just returning the relevent parts of the friend object to the front end (excluding email etc) */
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId); // javascript function to filter array
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      /* remove friend if friendId is in the friends list,
      //otherwise if not in the list, it means were trying
       to add a friend instead. so we use the Push command */
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    //await statements pause flow. we do this bc we doing api call and well need the updated friend
    await user.save();
    await friend.save();

    /* format again in a way that is nice for the front end */
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
