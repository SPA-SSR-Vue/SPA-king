module.exports = app => {
  const mongoose = require("mongoose");
  const requireAll = require("require-all");
  const name = "king";
  const DB = `mongodb://localhost:27017/${name}`;

  mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  mongoose.connection.once("open", () => {
    console.log("The DB is connecting!");
  });

  requireAll(__dirname + "/models");
};
