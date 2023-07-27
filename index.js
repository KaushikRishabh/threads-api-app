// Use require() instead of import
const ThreadsAPI = require("threads-api").ThreadsAPI;
// ⚠️ WARNING: deviceID not provided, automatically generating device id '{UID}' Please save this device id and use it for futur
require("dotenv").config();

/* NOTES:
1-After following 20 users with avg time of 2 minutes for a follow, the errors come up
2-Same for 21 users with avg time of 2.5 minutes
3-Same for 20 users with avg time of 3.5 minutes 
*/

const { UNAME, PASS } = process.env;
const threadsAPI = new ThreadsAPI({
  username: UNAME, // Your username
  password: PASS, // Your password
  deviceID: "android-16zi2j35jwsg0000", // use the deviceID generated in the warning
});

const postThread = async () => {
  console.log("useranme:", UNAME);
  console.log("pass:", PASS);
  // const threadsAPI = new ThreadsAPI({
  //   username: UNAME, // Your username
  //   password: PASS, // Your password
  // });

  await threadsAPI.publish({
    text: "test api Hello World ~~~ try 4",
  });
};
async function main() {
  const username = UNAME; // replace with the username you're interested in
  const userID = await threadsAPI.getUserIDfromUsername(username);

  if (!userID) {
    console.log("User not found");
    return;
  }

  const { users } = await threadsAPI.getUserFollowers(userID);
  console.log(users);
}

// Define the followUser function
async function followUser(userId) {
  try {
    // Call the follow function from the threadsAPI instance
    const response = await threadsAPI.follow(userId);
    console.log(`Followed user with id: ${userId}`);
  } catch (error) {
    console.error(`Failed to follow user with id: ${userId}`);
    console.error(error);
  }
}

// Function to unfollow a user
async function unfollowUser(userId) {
  try {
    await threadsAPI.unfollow(userId);
    console.log(`Unfollowed user with id: ${userId}`);
  } catch (error) {
    console.error(`Failed to unfollow user with id: ${userId}`);
    console.error(error);
  }
}
async function getUserIdFromUserName(username) {
  const userID = await threadsAPI.getUserIDfromUsername(username);
  console.log("userId is:", userID);
}
getUserIdFromUserName("cointelegraph");

// Use the function
// unfollowUser("50666342040");

// Use the function
// followUser("50666342040"); // eg: pk_id: 50666342040

main();
