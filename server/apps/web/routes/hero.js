module.exports = app => {
  const express = require("express");
  const router = express.Router({ mergeParams: true });
  const mongoose = require("mongoose");

  const Category = require("../../../libs/db/models/Category");
  const Hero = require("../../../libs/db/models/Hero");
  const Skill = require("../../../libs/db/models/Skill");

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

    // heroes = JSON.parse(JSON.stringify(heroes)).map(item => {
    //   item.heroList.map(hero => ({
    //     name: hero.name,
    //     avatar: hero.avatar,
    //   }));
    //   return item;
    // });

    let hotHeroList = await Hero.aggregate([
      {
        $match: { isHot: true },
      },
      {
        $limit: 10,
      },
      {
        $sort: { updatedAt: -1 },
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

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const hero = await Hero.findById(id).populate(
      "categories items1 items2 skillSug.major skillSug.minor skillSug.summoners partners.hero controllers.hero restrainers.hero"
    );

    const skills = await Skill.find({
      hero: new mongoose.Types.ObjectId(id),
    });

    const item = JSON.parse(JSON.stringify(hero));
    const s = JSON.parse(JSON.stringify(skills));

    item.skills = s;

    res.send({
      code: 0,
      data: item,
    });
  });

  app.use("/web/api/heroes", router);
};
