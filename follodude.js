const ThreadsAPI = require("threads-api").ThreadsAPI;
require("dotenv").config();
const sleep = require("util").promisify(setTimeout); // For sleep functionality

const { UNAME, PASS } = process.env;
let threadsAPI = new ThreadsAPI({
  username: UNAME,
  password: PASS,
  deviceID: "android-16zi2j35jwsg0000",
});

let errorCount = 0;

async function getFollowers(userId) {
  try {
    const { users } = await threadsAPI.getUserFollowers(userId);
    return users;
  } catch (error) {
    console.error(`Failed to get followers of user with id: ${userId}`);
    console.error(error);
    return [];
  }
}

async function followUser(userId) {
  try {
    await threadsAPI.follow(userId);
    console.log(`Followed user with id: ${userId}`);
  } catch (error) {
    console.error(`Failed to follow user with id: ${userId}`);
    console.error(error);
    throw error;
  }
}

async function followAllFollowers(userId) {
  try {
    const followers = await getFollowers(userId);
    let followerCount = 0;

    for (let follower of followers) {
      followerCount++;

      try {
        await followUser(follower?.pk_id);
        const sleepTime = Math.floor(Math.random() * 60000) + 60000; // Random time between 1-2 mins
        await sleep(sleepTime);

        if (followerCount % 19 === 0) {
          // After following 19 users
          const restTime = Math.floor(Math.random() * 600000) + 660000; // Random time between 11-21 mins
          await sleep(restTime);

          threadsAPI = new ThreadsAPI({
            username: UNAME,
            password: PASS,
            deviceID: "android-16zi2j35jwsg0000",
          });
        }
      } catch (error) {
        console.error(`Failed to follow followers of user with id: ${userId}`);
        console.error(error);

        // Increment errorCount
        errorCount++;

        // Sleep for an incremental time
        const restTime =
          (Math.floor(Math.random() * 360000) + 1260000) * errorCount; // Random time between 21-27 mins * errorCount
        await sleep(restTime);

        // Create a new ThreadsAPI instance
        threadsAPI = new ThreadsAPI({
          username: UNAME,
          password: PASS,
          deviceID: "android-16zi2j35jwsg0000",
        });

        // Restart the process
        followAllFollowers(userId);
        break; // Exit the loop
      }
    }
  } catch (error) {
    console.error(`Failed to get followers of user with id: ${userId}`);
    console.error(error);
  }
}

followAllFollowers("1787815754");

//OLD CODE BELOW
// const ThreadsAPI = require("threads-api").ThreadsAPI;
// require("dotenv").config();
// const sleep = require("util").promisify(setTimeout); // For sleep functionality
// // Initialize the ThreadsAPI with your username and password

// const { UNAME, PASS } = process.env;
// let threadsAPI = new ThreadsAPI({
//   username: UNAME, // Your username
//   password: PASS, // Your password
//   deviceID: "android-16zi2j35jwsg0000", // use the deviceID generated in the warning
// });

// // Function to get followers of a user
// async function getFollowers(userId) {
//   try {
//     // const { followers } = await threadsAPI.getUserFollowers(userId);
//     const { users } = await threadsAPI.getUserFollowers(userId);
//     // console.log(users);
//     // const { users } = await threadsAPI.getUserFollowers(userID);
//     return users;
//   } catch (error) {
//     console.error(`Failed to get followers of user with id: ${userId}`);
//     console.error(error);
//     return [];
//   }
// }

// // Function to follow a user
// async function followUser(userId) {
//   //   console.log(userId);
//   try {
//     await threadsAPI.follow(userId);
//     console.log(`Followed user with id: ${userId}`);
//   } catch (error) {
//     console.error(`err2- Failed to follow user with id: ${userId}`);
//     console.error(error);
//     throw error; // Throw error to be caught in the parent function
//   }
// }

// // Function to follow all followers of a user

// async function followAllFollowers(userId) {
//   try {
//     // Get followers
//     const followers = await getFollowers(userId);

//     // Follow each follower
//     for (let follower of followers) {
//       try {
//         // Follow the follower
//         await followUser(follower?.pk_id);

//         // Wait for a random time between 1 and 2 minutes
//         const sleepTime = Math.floor(Math.random() * 60000) + 60000; // Time in milliseconds
//         await sleep(sleepTime);
//       } catch (error) {
//         console.error(
//           `err-1: Failed to follow followers of user with id: ${userId}`
//         );
//         console.error(error);

//         // Add your logic to create a new connection and start the process again
//         // For example:
//         await sleep(24000);
//         threadsAPI = new ThreadsAPI({
//           username: UNAME,
//           password: PASS,
//           deviceID: "android-16zi2j35jwsg0000",
//         });

//         followAllFollowers(userId);
//         break; // Exit the loop
//       }
//     }
//   } catch (error) {
//     console.error(`err-3: Failed to get followers of user with id: ${userId}`);
//     console.error(error);
//   }
// }

// // Use the function
// followAllFollowers("1787815754"); //50666342040 //0xalphagirl
