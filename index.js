const express=require('express')
const connectdb=require('./config/config')
const cors=require('cors')
const app=express()
require("dotenv").config()
const port=process.env.port

// init middlware
app.use(express.json())
app.use(cors())

//define Routes
app.use('/api/users',require('./router/api/users'))
app.use('/api/profile',require('./router/api/profile'))
app.use('/api/post',require('./router/api/post'))
app.use('/api/auth',require('./router/api/auth'))


app.listen(port,console.log(`serveur is connected on port ${port}`))
//connect database
connectdb()