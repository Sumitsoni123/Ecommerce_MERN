const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Category = require('../models/category');
const { errorHandler } = require('../helpers/dberror');

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'category not found'
            });
        }
        req.category = category;
        next();
    });
};

exports.create = (req, res) => {
    const category = new Category(req.body);

    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({ data });
    })
};

exports.read = (req, res) => {
    return res.json(req.category);
};

exports.update = (req, res) => {
    let category = req.category;
    category.name = req.body.name;

    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({ data });
    })
};

exports.remove = (req, res) => {
    let category = req.category;

    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: `Category: ${category.name} deleted Sucessfully`
        });
    })
};


exports.readList = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    });
};


