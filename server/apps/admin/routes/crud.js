module.exports = app => {
  const express = require("express");
  const router = express.Router({ mergeParams: true });
  const authMiddleware = require("./../../../libs/middleware/auth")();
  const resourceMiddleware = require("./../../../libs/middleware/resource")();

  const Category = require("./../../../libs/db/models/Category");

  router.post("/", async (req, res, next) => {
    const item = req.body;
    const data = await req.Model.create(item);
    // const data = await crudService.create(req.Model, item);
    res.send({
      code: 0,
      data,
    });
  });

  router.get("/", async (req, res, next) => {
    let skip = 0,
      limit = 0,
      option = {};
    if (req.query.query) {
      const q = JSON.parse(req.query.query);
      const page = q.page || 1;
      limit = q.limit || 0;
      option = q.option || {};
      skip = (page - 1) * limit;
    }

    const total = await req.Model.countDocuments();
    const data = await req.Model.find()
      .skip(skip)
      .limit(limit)
      .setOptions(option);
    res.send({
      code: 0,
      total,
      data,
    });
  });

  router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    const data = await req.Model.findById(id);
    res.send({
      code: 0,
      data,
    });
  });

  router.put("/:id", async (req, res, next) => {
    const id = req.params.id;
    const item = req.body;
    const data = await req.Model.findByIdAndUpdate(id, item);
    res.send({
      code: 0,
      data,
    });
  });

  router.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    const data = await req.Model.findByIdAndDelete(id);
    res.send({
      code: 0,
      data,
    });
  });

  app.use(
    "/admin/api/rest/:resource",
    authMiddleware,
    resourceMiddleware,
    router
  );
};
