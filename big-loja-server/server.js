const express = require('express');
const cors = require('cors');

// configura as variaveis de ambiente pelo arquivo .env
require('dotenv').config();
// inicia o app
const app = express();
const PORT = process.env.PORT || 80;
// modificar a porta no final
/*
const corsOptions = {
  origin: `http://localhost:${PORT}`,
  optionsSucessStatus: 200,
};
*/

app.use(cors(/*corsOptions*/));

// pra parsear requests do tipo application/json
// bodyParser é responsável por colocar o req.body
app.use(express.json({ limit: '10mb' }));
// pra parsear formulários application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: '10mb', extended: true }));


const db = require('./models');
const dbConfig = require('./config/db.config');
const Role = db.Role;

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // evita warning ao iniciar o serevr
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Conectado com sucesso no MongoDB');
  })
  .catch((error) => {
    console.log(`Erro de conexão no banco: ${error}`);
    process.exit();
  });

// configura uma rota simples
app.get('/', (req, res) => {
  res.json({ message: 'Bem vindo ao server da loja' });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/userData.routes')(app);

// ouve por requisições
app.listen(PORT, () => {
  console.log(`Server está rodando na porta ${PORT}`);
});
