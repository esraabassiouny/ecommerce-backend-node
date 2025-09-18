// Cart.js
// ----------------------------
// Fields:
// - userId: ObjectId (ref: User)
// - items: array of { productId, quantity, price }
// - totalPrice: Number (subtotal)
// - shipping: Number
// - tax: Number
// - orderTotal: Number
// - updatedAt

const mongoose = require('mongoose')

const cartItemSchema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  price: { type: Number, required: true },  // price * quantity already or per unit
}, { _id: false });

const cartSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  items: [cartItemSchema],

  totalPrice: { type: Number, required: true, default: 0 }, // subtotal
  shipping: { type: Number, required: true, default: 20 },
  tax: { type: Number, required: true, default: 0 },
  orderTotal: { type: Number, required: true, default: 0 },

}, { timestamps: true });

cartSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  this.shipping = this.totalPrice > 100 ? 0 : 20;   
  this.tax = this.totalPrice * 0.14;              
  this.orderTotal = this.totalPrice + this.shipping + this.tax;

  next();
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
