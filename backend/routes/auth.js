const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const fatchuser = require('../middleware/fatchuser')
var jwt = require('jsonwebtoken')
const JWT_SECRET = 'AaryaTheGR8';
//create account
// router.post('/', (req, res) => {
//     // console.log(req.body);
//     const user = User(req.body);
//     user.save();
//     res.send(req.body);
// })



// ROUTE 1 = create account using validators and no login required
router.post('/newuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isStrongPassword().isLength({ min: 5 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)
            //  check if user exists
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: "sorry a user with this email already exist" })
            }
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            // console.log();
            res.json({ authToken })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("SOME ERROR OCCURED");
        }
    })




//ROUTE 2 =  fatch user or login
router.post('/login', [
    body('email').isEmail(),
    body('password', "password cannot be blank").exists(),
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json("try to login with correct input");
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json("try to login with correct input");
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            // console.log();
            res.json({ authToken })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("INTERNAL SERVER ERROR");
        }
    })




// ROUTE 3 = GET USER DETAILS /API/AUTH/GETUSER
router.post('/getuser', fatchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("INTERNAL SERVER ERROR");
    }
})
module.exports = router