const mongoose = require("mongoose");
const Cart = require("./models/Cart");
const Order = require("./models/Order");
const User = require("./models/User");
const { Product } = require("./models/Product");

async function seedCartsAndOrders() {
  try {
    await mongoose.connect(
      "mongodb+srv://EcoMeanDB:EcoMeanDB2025@ecommerce-mean-db.9ac0d4z.mongodb.net/"
    );

    // Clear only carts & orders (don’t touch users, products, categories)
    await Cart.deleteMany({});
    await Order.deleteMany({});

    const users = await User.find();
    const products = await Product.find();

    if (users.length < 2 || products.length < 5) {
      console.log("Need at least 2 users and 5 products to seed carts/orders");
      return process.exit(1);
    }

    // helper function to calculate totals
    const calcCartTotals = (items) => {
      const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const shipping = 20;
      const tax = subtotal * 0.05; 
      const orderTotal = subtotal + shipping + tax;
      return { totalPrice: subtotal, shipping, tax, orderTotal };
    };

const cart1Items = [
  {
    product: products[0]._id,
    quantity: 2,
    price: products[0].price * 2, // price = product price * quantity
  },
  {
    product: products[1]._id,
    quantity: 1,
    price: products[1].price * 1,
  },
];

const cart2Items = [
  {
    product: products[2]._id,
    quantity: 3,
    price: products[2].price * 3,
  },
];


    const cart1Totals = calcCartTotals(cart1Items);
    const cart2Totals = calcCartTotals(cart2Items);

    const carts = await Cart.insertMany([
      {
        userId: users[0]._id,
        items: cart1Items,
        ...cart1Totals,
      },
      {
        userId: users[1]._id,
        items: cart2Items,
        ...cart2Totals,
      },
      {
        userId: users[11]._id,
        items: cart2Items,
        ...cart2Totals,
      },
    ]);

function randomDate(daysOffset = 0, past = false) {
  const date = new Date();
  if (past) {
    date.setDate(date.getDate() - daysOffset);
  } else {
    date.setDate(date.getDate() + daysOffset);
  }
  return date;
}

const orders = await Order.insertMany([
  {
    user: users[0]._id,
    items: [
      {
        product: products[3]._id,
        quantity: 1,
        price: products[3].price * 1,
      },
    ],
    shippingAddress: users[0].address,
    paymentMethod: "Credit Card",
    shippingPrice: 20,
    totalPrice: products[3].price * 1 + 20,
    status: "Pending",
    deliveryDate: randomDate(5, false),
  },
  {
    user: users[0]._id,
    items: [
      {
        product: products[4]._id,
        quantity: 2,
        price: products[4].price * 2,
      },
    ],
    shippingAddress: users[0].address,
    paymentMethod: "COD",
    shippingPrice: 15,
    totalPrice: products[4].price * 2 + 15,
    status: "Shipped",
    deliveryDate: randomDate(2, false),
  },
  {
    user: users[1]._id,
    items: [
      {
        product: products[5]._id,
        quantity: 1,
        price: products[5].price * 1,
      },
      {
        product: products[6]._id,
        quantity: 2,
        price: products[6].price * 2,
      },
    ],
    shippingAddress: users[1].address,
    paymentMethod: "Credit Card",
    shippingPrice: 25,
    totalPrice: products[5].price * 1 + products[6].price * 2 + 25,
    status: "Delivered",
    deliveryDate: randomDate(7, true),
  },
  {
    user: users[11]._id,
    items: [
      {
        product: products[5]._id,
        quantity: 1,
        price: products[5].price * 1,
      },
      {
        product: products[6]._id,
        quantity: 2,
        price: products[6].price * 2,
      },
    ],
    shippingAddress: users[1].address,
    paymentMethod: "Credit Card",
    shippingPrice: 25,
    totalPrice: products[5].price * 1 + products[6].price * 2 + 25,
    status: "Delivered",
    deliveryDate: randomDate(3, true),
  },
]);

    console.log("✅ Carts and Orders seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedCartsAndOrders();
