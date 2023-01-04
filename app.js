require('dotenv').config()//Solo la necesitaras exportar aqui 

const Server = require('./models/server')



const server=new Server()

server.listen()





