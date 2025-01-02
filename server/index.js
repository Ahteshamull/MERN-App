require("dotenv").config();
const express = require("express");
const DbConnect = require("./db/dbConnect");
const cors = require("cors");
const authRouter = require("./routes/auth");
const products = require("./routes/products")
const PORT = process.env.PORT || 8080;
const app = express();
DbConnect();
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
// app.use("/products", products);
app.listen(PORT, () => {
  console.log(`Server Is Running ${PORT}`);
});
