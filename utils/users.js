const users = []

// join user to chat
function userJoin(id, room) {
  const user = { id, room }

  users.push(user)

  console.log("userJoin", users)

  return user
}

function getCurrentUser(id) {
  console.log("currentUser", users)

  return users.find(user => user.id === id)
}

function userLeave(id) {
  const index = users.findIndex(user => user.id === id)

  if(index !== -1) {
    console.log("userLeave", users)

    return users.splice(index, 1)[0]
  }
}

function getRoomUsers(room) {

  console.log("roomUsers", users)

  return users.filter(user => user.room === room)
}

module.exports = { userJoin, getCurrentUser, userLeave, getRoomUsers }
