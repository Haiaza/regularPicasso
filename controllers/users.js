const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const Painting = require('../models/painting.js')

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
        const user = await User.findById(userId) 
        const paintings = await Painting.find(userId.username) 

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

router.get('/:userId/', async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await User.findById(userId) 

    if (!user) {
        return res.redirect('/users')
    }
    res.render('users/show.ejs', { user, painting })
    } catch (error) {
    console.error(error)
    res.redirect('/users')
    }
})

module.exports = router