const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')


//signup route
router.post('/signup', (req, res) => {
    const { fname, lname, email, age, dob, password, conpassword, address1, address2, country, city, pic } = req.body
    if (!email || !password || !fname || !lname || !conpassword || !age || !dob || !address1 || !address2 || !country || !city) {
        //understood the req but cannot process it
        return res.status(422).json({ error: 'please add all the feilds' })
    }
    else if (password !== conpassword) {

        return res.status(422).json({ error: 'no match' })
    }
    else if (password.length < 8) {
        return res.status(422).json({ error: 'Your password must contain at least 8 characters.' })
    }
    else if (password.search(/[a-z]/i) < 0) {
        return res.status(422).json({ error: 'Your password must contain at least one letter.' })
    }
    else if (password.search(/[0-9]/) < 0) {
        return res.status(422).json({ error: 'Your password must contain at least one digit.' })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: 'user already exists with this email' })
            }
            //password hashing
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        password: hashedpassword,
                        fname,
                        lname,
                        age,
                        dob,
                        address1,
                        address2,
                        country,
                        city,
                        conpassword,
                        pic
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: 'saved successfully' })
                        })
                        .catch(err => {
                            console.log(err)
                        })

                })

        })
        .catch(err => {
            console.log(err)
        })
})

//signin route -Login
router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: 'please add email or password' })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // res.json({message: "successfully signed in"})
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const { _id, fname, email, pic } = savedUser
                        res.json({ token, user: { _id, fname, email, pic } })
                    }
                    else {
                        return res.status(422).json({ error: "Invalid email or password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})

module.exports = router