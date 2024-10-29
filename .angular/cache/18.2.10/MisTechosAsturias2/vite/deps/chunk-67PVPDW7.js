import {
  getFontParameters
} from "./chunk-5TINQ75E.js";
import {
  WORKER_OFFSCREEN_CANVAS,
  createCanvasContext2D
} from "./chunk-NUKIIKKO.js";
import {
  toString
} from "./chunk-GAGXBDJ6.js";
import {
  Object_default,
  Target_default
} from "./chunk-5ORQIOU2.js";
import {
  clear
} from "./chunk-MN23FWKY.js";

// node_modules/ol/render/canvas.js
var defaultFont = "10px sans-serif";
var defaultFillStyle = "#000";
var defaultLineCap = "round";
var defaultLineDash = [];
var defaultLineDashOffset = 0;
var defaultLineJoin = "round";
var defaultMiterLimit = 10;
var defaultStrokeStyle = "#000";
var defaultTextAlign = "center";
var defaultTextBaseline = "middle";
var defaultPadding = [0, 0, 0, 0];
var defaultLineWidth = 1;
var checkedFonts = new Object_default();
var labelCache = new Target_default();
labelCache.setSize = function() {
  console.warn("labelCache is deprecated.");
};
var measureContext = null;
var measureFont;
var textHeights = {};
var registerFont = function() {
  var retries = 100;
  var size = "32px ";
  var referenceFonts = ["monospace", "serif"];
  var len = referenceFonts.length;
  var text = "wmytzilWMYTZIL@#/&?$%10";
  var interval, referenceWidth;
  function isAvailable(fontStyle, fontWeight, fontFamily) {
    var available = true;
    for (var i = 0; i < len; ++i) {
      var referenceFont = referenceFonts[i];
      referenceWidth = measureTextWidth(fontStyle + " " + fontWeight + " " + size + referenceFont, text);
      if (fontFamily != referenceFont) {
        var width = measureTextWidth(fontStyle + " " + fontWeight + " " + size + fontFamily + "," + referenceFont, text);
        available = available && width != referenceWidth;
      }
    }
    if (available) {
      return true;
    }
    return false;
  }
  function check() {
    var done = true;
    var fonts = checkedFonts.getKeys();
    for (var i = 0, ii = fonts.length; i < ii; ++i) {
      var font = fonts[i];
      if (checkedFonts.get(font) < retries) {
        if (isAvailable.apply(this, font.split("\n"))) {
          clear(textHeights);
          measureContext = null;
          measureFont = void 0;
          checkedFonts.set(font, retries);
        } else {
          checkedFonts.set(font, checkedFonts.get(font) + 1, true);
          done = false;
        }
      }
    }
    if (done) {
      clearInterval(interval);
      interval = void 0;
    }
  }
  return function(fontSpec) {
    var font = getFontParameters(fontSpec);
    if (!font) {
      return;
    }
    var families = font.families;
    for (var i = 0, ii = families.length; i < ii; ++i) {
      var family = families[i];
      var key = font.style + "\n" + font.weight + "\n" + family;
      if (checkedFonts.get(key) === void 0) {
        checkedFonts.set(key, retries, true);
        if (!isAvailable(font.style, font.weight, family)) {
          checkedFonts.set(key, 0, true);
          if (interval === void 0) {
            interval = setInterval(check, 32);
          }
        }
      }
    }
  };
}();
var measureTextHeight = /* @__PURE__ */ function() {
  var div;
  return function(fontSpec) {
    var height = textHeights[fontSpec];
    if (height == void 0) {
      if (WORKER_OFFSCREEN_CANVAS) {
        var font = getFontParameters(fontSpec);
        var metrics = measureText(fontSpec, "Žg");
        var lineHeight = isNaN(Number(font.lineHeight)) ? 1.2 : Number(font.lineHeight);
        height = lineHeight * (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
      } else {
        if (!div) {
          div = document.createElement("div");
          div.innerHTML = "M";
          div.style.margin = "0 !important";
          div.style.padding = "0 !important";
          div.style.position = "absolute !important";
          div.style.left = "-99999px !important";
        }
        div.style.font = fontSpec;
        document.body.appendChild(div);
        height = div.offsetHeight;
        document.body.removeChild(div);
      }
      textHeights[fontSpec] = height;
    }
    return height;
  };
}();
function measureText(font, text) {
  if (!measureContext) {
    measureContext = createCanvasContext2D(1, 1);
  }
  if (font != measureFont) {
    measureContext.font = font;
    measureFont = measureContext.font;
  }
  return measureContext.measureText(text);
}
function measureTextWidth(font, text) {
  return measureText(font, text).width;
}
function measureAndCacheTextWidth(font, text, cache) {
  if (text in cache) {
    return cache[text];
  }
  var width = measureTextWidth(font, text);
  cache[text] = width;
  return width;
}
function measureTextWidths(font, lines, widths) {
  var numLines = lines.length;
  var width = 0;
  for (var i = 0; i < numLines; ++i) {
    var currentWidth = measureTextWidth(font, lines[i]);
    width = Math.max(width, currentWidth);
    widths.push(currentWidth);
  }
  return width;
}
function rotateAtOffset(context, rotation, offsetX, offsetY) {
  if (rotation !== 0) {
    context.translate(offsetX, offsetY);
    context.rotate(rotation);
    context.translate(-offsetX, -offsetY);
  }
}
function drawImageOrLabel(context, transform, opacity, labelOrImage, originX, originY, w, h, x, y, scale) {
  context.save();
  if (opacity !== 1) {
    context.globalAlpha *= opacity;
  }
  if (transform) {
    context.setTransform.apply(context, transform);
  }
  if (
    /** @type {*} */
    labelOrImage.contextInstructions
  ) {
    context.translate(x, y);
    context.scale(scale[0], scale[1]);
    executeLabelInstructions(
      /** @type {Label} */
      labelOrImage,
      context
    );
  } else if (scale[0] < 0 || scale[1] < 0) {
    context.translate(x, y);
    context.scale(scale[0], scale[1]);
    context.drawImage(
      /** @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} */
      labelOrImage,
      originX,
      originY,
      w,
      h,
      0,
      0,
      w,
      h
    );
  } else {
    context.drawImage(
      /** @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} */
      labelOrImage,
      originX,
      originY,
      w,
      h,
      x,
      y,
      w * scale[0],
      h * scale[1]
    );
  }
  context.restore();
}
function executeLabelInstructions(label, context) {
  var contextInstructions = label.contextInstructions;
  for (var i = 0, ii = contextInstructions.length; i < ii; i += 2) {
    if (Array.isArray(contextInstructions[i + 1])) {
      context[contextInstructions[i]].apply(context, contextInstructions[i + 1]);
    } else {
      context[contextInstructions[i]] = contextInstructions[i + 1];
    }
  }
}
var createTransformStringCanvas = null;
function createTransformString(transform) {
  if (WORKER_OFFSCREEN_CANVAS) {
    return toString(transform);
  } else {
    if (!createTransformStringCanvas) {
      createTransformStringCanvas = createCanvasContext2D(1, 1).canvas;
    }
    createTransformStringCanvas.style.transform = toString(transform);
    return createTransformStringCanvas.style.transform;
  }
}

export {
  defaultFont,
  defaultFillStyle,
  defaultLineCap,
  defaultLineDash,
  defaultLineDashOffset,
  defaultLineJoin,
  defaultMiterLimit,
  defaultStrokeStyle,
  defaultTextAlign,
  defaultTextBaseline,
  defaultPadding,
  defaultLineWidth,
  checkedFonts,
  registerFont,
  measureTextHeight,
  measureAndCacheTextWidth,
  measureTextWidths,
  rotateAtOffset,
  drawImageOrLabel,
  createTransformString
};
//# sourceMappingURL=chunk-67PVPDW7.js.map
