const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const sequelize = require('./config/database');
const {User, Reward, Code} = require('./models/associations')

const port = process.env.PORT || 5000;

sequelize.authenticate().then(() => console.log('connected'));

sequelize
  .sync()
  .then((result) => {
    const server = app.listen(port);
    const io = require('./socket.js').init(server);
    io.on('connection', stream => {
      console.log('client connected')
    })

  })
  .catch((err) => {
    console.log(err);
  });
