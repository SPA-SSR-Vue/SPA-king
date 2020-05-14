module.exports = app => {
  // router
  require("./crud")(app);
  require("./auth")(app);
  require("./upload")(app);
};
