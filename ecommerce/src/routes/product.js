const express = require("express");
const router = new express.Router();

const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { productById, create, read, update, remove, readList, relatedList, categoryList, listBySearch, photo, listSearch } = require("../controllers/product");

router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/product/:productId", read);
router.put("/product/:productId/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/product/:productId/:userId", requireSignin, isAuth, isAdmin, remove);
router.get("/products", readList);
router.get("/products/related/:productId", relatedList);
router.get("/products/categories", categoryList);
router.post("/products/by/search", listBySearch);
router.get("/products/search", listSearch);
router.get("/product/photo/:productId", photo);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;