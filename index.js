const express= require('express')
require('dotenv').config()
const cors=require('cors')
const app=express()
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI= require('swagger-ui-express')
const { userRouter } = require('./Routes/users.route')
const { connection } = require("./Config/db")
const { userDataRouter } = require('./Routes/users_data.route')


app.use(cors())
app.use(express.json())

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Users Management System',
            version: '1.0.0',
        },
      servers:[
          {
              url:'http://localhost:5500/'
        }
      ]
    },
    apis: ['./Routes/users.route.js','./Routes/users_data.route.js'],
  };

const swaggerSpec=swaggerJsdoc(options)
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec))



app.get("/",(req,res)=>{
  res.status(200).send("Welcome to User management system")
})


app.use("/users",userRouter)
app.use(userDataRouter)



const PORT=process.env.PORT||5500
app.listen(PORT,async()=>{
    try {
        await connection
        console.log("Connected to MongoDB Database")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`Connected to server on port ${PORT}`)
})