const db = require('../database/dbConfig.js');

module.exports = {
    register,
    getUserById,
    getUserByUsername
}

function register(user){
    return db('users')
    .insert(user)
}

function getUserById(id){
    return db('users')
    .where({id})
    .first()
}

function getUserByUsername(username){
    return db('users')
    .where({username})
    .first()
}