module.exports = app => {
  const express = require("express");
  const router = express.Router({ mergeParams: true });
  const mongoose = require("mongoose");
  const Category = require("./../../../libs/db/models/Category");
  const Article = require("./../../../libs/db/models/Article");
  const Banner = require("./../../../libs/db/models/Banner");

  router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const items = await Category.aggregate([
      {
        $match: { _id: id },
      },
      {
        $lookup: {
          from: "banners",
          localField: "_id",
          foreignField: "category",
          as: "banner",
        },
      },
      {
        $lookup: {
          from: "articles",
          localField: "_id",
          foreignField: "categories",
          as: "articles",
        },
      },
    ]);

    res.send({
      code: 0,
      message: "请求成功",
      data: items[0],
    });
  });

  app.use("/web/api/competitions", router);
};
