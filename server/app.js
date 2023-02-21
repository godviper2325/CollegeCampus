//const { request, response } = require('express')
const express=require('express')
const app=express()
const PORT=7000 
const MONGOURL=require('./env')
var cors=require('cors')

const mongoose=require('mongoose')

mongoose.connect(MONGOURL.MONGOURL ,('strictQuery', true, 'strictQuery', false));

mongoose.connection.on('connected', ()=>{
    console.log('mongo db connected')
})

mongoose.connection.on('<---mongo db connection error--->', (err)=>{
    console.log('mongo db connection error', err);
})
 

require('./models/user')
require('./models/post')

app.use(cors())
app.use(express.json())


app.use(require('./routes/auth'))
app.use(require('./routes/post'))



app.listen(PORT,()=>{
    console.log('server started at:' ,PORT);
    console.log('your Url is',"localhost:"+PORT);
})