function findProduct (array,id) {
    const product = array.find((item) => item.id === parseInt(id));
    return product;
}

module.exports = {
    findProduct
};