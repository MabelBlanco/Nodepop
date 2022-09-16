const express = require('express');
const router = express.Router();

const Advertisement = require ('../../models/Advertisement')

router.get ('/', async (req, res, next) => {
  try {
    const advertisements = await Advertisement.find()
    
    res.json ({results: advertisements})
  } catch (error) {
    next(error)
  }
    
})

router.put ('/:id', async (req, res, next) => {
  try {
    const idAdvertisement = req.params.id
    const body = req.body

    const advertisementModified = await Advertisement.findOneAndUpdate({_id : idAdvertisement}, body, {new:true})

    res.json (advertisementModified)
  } catch (error) {
    next (error)
  }
})

module.exports = router