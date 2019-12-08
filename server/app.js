// require('dotenv').config()
if(!process.env.NODE_ENV||process.env.NODE_ENV === 'development'){
  require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const index = require('./routes/index')
const errHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT
const database = process.env.MONGOO_ATLAS

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended : false}))

// console.log(database);

mongoose.connect(database, {
  useNewUrlParser : true,  useUnifiedTopology: true 
}, function(err){
  if(err) console.log(`server isn't connect to mongodb`);
  else console.log('Connected!');
})

app.use('/', index)
app.use(errHandler)

app.listen(PORT, function(){
  console.log(`Hello from port ${PORT}`);
})

// module.exports = app