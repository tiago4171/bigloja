const config = require('../config/auth.config');
const db = require('../models');
const User = db.User;
const Role = db.Role;

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

module.exports.signup = (req, res) => {
  console.log('Estamos em signup');
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    hash: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((error, user) => {
    if (error) {
      res.status(500).send({ message: error });
      return;
    }

    if (req.body.roles) {
      // procura no banco
      Role.find({
        name: { $in: req.body.roles },
      },
      (error, roles) => {
        // verifica se deu erro
        if (error) {
          // erro do servidor
          res.status(500).send({ message: error });
          return;
        }

        user.roles = roles.map(role => role._id);
        user.save((error) => {
          if (error) {
            res.status(500).send({ message: error });
            return;
          }
          console.log('cadastrado = ',user);
          res.status(200).send({ message: 'Usuário cadastrado com sucesso!' });
        });
      });
    } else {
      // acho que aqui é pra sobrescrever o email e password
      Role.findOne({ name: 'user' }, (error, role) => {
        if (error) {
          res.status(500).send({ message: error });
          return;
        }

        user.roles = [role._id];
        user.save((error) => {
          if (error) {
            res.status(500).send({ message: error });
            return;
          }

          res.status(200).send({ message: 'User foi cadastrado com sucesso![2]' });
        });
      });
    }
  });
};

module.exports.signin = (req, res) => {
  console.log('Estamos em signin');
  User.findOne({
      email: { $eq: req.body.email},
    })
    .populate('roles', '__v')
    .exec((error, user) => {
      if (error) {
        res.status(500).send({ message: error });
        return;
      }

      console.log(req.body);
      console.log(user);

      // se NÃO achou um user
      if (!user) {
        return res.status(404).send({ message: 'User não encontrado' });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.hash
      );

      if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: 'Usuário ou Password inválido',
          });
      }
      
      const token = jwt.sign({ email: user.email }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

      let authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      res.status(200).send({
        name: user.name,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};

