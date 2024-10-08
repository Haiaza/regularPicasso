const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const Painting = require('../models/painting.js')
const mongoose = require('mongoose')

router.get('/', async (req, res) => {
    try {
        const users = await User.find({}) 
        res.render('users/index.ejs', { users })
}   catch (error) {
        console.error(error)
        res.redirect('/')
}
});

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const userIdObject = new mongoose.Types.ObjectId(userId)
        const user = await User.findById(userIdObject)

    if (!user) {
        return res.redirect('/users')
    }
    
    const userPaintings = await Painting.find({ owner: userId})

    res.render('users/show.ejs', { 
        user, 
        paintings: userPaintings 
    })
    } catch (error) {
    console.error(error)
    res.redirect('/users')
    }
})


module.exports = router