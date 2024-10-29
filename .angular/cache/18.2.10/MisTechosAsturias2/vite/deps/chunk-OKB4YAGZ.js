// node_modules/ol/size.js
function hasArea(size) {
  return size[0] > 0 && size[1] > 0;
}
function scale(size, ratio, opt_size) {
  if (opt_size === void 0) {
    opt_size = [0, 0];
  }
  opt_size[0] = size[0] * ratio + 0.5 | 0;
  opt_size[1] = size[1] * ratio + 0.5 | 0;
  return opt_size;
}
function toSize(size, opt_size) {
  if (Array.isArray(size)) {
    return size;
  } else {
    if (opt_size === void 0) {
      opt_size = [size, size];
    } else {
      opt_size[0] = size;
      opt_size[1] = size;
    }
    return opt_size;
  }
}

export {
  hasArea,
  scale,
  toSize
};
//# sourceMappingURL=chunk-OKB4YAGZ.js.map
