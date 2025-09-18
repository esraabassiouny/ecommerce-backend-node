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
      console.log("❌ Need at least 2 users and 5 products to seed carts/orders");
      return process.exit(1);
    }

    // helper function to calculate totals
    const calcCartTotals = (items) => {
      const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const shipping = subtotal > 100 ? 0 : 20; // free shipping if > 100
      const tax = subtotal * 0.14; // 14% VAT
      const orderTotal = subtotal + shipping + tax;
      return { totalPrice: subtotal, shipping, tax, orderTotal };
    };

    // Assign some products to carts
    const cart1Items = [
      {
        product: products[0]._id,
        quantity: 2,
        price: products[0].price,
      },
      {
        product: products[1]._id,
        quantity: 1,
        price: products[1].price,
      },
    ];
    const cart2Items = [
      {
        product: products[2]._id,
        quantity: 3,
        price: products[2].price,
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
    ]);

    // Insert some orders (leave as-is, or update later with tax too if needed)
    const orders = await Order.insertMany([
      {
        user: users[0]._id,
        items: [
          {
            product: products[3]._id,
            quantity: 1,
            price: products[3].price,
          },
        ],
        shippingAddress: users[0].address,
        paymentMethod: "Credit Card",
        shippingPrice: 20,
        totalPrice: products[3].price + 20,
        status: "Pending",
      },
      {
        user: users[0]._id,
        items: [
          {
            product: products[4]._id,
            quantity: 2,
            price: products[4].price,
          },
        ],
        shippingAddress: users[0].address,
        paymentMethod: "COD",
        shippingPrice: 15,
        totalPrice: products[4].price * 2 + 15,
        status: "Shipped",
      },
      {
        user: users[1]._id,
        items: [
          {
            product: products[5]._id,
            quantity: 1,
            price: products[5].price,
          },
          {
            product: products[6]._id,
            quantity: 2,
            price: products[6].price,
          },
        ],
        shippingAddress: users[1].address,
        paymentMethod: "Credit Card",
        shippingPrice: 25,
        totalPrice: products[5].price + products[6].price * 2 + 25,
        status: "Delivered",
      },
      {
        user: "68bd2d8494e30b8403859f1c",
        items: [
          {
            product: products[5]._id,
            quantity: 1,
            price: products[5].price,
          },
          {
            product: products[6]._id,
            quantity: 2,
            price: products[6].price,
          },
        ],
        shippingAddress: users[1].address,
        paymentMethod: "Credit Card",
        shippingPrice: 25,
        totalPrice: products[5].price + products[6].price * 2 + 25,
        status: "Delivered",
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
