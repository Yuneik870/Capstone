const { Router } = require("express");
const Checkout = require("../models/CheckOut");

const router = Router();

module.exports = router;

router.post("/", (request, response) => {
  const newCheckout = new Checkout.model(request.body);
  newCheckout.save((error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

router.get("/", (request, response) => {
  Checkout.model.find({}, (error, record) => {
    //this line of code is not needed directly below
    if (error) return response.sendStatus(500).json(error);
    //returns the response (which is a record) in a json format
    return response.json(record);
  });
});

// Get a single record by ID using a query parameter
router.get("/:id", (request, response) => {
  Checkout.model.findById(request.params.id, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

router.get("/crust/:crust", (request, response) => {
  Checkout.model.find({ product: request.params.product }, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

router.delete("/:product", (request, response) => {
  Checkout.model.findByIdAndRemove(
    request.params.product,
    {},
    (error, record) => {
      if (error) return response.sendStatus(500).json(error);
      return response.json(record);
    }
  );
});

router.put("/:product", (request, response) => {
  const body = request.body;
  this.checkout.model.findByIdAndUpdate(
    request.params.retailer,
    {
      $set: {
        // Take note that the customer is not included, so it can't
        product: body.product,
        price: body.price
      }
    },
    {
      //returns new update by replacing the default record in the params below
      new: true,
      //updates and inserts
      upsert: true
    },
    (error, record) => {
      if (error) return response.sendStatus(500).json(error);
      return response.json(record);
    }
  );
});

module.exports = router;
