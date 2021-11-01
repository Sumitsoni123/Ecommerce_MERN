const express = require("express");
const router = new express.Router();

const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { categoryById, create, read, update, remove, readList } = require("../controllers/category");

router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/category/:categoryId", read);
router.put("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, remove);
router.get("/categories", readList);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;