const mongoose = require('mongoose');

const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;

const URI = `mongodb+srv://${USER}:${PASSWORD}@cluster0.hkwnu.mongodb.net/authjwt?retryWrites=true&w=majority`

mongoose.connect(URI, (err) => {
  if(err) throw new Error(`Erro ao conectar ao database ${err}`);
  console.log(`Conectado ao banco de dados`)
});

module.exports = mongoose;