const mongoose = require('mongoose')

const paintingSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, unique: true },
        
    Description: { 
        type: String, 
        required: true },

    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true }
})

const Painting = mongoose.model('Painting', paintingSchema)

module.exports = Painting