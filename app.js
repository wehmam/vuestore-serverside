const express = require('express')

const app = express()
const PORT = 8000
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use('/img', express.static(path.join(__dirname, './public/img')))

const db = require('./app/models/index')
db.mongoose
    .connect(db.url, {
        dbName: "collect_vuestore",
        useNewUrlParser: true,
        useUnifiedTopology: true
        // useFindAndModify: false
    })
    .then((result) => {
        console.log("Database Connected!")
    }).catch((err) => {
        console.log("Cannot connect to database", err)
        process.exit();
    })

app.get('/', (req , res) => {
    res.json({
        message: "Welcome to vuestore server"
    })
})

require('./app/routes/product.route')(app)
require('./app/routes/order.route')(app)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})