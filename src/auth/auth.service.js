const ProductModel = require('../product/product.model');

const ensureAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json('Sem permissão, precisa estar logado');
    }
    return next();
};

const authenticateById = (req,res,next) => {
    const userId = req.user.id;
    if (userId) {
        const reqId = parseInt(req.params.id);
        if (userId === reqId) {
            return next();
        }
        return res.status(401).json('Sem permissão pelo ID');
    }
    return res.status(400).json('Sem permissão');
};

const authenticateByRole = (req,res,next) => {
    const userRole = req.user.role;
    if (userRole) {
        if (userRole === 'representante') {
            return next();
        }
        return res.status(401).json('Sem permissão pelo Papel');
    }
    return res.status(400).json('Sem permissão');
};

const authenticateByOwnership = async (req,res,next) => {
    let message = '';
    const userId = req.user.id;
    if (userId) {
        await ProductModel.findOne({'id': req.params.id}, (err, product) => {
            if (product === null || err) {
                message = `Produto ${req.params.id} não encontrado`;
            } else if (userId === product.owner) {
                message = '';
            } else {
                message = 'Sem permissão de proprietário';
            }
        });
    }
    if (!message) {
        return next();
    }
    return res.status(401).json(message);
};

module.exports = {
    ensureAuthenticated,
    authenticateById,
    authenticateByRole,
    authenticateByOwnership
};