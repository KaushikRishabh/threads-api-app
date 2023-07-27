const ThreadsAPI = require("threads-api").ThreadsAPI;
require("dotenv").config();
const sleep = require("util").promisify(setTimeout); // For sleep functionality

// Initialize the ThreadsAPI with your username and password
const { UNAME, PASS } = process.env;
const threadsAPI = new ThreadsAPI({
  username: UNAME, // Your username
  password: PASS, // Your password
  deviceID: "android-16zi2j35jwsg0000", // use the deviceID generated in the warning
});

// Array of important people that should not be unfollowed
const importantPeople = [
  "importantUserId1",
  "importantUserId2",
  "importantUserId3",
];

// Function to get following of a user
async function getFollowing(userId) {
  try {
    const { users } = await threadsAPI.getUserFollowing(userId);
    return users;
  } catch (error) {
    console.error(`Failed to get following of user with id: ${userId}`);
    console.error(error);
    return [];
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

// Function to unfollow all users you are following
async function unfollowAllFollowing(userId) {
  try {
    // Get following
    const following = await getFollowing(userId);

    // Unfollow each user
    for (let user of following) {
      // Skip if user is in the importantPeople list
      if (!importantPeople.includes(user.pk)) {
        // Unfollow the user
        await unfollowUser(user.pk);

        // Wait for a random time between 2 and 4 minutes
        const sleepTime = Math.floor(Math.random() * 120000) + 120000; // Time in milliseconds
        await sleep(sleepTime);
      }
    }
  } catch (error) {
    console.error(`Failed to unfollow following of user with id: ${userId}`);
    console.error(error);
  }
}

// Use the function
unfollowAllFollowing("YOUR_USER_ID");
