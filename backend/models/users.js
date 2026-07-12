let users = [];

const addUser = (userData) => {
  const newUser = {
    id: users.length + 1,
    email: userData.email,
    password: userData.password,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  return newUser;
};

const findUserByEmail = (email) => {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
};

module.exports = {
  users,
  addUser,
  findUserByEmail
};