const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended:false }))

const alatRoutes = require('./routes/alat_tangkap')
app.use('/api/alat', alatRoutes)

const dpiRoutes = require('./routes/dpi')
app.use('/api/dpi', dpiRoutes)

const pemilikRoutes = require('./routes/pemilik')
app.use('/api/pemilik', pemilikRoutes)

const kapalRoutes = require('./routes/kapal')
app.use('/api/kapal', kapalRoutes)

app.listen(port,() => {
    console.log(`http://localhost:${port}`)
})