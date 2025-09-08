// Order.js
// ----------------------------
// Fields:
// - userId: ObjectId (ref: User)
// - items: array of { productId, quantity, price }
// - totalPrice: Number
// - shippingDetails: { address, city, postalCode, phone }
// - paymentMethod: enum ["COD", "Credit Card"]
// - status: enum ["Pending", "Shipped", "Delivered"], default "Pending"
// - timestamps
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number, 
    required: true
  }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  shippingAddress: {
    type: String
    // label: { type: String, default: "Home" },
    // country: { type: String, required: true },
    // street: { type: String, required: true },
    // buildingNameOrNo: { type: String, required: true },
    // floor: { type: Number, required: true },
    // apartmentNo: { type: Number, required: true },
    // city: { type: String, required: true },
    // postalCode: String,
    },
  paymentMethod: {
    type: String,
    enum: ['COD', 'Credit Card', 'PayPal'],
    default: 'COD'
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  }
}, { timestamps: true });

orderSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce((acc, item) => acc + item.price, 0);
  this.totalPrice += this.shippingPrice;
  next();
});

module.exports = mongoose.model('Order', orderSchema);