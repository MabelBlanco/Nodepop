const User = require("../models/User");

async function createUsers() {
  const initialUsers = [
    {
      email: "ejemplo@meloinvento.es",
      password: await User.hashPassword("inventado1234"),
    },
    {
      email: "user@example.com",
      password: await User.hashPassword("1234"),
    },
  ];
  return initialUsers;
}

const initialUsers = createUsers();

module.exports = initialUsers;
