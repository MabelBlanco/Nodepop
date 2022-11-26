var express = require("express");
var router = express.Router();

const Advertisement = require("../models/Advertisement");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    //filters
    const name = req.query.name;
    const sale = req.query.sale;
    const price = req.query.price;
    const tags = req.query.tags;

    //pagination
    const skip = req.query.skip;
    const limit = req.query.limit;

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

    res.locals.advertisements = await Advertisement.find(filter)
      .skip(skip)
      .limit(limit);

    res.render("index", {
      title: res.__n("Advertisements", res.locals.advertisements.length),
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
