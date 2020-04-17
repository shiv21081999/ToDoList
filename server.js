const express = require('express')
const app = express()

app.use('/todolist', express.static(__dirname+'/public'))

app.listen(3333)
console.log("http://localhost:3333/todolist")