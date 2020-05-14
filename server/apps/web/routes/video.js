module.exports = app => {
  const express = require("express");
  const router = express.Router({ mergeParams: true });
  const Category = require("../../../libs/db/models/Category");
  const Video = require("../../../libs/db/models/Video");

  router.get("/", async (req, res) => {
    let { category = "" } = req.query;
    let items = [];
    const parentCat = await Category.findOne({ name: category });
    let childCat = await Category.find({ pid: parentCat._id });
    childCat = childCat.map(cat => cat._id);

    items = await Category.aggregate([
      {
        $match: { pid: parentCat._id },
      },
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "categories",
          as: "videoList",
        },
      },
    ]);

    res.send({
      success: true,
      message: "请求成功",
      data: items,
    });
  });

  app.use("/web/api/videos", router);
};
