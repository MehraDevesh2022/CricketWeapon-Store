const asyncWrapper = require("../middleWare/asyncWrapper");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// process the payment
exports.processPayment = asyncWrapper(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount, // corrected typo "ammount" to "amount"
    currency: "inr",
    metadata: {
      company: "Ecommerce", // not mandatory
    },
  });

  res.status(200).json({ success: true, client_secret: myPayment.client_secret });
});

// send STRIPE_API_KEY to user
exports.sendStripeApiKey = asyncWrapper(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
