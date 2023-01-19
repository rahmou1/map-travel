const router = require("express").Router();
const Pin = require("../models/Pin");

//TODO create pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json({ status: "true", message: savedPin });
  } catch (error) {
    res
      .status(500)
      .send({ status: "false", message: `there is something wrong ${error}` });
  }
});

//todo get all pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json({ status: "true", message: pins });
  } catch (error) {
    res
      .status(500)
      .send({ status: "false", message: `there is something wrong ${error}` });
  }
});

module.exports = router;
