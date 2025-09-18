const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./middlewares/logger");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");

const connectDB = require('./db')
// const productRoutes = require("./routes/productRoutes.js");
// const categoryRoutes = require("./routes/categoryRoutes.js");
require("dotenv").config();

// app.use(
//   cors({
//     origin: "*",
//   })
// );

app.use(
  cors()
);

app.use(express.json());
app.use(logger);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something's wrong :( Please try again later.");
});


app.use(cors());


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes)

// app.use("/api/users", require("./routes/userRoutes"));

// app.use("/api/cart", require("./routes/cartRoutes"));
// app.use("/api/orders", require("./routes/orderRoutes"));

// const fs = require('fs');
// const uploadDir = 'uploads';
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
// app.use('/uploads', express.static('uploads'));
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`${port} works!`);
});
