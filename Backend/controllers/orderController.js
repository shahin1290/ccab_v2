const { validationResult } = require('express-validator')
const User = require('../models/userModel')
const Order = require('../models/orderModel')
const Bootcamp = require('../models/bootcampModel')
const stripe = require('stripe')(process.env.STRIPE_SECRET)
//********** Validation Result ************

function getValidationResualt(req) {
  const error = validationResult(req)
  if (!error.isEmpty()) return error.array()
  return false
}

//@ DESC POST A NEW order
//@ ROUTE /api/order/
//@ access login user
exports.createOrder = async (req, res) => {
  const { token, amount } = req.body

  const bootcamp = await Bootcamp.findById(req.params.bootcampId)

  try {
    const charge = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      confirm: true,
      payment_method: token
    })

    const user = await User.findById(req.user._id)

    const newOrder = new Order({
      course: bootcamp._id,
      orderBy: user._id,
      amount: charge.amount,
      charge: charge.id
    })

    const order = await newOrder.save()

    if (order) return res.status(201).json({ success: true, data: order })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error' + error
    })
  }
}

//@ DESC GET All orders for student
//@ ROUTE /api/order/
//@ access login user
exports.studentOrders = async (req, res) => {
  try {
    const studentOrders = await Order.find({ orderBy: req.user._id }).populate(
      'course',
      'name'
    )

    if (!studentOrders.length) {
      return res.status(404).json({
        success: false,
        error: "You don't have any Order yet."
      })
    }

    return res.status(200).json({
      success: true,
      data: studentOrders
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error: ' + error.message
    })
  }
}
