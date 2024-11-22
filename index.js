const express = require('express')
const mongoose = require('mongoose')
const dotEnv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const serviceInputRouter = require('./router/ServiceInputRouter')
const userRouter = require('./router/UserRouter')

const app = express()

dotEnv.config()

app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 4002

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MongoDB connected successfully')
})
.catch((error)=>{
    console.log('ERROR: ', error)
})


app.use('/requests', serviceInputRouter)
app.use('/user', userRouter)

app.get('/', (req, res)=>{
    res.send("app working successfully")
})

app.listen(PORT, ()=>{
    console.log(`Server is started and connected at PORT: ${PORT}`)
})