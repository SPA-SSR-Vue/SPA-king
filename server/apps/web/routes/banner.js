module.exports = app => {
  const express = require("express");
  const router = express.Router({ mergeParams: true });
  const Banner = require("../../../libs/db/models/Banner");

  router.get("/", async (req, res) => {
    const { name = "" } = req.query;
    // condition
    const banner = await Banner.findOne({ name });
    res.send({
      success: true,
      message: "请求成功",
      data: banner,
    });
  });

  app.use("/web/api/banners", router);
};
