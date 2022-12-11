const express = require("express");
const router = express.Router();
const upload = require("../../modules/uploadConfig");

const Advertisement = require("../../models/Advertisement");

router.get("/", async (req, res, next) => {
  try {
    //filters
    const name = req.query.name;
    const sale = req.query.sale;
    const price = req.query.price;
    const tags = req.query.tags;

    //pagination
    const skip = req.query.skip;
    const limit = req.query.limit;

    // create the filter
    const filter = {};

    if (name) {
      filter.name = { $regex: "^" + name, $options: "i" };
    }
    if (sale) {
      filter.sale = sale;
    }
    if (price) {
      // create the filter price (min and max)
      const priceArray = price.split("-");
      if (priceArray.length > 1) {
        const pricemin = priceArray[0];
        const pricemax = priceArray[1];

        if (pricemin === "") {
          filter.price = { $lte: pricemax };
        } else if (pricemax === "") {
          filter.price = { $gte: pricemin };
        } else {
          filter.price = { $gte: pricemin, $lte: pricemax };
        }
      } else {
        filter.price = price;
      }
    }
    if (tags) {
      filter.tags = tags;
    }

    const advertisements = await Advertisement.find(filter)
      .skip(skip)
      .limit(limit);

    res.json({ results: advertisements });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const idAdvertisement = req.params.id;
    const body = req.body;

    const advertisementModified = await Advertisement.findOneAndUpdate(
      { _id: idAdvertisement },
      body,
      { new: true }
    );

    res.json(advertisementModified);
  } catch (error) {
    next(error);
  }
});

router.post("/", upload.single("photo"), async (req, res, next) => {
  try {
    const bodyAdvertisement = req.body;

    bodyAdvertisement.photo = `http://localhost:3000/images/advertisements/${req.file.filename}`;

    const newAdvertisement = new Advertisement(bodyAdvertisement);

    const saveAdvertisement = await newAdvertisement.save();

    res.json({ result: saveAdvertisement });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const idAdvertisement = req.params.id;

    const advertisementDeleted = await Advertisement.findOneAndDelete({
      _id: idAdvertisement,
    });

    res.json(advertisementDeleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
