const express = require ('express')
const bodyParser = require('body-parser')
const massive = require('massive')
require('dotenv').config()

const products_controller = require('./products_controller')

const port = 3000
const app = express()

app.use(bodyParser.json())

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
}).catch(err => console.log(err))

app.get('/api/products',products_controller.getAll)
app.get('/api/product/:id',products_controller.getOne)
app.put('/api/product/:id',products_controller.update)
app.post('/api/product',products_controller.create)
app.delete('/api/product/:id',products_controller.delete)

app.listen(port, () => {
    console.log('listening on port',port)
})