module.exports = app => {
  const express = require("express");
  const router = express.Router({ mergeParams: true });
  const Category = require("../../../libs/db/models/Category");
  const Hero = require("../../../libs/db/models/Hero");

  router.get("/", async (req, res) => {
    let { category = "" } = req.query;
    let items = [];
    const parentCat = await Category.findOne({ name: category });
    let childCat = await Category.find({ pid: parentCat._id });
    childCat = childCat.map(cat => cat._id);

    let heroes = await Category.aggregate([
      {
        $match: { pid: parentCat._id },
      },
      {
        $lookup: {
          from: "heroes",
          localField: "_id",
          foreignField: "categories",
          as: "heroList",
        },
      },
    ]);

    let hotHeroList = await Hero.aggregate([
      {
        $match: { categories: { $in: childCat } },
      },
      {
        $sample: { size: 10 },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
        },
      },
    ]);

    heroes.unshift({
      name: "热门",
      heroList: hotHeroList,
    });

    items = heroes;

    res.send({
      success: true,
      message: "请求成功",
      data: items,
    });
  });

  app.use("/web/api/heroes", router);
};
