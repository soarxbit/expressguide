const users = []
function userJoin(id, username, room){
    const user = {id, username, room}
    users.push(user)
    return user
}
function getCurrentUser(id){
    return users.find(user=>user.id===id)
}

module.exports = {
    userJoin,
    getCurrentUser
}
