const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose"); 
const logger = require("./middleware/logger");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(logger);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something wrong :(");
});


mongoose
  .connect(
    "mongodb+srv://EcoMeanDB:EcoMeanDB2025@ecommerce-mean-db.9ac0d4z.mongodb.net/"
  )
  .then(() => {
    console.log(" DB CONNECTED Successfully ");
  })
  .catch((err) => {
    console.log(err.message);
  });


// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/products", require("./routes/productRoutes"));
// app.use("/api/categories", require("./routes/categoryRoutes"));
// app.use("/api/cart", require("./routes/cartRoutes"));
// app.use("/api/orders", require("./routes/orderRoutes"));


let port = 5000;
app.listen(port, () => {
  console.log(`${port} works!`);
});
