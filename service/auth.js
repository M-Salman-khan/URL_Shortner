const sessionIDToUserMap = new Map()

function setUser(sessionID, user) {
    return sessionIDToUserMap.set(sessionID, user)
}
function getUser(sessionID) {
    return sessionIDToUserMap.get(sessionID)
}

module.exports = { getUser, setUser }