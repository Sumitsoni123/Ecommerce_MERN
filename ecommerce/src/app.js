require("dotenv").config();
require("../src/db/conn");
const port = process.env.PORT || 8000;
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const express = require('express');
const app = express();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/order");


app.use(morgan('dev')); // middleware
app.use(express.json()); // to get json data from req body
app.use(cookieParser()); // to get cookies from browser
app.use(expressValidator());
app.use(cors());

app.use("/api", authRoutes); // routes middleware
app.use("/api", userRoutes); // ---same---
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);

app.listen(port, () => {
    console.log(`server is running at ${port}`);
});