const express=require('express')
const authRouter=require('./routes/auth.route')
const musicRouter=require('./routes/music.route')

const cookieParser=require('cookie-parser')

const app=express()
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth',authRouter)

app.use('/api/music',musicRouter)

module.exports=app