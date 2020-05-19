import Vue from "vue";
import dayjs from "dayjs";

Vue.filter("day", function(val, format = "MM-DD") {
  return dayjs(val).format(format);
});
