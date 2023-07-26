const express = require("express");
const {connectMongoDB} = require("./config/DB")
const cors = require("cors");
const cookieSession = require("cookie-session");
const authRoute = require("./Routes/authRoutes");
const cartRoute = require("./Routes/cartRoutes");
const reviewRoute = require("./Routes/reviewRoutes");
const wishlistRoute = require("./Routes/wishlistRoutes");
const productRoute = require("./Routes/productRoutes");
const userRoute = require("./Routes/userRoutes");
const morgan = require("morgan");
const path = require('path');
// const routes = require("./routes/ToDoRoute");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5005;

connectMongoDB();

app.use(cors({ origin: `${process.env.FRONT_END_URL}`, credentials: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["Pragun"],
    maxAge: 24 * 60 * 60 * 1000,
    // secure:true
  })
);
app.use(morgan("dev"));
app.use(express.json());



// app.use((req, res, next) => {
//   console.log("User:", req.user); // Accessing req.user in middleware
//   next();
// });



app.use("/auth", authRoute);
app.use("/cart", cartRoute);
app.use("/wishlist", wishlistRoute);
app.use("/reviews", reviewRoute);
app.use("/product",productRoute)
app.use("/users",userRoute)
// app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is connected on port: ${PORT}`);
});
