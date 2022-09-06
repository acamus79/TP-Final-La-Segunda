const app = require('./server');
const http = require('http').createServer(app);
const {sequelize} = require('./models/index');

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Running on a port: ${PORT}`);
    sequelize.sync({ force: false }).then(() => {
        console.log('DB connection successful');
    }).catch(error => {
        console.log('An error has occurred', error);
    })
});


