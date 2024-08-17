const express = require('express')
const router = express.Router();
const Painting = require('../models/painting.js')

router.get('/', async (req, res) => {
    try {
        const paintings = await Painting.find({ owner: req.session.user._id });
        res.render('paintings/index.ejs', { paintings });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body
        const newPainting = new Painting({
            name,
            description,
            owner: req.session.user._id
        });
        await newPainting.save();
        res.redirect(`/users/${req.session.user._id}/paintings`)
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
});

router.get('/new', (req, res) => {
    res.render('paintings/new.ejs')
});


router.get('/:paintingId', async (req, res) => {
    try {
        const painting = await Painting.findById(req.params.paintingId)
        res.render('paintings/show.ejs', { painting })
    } catch (error) {
        console.error(error)
        res.redirect(`/users/${req.session.user._id}/paintings`)
    }
});

router.get('/:paintingId/edit', async (req, res) => {
    try {
        const painting = await Painting.findById(req.params.paintingId)
        if (!painting) {
            return res.redirect(`/users/${req.session.user._id}/paintings`)
        }
        res.render('paintings/edit.ejs', { painting })
    } catch (error) {
        console.error('Error grabbing painting for edit:', error)
        res.redirect(`/users/${req.session.user._id}/paintings`)
    }
});

router.put('/:paintingId', async (req, res) => {
    try {
        const { name, description } = req.body
        await Painting.findByIdAndUpdate(req.params.paintingId, { name, description })
        res.redirect(`/users/${req.session.user._id}/paintings`)
    } catch (error) {
        console.error('Error updating painting:', error)
        res.redirect(`/users/${req.session.user._id}/paintings`)
    }
});

router.delete('/:paintingId', async (req, res) => {
    try {
        await Painting.findByIdAndDelete(req.params.paintingId)
        res.redirect(`/users/${req.session.user._id}/paintings`)
    } catch (error) {
        console.error('Error deleting painting:', error)
        res.redirect(`/users/${req.session.user._id}/paintings`)
    }
});

module.exports = router;