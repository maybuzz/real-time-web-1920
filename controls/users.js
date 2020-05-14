const users = []

function newUser(name, room) {
  const user = {name, room }

  users.push(user)

  return user
}

module.exports = newUser
