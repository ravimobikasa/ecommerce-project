const { User } = require('./../models')


const findUserByEmail = async(email) => {
    const user = await User.findOne({ where: {
        email
    }})
    return user
}

const findUserByPhone = async(phoneNumber) => {
    const user = await User.findOne({ where: {
        phoneNumber
    }})
    return user
}

const findUserById = async(id) => {
    const user = await User.findOne({ where: {
        id
    }})
    return user
}

module.exports = {
    findUserByEmail,
    findUserByPhone,
    findUserById
}