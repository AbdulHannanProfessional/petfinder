const express = require("express");
const router = express.Router();

// import CartRoute from "./routes/CartRoute.js";
const CartRoute = require("./CartRoute.js")
const AuthRoutes = require("./AuthRoute");
const AdminRoute = require("./AdminRoute");
const PetsRoute = require("./PetsRoute");

router.use("/cart", CartRoute);
router.use("/api/cart", CartRoute);
router.use("/auth", AuthRoutes);
router.use("/api/auth", AuthRoutes);
router.use("/admin", AdminRoute);
router.use("/api/admin", AdminRoute);
router.use("/pets", PetsRoute);
router.use("/api/pets", PetsRoute);

module.exports = router;
