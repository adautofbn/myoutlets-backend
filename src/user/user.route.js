const express = require('express');
const router = new express.Router();

const userUtil = require('./user.util');
const validUtil = require('../util/validate.util');

const users = require('./users.json');

router.use((req,res,next) => {
    next();
});

router.get('/', (req,res) => {
  let filteredUsers = users;
  if (req.query.type) {
    filteredUsers = users.filter((user) => user.type === req.query.type.toLowerCase());
  }
  res.json(filteredUsers);
});

router.get('/:id', (req,res) => {
    const user = userUtil.findUser(users,req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json(`Usuário ${req.params.id} não encontrado`);
    }
});

router.post('/', (req,res) => {

    let message = '';

    const {error} = validUtil.validateUser(req.body);

    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const filteredUsers = users.filter((user) => user.email === req.body.email.toLowerCase());

    if (filteredUsers.length > 0) {
        message = `Email ${req.body.email} já cadastrado`;
    }

    if (!message) {
      const user = {
        'id': users.length + 1,
        'name': req.body.name,
        'email': req.body.email.toLowerCase(),
        'password': req.body.password,
        'type': req.body.type.toLowerCase()
      };

      users.push(user);
      message = `Usuário cadastrado com sucesso: ${user.name}`;
    }

    return res.status(200).json(message);
});

router.put('/:id', (req,res) => {
    const user = userUtil.findUser(users,req.params.id);
    if (!user) {
      return res.status(404).json(`Usuário ${req.params.id} não encontrado`);
    }

    const {error} = validUtil.validateUser(req.body, true);

    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.quant;
    user.password = req.body.password || user.password;
    user.type = req.body.type || user.type;

    return res.status(200).json(`Usuário atualizado com sucesso: ${user.name}`);
});

router.delete('/:id', (req,res) => {

    const user = userUtil.findUser(users,req.params.id);
    if (!user) {
      return res.status(404).json(`Usuário ${req.params.id} não encontrado`);
    }

    const index = users.indexOf(user);
    users.splice(index,1);

    return res.status(200).json(`Usuário deletado com sucesso: ${user.name}`);
});

module.exports = router;