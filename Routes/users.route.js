const express = require('express')
require('dotenv').config()
const jwt = require("jsonwebtoken")
const userRouter = express.Router()
const bcrypt = require('bcrypt')
const { UserModel } = require('../Models/users.model')


/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with user_name, user_email, and user_password.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User registration details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user_name:
 *               type: string
 *             user_email:
 *               type: string
 *             user_password:
 *               type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *         schema:
 *           type: object
 *           properties:
 *             msg:
 *               type: string
 *       400:
 *         description: Bad request, registration failed
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
userRouter.post("/signup", async (req, res) => {
    const { user_name, user_email, user_password } = req.body
    console.log(req.body)
    try{
        bcrypt.hash(user_password,4,async(err,hash)=>{
            if(err){
                req.send(err.message)
            }else{
                const user=new UserModel({user_name,user_email,user_password:hash})
                await user.save()
                res.status(200).send({"msg":"New user has been regitered Successfully"})
            }
        })
    } catch (error) {
        res.status(400).send({ "error": error.message })
    }
})


/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user by checking their email and password.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: userCredentials
 *         description: User login credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user_email:
 *               type: string
 *             user_password:
 *               type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         schema:
 *           type: object
 *           properties:
 *             msg:
 *               type: string
 *             AccessToken:
 *               type: string
 *             username:
 *               type: string
 *       400:
 *         description: Bad request, login failed
 *         schema:
 *           type: object
 *           properties:
 *             msg:
 *               type: string
 *       404:
 *         description: Email does not exist
 *         schema:
 *           type: object
 *           properties:
 *             msg:
 *               type: string
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */

userRouter.post('/login', async (req, res) => {
    const { user_email, user_password } = req.body;
    try {
        const user = await UserModel.findOne({ user_email:user_email })
        if (user) {
          bcrypt.compare(user_password, user.user_password, (err, result) => {
            if (result) {
              let accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" })
              res.status(200).send({
                "msg": "Login Succesfull", "AcessToken": accessToken,"username":user.user_name
              })
            } else {
              res.status(400).send({ "msg": "Password is incorrect" })
            }
          })
        } else {
          res.status(404).send({ "msg": "Email does not exist" })
        }
      } catch (error) {
            res.status(500).send({
            "error": error.message
        })
    }
})

module.exports={
    userRouter
}