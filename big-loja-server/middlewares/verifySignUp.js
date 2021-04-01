const db = require('../models');
const ROLES = db.ROLES;
const User = db.User;

const checkDuplicateEmail = (req, res, next) => {
  console.log('Estamos check duplicate');
  User.findOne({
      email: req.body.email
    })
    .exec((error, user) => {
      if (error) {
        // error no servidor
        res.status(500).send({message: error});
        return;
      }

      if (user) {
        res.status(400).send({message: 'Error, email já está em uso'});
        return;
      }

      next();
    });
};

const checkRolesExisted = (req, res, next) => {
  console.log('Estamos em check roles');
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i].toLowerCase())) {
        // bad request
        res.status(400).send({
          message: `Falhou! Role ${req.body.roles[i]} não existe!`,
        });
        return;
      }
    }
  }
  else {
    res.status(401).send({ message: `Usuário não tem 'roles'`});
  }
  // pra ir pro próximo comando
  next();
};

const verifySignUp = {
  checkDuplicateEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;