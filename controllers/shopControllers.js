import asyncHandler from "express-async-handler";
import Shop from "../models/shopModel.js";

// @desc    Fetch all shops
// @route   GET /api/shops
// @access  Public
const getShops = asyncHandler(async (req, res) => {
  const shops = await Shop.find({});

  res.json(shops);
});

// @desc    Fetch single shop
// @route   GET /api/shop/:id
// @access  Public
const getShopById = asyncHandler(async (req, res) => {
    const shop = await Shop.findById(req.params.id);
  
    if (shop) {
      res.json(shop);
    } else {
      res.status(404);
      throw new Error("Shop not found");
    }
});

// @desc    DELETE  Shop
// @route   DELETE /api/Shops/:id
// @access  Public

const deleteShop = asyncHandler(async (req, res) => {
    const shop = await Shop.findById(req.params.id);
  
    if (shop) {
      await Shop.remove();
      res.json({ message: "Shop Removed  Successfully" });
    } else {
      res.status(404);
      throw new Error("Shop Not Found");
    }
});

// @desc    Create a shop
// @route   POST /api/shops
// @access  Public
const createShop = asyncHandler(async (req, res) => {
    const shop = new Shop({
      name: "Sample name",
      area: "Sample Area",
      category: "Sample category",
      openingDate: (new Date('2018-01-01')).toUTCString(),
      closingDate: (new Date('2020-12-31')).toUTCString()
    });
  
    const createdShop = await shop.save();
    res.status(201).json(createdShop);
});
  
  // @desc    Update a Product
  // @route   PUT /api/shop/:id/edit
  // @access  Public
  const updateShop = asyncHandler(async (req, res) => {
    const { name, area, category, openingDate, closingDate } =
      req.body;
  
    const shop = await Shop.findById(req.params.id);
    if (shop) {
      shop.name = name;
      shop.area = area;
      shop.category = category;
      shop.openingDate = openingDate;
      shop.closingDate = closingDate;

      const updatedShop = await shop.save();
      res.json(updatedShop);
    } else {
      res.status(404);
      throw new Error("Shop Not Found");
    }
});

export {getShops, getShopById, createShop, updateShop, deleteShop}