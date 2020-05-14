export function throttle(fn, delay) {
  let timer = null;

  return function() {
    const args = arguments;
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      fn.apply(this, args);
    }, delay);
  };
}
