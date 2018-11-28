const ProductModel = require('./product.model');

exports.getAllProducts = (req,res) => {
    ProductModel.find({}).then((products,err) => {
        if (err) {
          res.status(404).json(err);
        }
        let filteredProducts = products;
        if (req.query.type) {
          filteredProducts = products.filter((product) => product.type === req.query.type.toLowerCase());
        }
        res.status(200).json(filteredProducts);
    });
};

exports.getProductById = (req,res) => {
    ProductModel.findOne({'id': req.params.id}).then((product,err) => {
        if (product === null || err) {
          return res.status(404).json(`Produto ${req.params.id} não encontrado`);
        }
        return res.status(200).json(product);
    });
};

exports.createProduct = (req,res) => {
    const productCollec = ProductModel.estimatedDocumentCount();

    productCollec.then((count) => {
      const product = {
        'id': count + 1,
        'name': req.body.name.toLowerCase(),
        'quant': req.body.quant || 1,
        'type': req.body.type.toLowerCase(),
        'price': req.body.price || 0,
        'img': req.body.img,
        'description': req.body.description.toLowerCase(),
        'owner': 1
      };

      const newProd = new ProductModel(product);

      newProd.save((err) => {
        if (err) {
          const emessage = err.errmsg || err.message;
          res.status(400).json(emessage);
        } else {
          res.status(201).json(`Produto cadastrado com sucesso: ${product.name}`);
        }
      });
    });
};

exports.updateProduct = (req,res) => {
    ProductModel.findOne({'id': req.params.id}).then((product,err) => {
        if (product === null || err) {
          res.status(404).json(`Produto ${req.params.id} não encontrado`);
        }
        product.name = req.body.name || product.name;
        product.quant = req.body.quant || product.quant;
        product.type = req.body.type || product.type;

        product.save((errSave) => {
          if (errSave) {
            const message = errSave.message || errSave.errmsg;
            res.status(400).json(message);
          } else {
            res.status(200).json('Produto atualizado com sucesso');
          }
        });
    });
};

exports.deleteProduct = (req,res) => {
    ProductModel.deleteOne({'id': req.params.id}).then((err) => {
        if (err.n === 0) {
          return res.status(404).json(`Produto ${req.params.id} não encontrado`);
        }
        return res.status(200).json(`Produto ${req.params.id} deletado com sucesso`);
    });
};