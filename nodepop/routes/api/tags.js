const express = require('express');
const router = express.Router();

const Advertisement = require ('../../models/Advertisement')

router.get ('/', async (req, res, next) => {
    try {
        
        const tagsObject = await Advertisement.find ({}, {tags:1, _id:0})

        const tags = []
        
        tagsObject.map (object => {
            object.tags.map(tag => {
                if (!tags.includes(tag)) {
                tags.push(tag)
                }
            })
        })

        res.json({results: tags})

    } catch (error) {
        next (error)        
    }
})

module.exports = router