module.exports = app => {
  const express = require("express");
  const router = express.Router({ mergeParams: true });
  const mongoose = require("mongoose");
  const Category = require("../../../libs/db/models/Category");
  const Article = require("../../../libs/db/models/Article");
  const Banner = require("../../../libs/db/models/Banner");

  router.get("/", async (req, res) => {
    const { category = "" } = req.query;
    const p = await Category.findOne({ name: category });

    const cats = await Category.aggregate([
      {
        $match: { pid: p._id },
      },
      {
        $lookup: {
          from: "banners",
          localField: "_id",
          foreignField: "categories",
          as: "banner",
        },
      },
    ]);

    res.send({
      code: 0,
      data: cats,
    });
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const { page = 1, limit = 10 } = JSON.parse(req.query.query);
    const skip = (page - 1) * limit;
    const cat = await Category.findById(id);
    const newsList = await Article.find({
      categories: { $in: [cat._id] },
    })
      .skip(skip)
      .limit(limit);

    const data = JSON.parse(JSON.stringify(cat));
    data.newsList = newsList;

    // const items = await Category.aggregate([
    //   {
    //     $match: { _id: new mongoose.Types.ObjectId(id) },
    //   },
    //   {
    //     $lookup: {
    //       from: "articles",
    //       localField: "_id",
    //       foreignField: "categories",
    //       as: "newsList",
    //     },
    //   },
    // ]);

    res.send({
      code: 0,
      message: "请求成功",
      data: data,
    });
  });

  app.use("/web/api/competitions", router);
};
