// Cart.js
// ----------------------------
// Fields:
// - userId: ObjectId (ref: User)
// - items: array of { productId, quantity, price }
// - totalPrice: Number
// - updatedAt
const mongoose = require('mongoose')

const cartItemSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },  
    price: { type: Number, required: true },  
}, { _id: false });

const cartSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },             
  items: [cartItemSchema], 
  totalPrice: { type: Number, required: true, default: 0 },             
},{ timestamps: true }
);


cartSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce((acc, item) => acc + item.price, 0);
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;