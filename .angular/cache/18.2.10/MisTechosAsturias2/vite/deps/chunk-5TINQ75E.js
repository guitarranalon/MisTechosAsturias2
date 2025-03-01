// node_modules/ol/css.js
var CLASS_HIDDEN = "ol-hidden";
var CLASS_SELECTABLE = "ol-selectable";
var CLASS_UNSELECTABLE = "ol-unselectable";
var CLASS_UNSUPPORTED = "ol-unsupported";
var CLASS_CONTROL = "ol-control";
var CLASS_COLLAPSED = "ol-collapsed";
var fontRegEx = new RegExp(["^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)", "(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)", "(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)", "(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?", "(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))", "(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))", `?\\s*([-,\\"\\'\\sa-z]+?)\\s*$`].join(""), "i");
var fontRegExMatchIndex = ["style", "variant", "weight", "size", "lineHeight", "family"];
var getFontParameters = function(fontSpec) {
  var match = fontSpec.match(fontRegEx);
  if (!match) {
    return null;
  }
  var style = (
    /** @type {FontParameters} */
    {
      lineHeight: "normal",
      size: "1.2em",
      style: "normal",
      weight: "normal",
      variant: "normal"
    }
  );
  for (var i = 0, ii = fontRegExMatchIndex.length; i < ii; ++i) {
    var value = match[i + 1];
    if (value !== void 0) {
      style[fontRegExMatchIndex[i]] = value;
    }
  }
  style.families = style.family.split(/,\s?/);
  return style;
};

export {
  CLASS_HIDDEN,
  CLASS_SELECTABLE,
  CLASS_UNSELECTABLE,
  CLASS_UNSUPPORTED,
  CLASS_CONTROL,
  CLASS_COLLAPSED,
  getFontParameters
};
//# sourceMappingURL=chunk-5TINQ75E.js.map
