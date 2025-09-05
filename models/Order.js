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
