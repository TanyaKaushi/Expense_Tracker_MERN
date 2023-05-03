const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("User")


//retreive posts pf specific user
router.get('/mypost',requireLogin, (req,res) =>{
    Post.find({postedBy:req.user._id})
    .populate( "_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports = router