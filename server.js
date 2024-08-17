const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
mongoose.connection.on("connected", () =>{
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})
mongoose.connection.on('error', () => {
    console.error()
})

app.listen(3000, () =>{
    console.log('Running on 3000')
})