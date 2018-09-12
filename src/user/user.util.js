function findUser (array,id) {
    const user = array.find((item) => item.id === parseInt(id));
    return user;
}

module.exports = {
    findUser
};