module.exports = app => {
  const express = require("express");
  const router = express.Router({ mergeParams: true });
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");
  const assert = require("http-assert");
  const User = require("./../../../libs/db/models/User");

  router.post("/login", async (req, res) => {
    let { username, password } = req.body;
    username = username.trim();
    password = password.trim();
    // 查找用户
    const user = await User.findOne({ username }).select("+password");
    assert(user, 422, "用户名不正确");
    // 验证密码
    const isValidPw = bcrypt.compareSync(password, user.password);
    assert(isValidPw, 422, "密码不正确");
    // 返回token
    const token = jwt.sign({ id: user._id }, app.get("SECRET"));
    res.send({
      code: 0,
      message: "登录成功",
      data: {
        token,
        user: { username },
      },
    });
  });

  app.use("/admin/api/auth", router);
};
