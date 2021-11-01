const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const uuid = require('uuid');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        unique: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);