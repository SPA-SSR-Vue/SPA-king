export function isShow(el, n = 1) {
  const clientHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const elToTop = el.getBoundingClientRect().top;

  return elToTop < clientHeight * n;
}

export function isShowX(el, n = 1) {
  const clientWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const elToLeft = el.getBoundingClientRect().left;
  return elToLeft < clientWidth * n;
}
