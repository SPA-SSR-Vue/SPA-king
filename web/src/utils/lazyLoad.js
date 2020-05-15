import { isShow, isShowX } from "./position";

export function lazyLoad(el, binding) {
  if (el && el.dataset.lazy && isShow(el)) {
    el.src = binding.value;
    el.removeAttribute("data-lazy");
  }
}
