const express = require("express")
const userDataRouter = express.Router()
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { UserDataModel } = require("../Models/users_data.model");
const { authenticate } = require("../Middlewares/auth.middleware");


/**
 * @swagger
 * /insert:
 *   post:
 *     summary: Insert new user data
 *     description: Insert a new user's data with user_name, user_email, user_password, and user_image.
 *     security:
 *       - BearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: userData
 *         description: User data to be inserted
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
 *             user_image:
 *               type: string
 *     responses:
 *       200:
 *         description: User data inserted successfully
 *         schema:
 *           type: object
 *           properties:
 *             msg:
 *               type: string
 *       400:
 *         description: Bad request, data insertion failed
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
userDataRouter.post("/insert",authenticate, async (req, res) => {
    const { user_name, user_email, user_password, user_image } = req.body;
    try {
        bcrypt.hash(user_password, 4, async (err, hash) => {
            if (err) {
                req.send(err.message)
            } else {
                const user = new UserDataModel({ user_id: uuidv4(), user_name, user_email, user_password: hash, user_image })
                await user.save()
                res.status(200).send({ "msg": "New user data has been added Successfully" })
            }
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send({ "error": error.message })
    }
})


/**
 * @swagger
 * /allData:
 *   get:
 *     summary: Get all user data
 *     description: Retrieve all user data from the database.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved all user data
 *         schema:
 *           type: object
 *           properties:
 *             msg:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Bad request, data retrieval failed
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
userDataRouter.get("/allData", async (req, res) => {
    try {
        const data = await UserDataModel.find();
        res.status(200).send({ "msg": data })
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send({ "error": error.message })
    }
})

/**
 * @swagger
 * /details/{user_id}:
 *   get:
 *     summary: Get user details by user ID
 *     description: Retrieve user details by providing the user ID as a parameter.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         description: User ID to retrieve user details
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *         schema:
 *           type: object
 *           properties:
 *             user_data:
 *               type: object
 *       404:
 *         description: User not found
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

userDataRouter.get('/details/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const user = await UserDataModel.findOne({ user_id: user_id });
        if (!user) {
            return res.status(404).json({ "error": "User not found" });
        }
        res.status(200).send({ "user_data": user });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ "error": error.message });
    }
});

/**
 * @swagger
 * /image/{user_id}:
 *   get:
 *     summary: Get user image by user ID
 *     description: Retrieve the user image by providing the user ID as a parameter.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         description: User ID to retrieve the user image
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved user image URL
 *         schema:
 *           type: object
 *           properties:
 *             user_data:
 *               type: string
 *       404:
 *         description: User not found
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


userDataRouter.get('/image/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const user = await UserDataModel.findOne({ user_id: user_id });
        if (!user) {
            return res.status(404).json({ "error": "User not found" });
        }
        res.status(200).send({ "user_data": user.user_image });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ "error": error.message });
    }
});

/**
 * @swagger
 * /update/{user_id}:
 *   put:
 *     summary: Update user data by user ID
 *     description: Update user data by providing the user ID as a parameter and the new data in the request body.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         description: User ID to update user data
 *         required: true
 *         type: string
 *       - in: body
 *         name: userData
 *         description: Updated user data
 *         required: true
 *         schema:
 *           type: object
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User data updated successfully
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

userDataRouter.put("/update/:user_id",authenticate, async (req, res) => {
    const user_id = req.params.user_id;
    const data=req.body;
    try {
        await UserDataModel.findOneAndUpdate({user_id:user_id},data, { new: true });
        res.status(200).send({ "msg": "User data has been updated from database" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ "error": error.message });
    }
})

/**
 * @swagger
 * /delete/{user_id}:
 *   delete:
 *     summary: Delete user by user ID
 *     description: Delete a user by providing the user ID as a parameter.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         description: User ID to delete a user
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User deleted successfully
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

userDataRouter.delete("/delete/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    try {
        await UserDataModel.deleteOne({ user_id: user_id });
        res.status(200).send({ "msg": "User deleated from database" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ "error": error.message });
    }
})


/**
 * @swagger
 * /userLogin:
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
userDataRouter.post("/userLogin", async (req, res) => {
    const { user_email, user_password } = req.body;
    try {
        const user = await UserDataModel.findOne({ user_email: user_email });
        console.log(user)
        if (user) {
            bcrypt.compare(user_password, user.user_password, async (err, result) => {
                if (result) {
                    let loginTime = new Date();
                    await UserDataModel.findOneAndUpdate(
                        { user_id: user.user_id },
                        { $set: { last_logged_in: loginTime } },
                        { new: true }
                    );
                    res.status(200).send({ msg: "Login successfull" });
                } else {
                    res.status(400).send({ msg: "Password is incorrect" });
                }
            });
        } else {
            res.status(404).send({ msg: "Email does not exist" });
        }
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
});


module.exports = {
    userDataRouter
}