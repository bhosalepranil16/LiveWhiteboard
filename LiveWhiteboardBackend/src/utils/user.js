const users = [];

const addUser = (socketId, roomId, userId, username, isHost) => {
  const isPresent = users.find((u) => u.userId === userId);
  if (!isPresent) {
    const user = {
      socketId,
      roomId,
      userId,
      username,
      isHost,
    };
    users.push(user);
    return user;
  }
  return isPresent;
};

const removeUser = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUsers = (roomId) => {
  const RoomUsers = [];
  users.map((user) => {
    if (user.roomId == roomId) {
      RoomUsers.push(user);
    }
  });
  return RoomUsers;
};

module.exports = { addUser, removeUser, getUsers };
