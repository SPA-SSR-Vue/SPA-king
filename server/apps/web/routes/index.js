module.exports = app => {
  require("./banner")(app);
  require("./article")(app);
  require("./hero")(app);
  require("./video")(app);
  require("./competition")(app);
};
