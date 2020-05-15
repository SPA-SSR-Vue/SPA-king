import { throttle, lazyLoad } from "../../utils";

export default {
  install(Vue, option = {}) {
    Vue.directive("lazy", {
      inserted(el, binding) {
        window.addEventListener(
          "scroll",
          throttle(() => {
            lazyLoad(el, binding);
          }, option.delay || 50)
        );
      },

      bind(el, binding) {
        setTimeout(() => {
          el.src = option.loading || "";
          lazyLoad(el, binding);
        });
      },
    });
  },
};
