const express = require('express')
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app =express();
const PORT=process.env.PORT || 8080;
mongoose.connect('',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const mongodburl = 'mongodb+srv://mongo:jonathan@cluster0.2uncw.mongodb.net/?retryWrites=true&w=majority';