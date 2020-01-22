const express = require('express')
const nunjunks = require('nunjucks')
const routes = require('./routes')

const server = express()

server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
server.use(routes)

server.set("view engine", "njk")

nunjunks.configure("views", {
    express : server,
    autoescape: false,
    noCache: true
})

const PORT = 5000
const HOST = 'localhost'

server.listen(PORT, HOST,(err) => {
    
    if(err){

        console.log(err)

    }else{

    console.log(`Connected http://${HOST}:${PORT}`)
}
})