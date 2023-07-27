const { ThreadsAPI } = require("threads-api");
require("dotenv").config();
const main = async () => {
  const { UNAME, PASS } = process.env;

  let threadsAPI = new ThreadsAPI({
    username: UNAME,
    password: PASS,
    deviceID: "android-2ffrkudydfrw0000",
  });

  // Fetch your user ID
  const userID = await threadsAPI.getUserIDfromUsername("0xkaushikk");

  // Fetch your posts
  const { threads: posts } = await threadsAPI.getUserProfileThreadsLoggedIn(
    userID
  );

  // Iterate over each post
  for (const post of posts) {
    try {
      // Fetch the likers of the post
      const likersData = await threadsAPI.getThreadLikers(post.id);

      // If likersData is not null, and the post has less than 10 likes
      if (likersData && likersData.likers && likersData.likers.length < 10) {
        // Delete the post
        await threadsAPI.delete(post.id);
      }
    } catch (error) {
      console.error(`Failed to process post with id: ${post.id}`);
      console.error(error);
    }

    // Wait for 1 minute before continuing to the next post
    await sleep(60000);
  }
};

// Function to pause the execution for a specific amount of time
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main();
