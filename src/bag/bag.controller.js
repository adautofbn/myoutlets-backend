const cache = require('memory-cache');
const ProductModel = require('../product/product.model');
const bag = require('./bag.json');

cache.put('bag', bag);

exports.getBag = (req,res) => {
    res.json(cache.get('bag'));
};

exports.addProduct = (req,res) => {
    ProductModel.findOne({'id': req.body.id}).then((product,err) => {
        if (product === null || err) {
          return res.status(404).json(`Item ${req.body.id} não encontrado`);
        }

        const reqQuant = req.body.quant || 1;
        if (reqQuant > product.quant) {
          return res.status(400).json(`Quantidade de ${product.name} indisponível`);
        }

        const bagProduct = cache.get('bag').find((bagItem) => bagItem.id === product.id);
        if (bagProduct) {
          const bagNewQuant = reqQuant + bagProduct.quant;
          if (bagNewQuant > product.quant) {
            return res.status(400).json(`Quantidade de ${bagProduct.name} indisponível`);
          }
          bagProduct.quant = bagNewQuant;
          cache.put('bag', bag);
          return res.status(200).json(`Produto ${bagProduct.name} já existe na bolsa, quantidade incrementada`);
        }

        product.quant = reqQuant;

        bag.push(product);
        cache.put('bag', bag);
        return res.status(200).json(`Produto adicionado à sua bolsa: ${product.name}`);
    });
};

exports.removeProduct = (req,res) => {
    const product = bag.find((item) => item.id === parseInt(req.body.id));
    if (!product) {
      return res.status(404).json(`Item ${req.body.id} não encontrado`);
    }
    const index = bag.indexOf(product);
    bag.splice(index,1);
    cache.put('bag', bag);
    return res.status(200).json(`Item deletado com sucesso: ${product.name}`);
};
