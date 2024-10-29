// node_modules/ol/TileRange.js
var TileRange = (
  /** @class */
  function() {
    function TileRange2(minX, maxX, minY, maxY) {
      this.minX = minX;
      this.maxX = maxX;
      this.minY = minY;
      this.maxY = maxY;
    }
    TileRange2.prototype.contains = function(tileCoord) {
      return this.containsXY(tileCoord[1], tileCoord[2]);
    };
    TileRange2.prototype.containsTileRange = function(tileRange) {
      return this.minX <= tileRange.minX && tileRange.maxX <= this.maxX && this.minY <= tileRange.minY && tileRange.maxY <= this.maxY;
    };
    TileRange2.prototype.containsXY = function(x, y) {
      return this.minX <= x && x <= this.maxX && this.minY <= y && y <= this.maxY;
    };
    TileRange2.prototype.equals = function(tileRange) {
      return this.minX == tileRange.minX && this.minY == tileRange.minY && this.maxX == tileRange.maxX && this.maxY == tileRange.maxY;
    };
    TileRange2.prototype.extend = function(tileRange) {
      if (tileRange.minX < this.minX) {
        this.minX = tileRange.minX;
      }
      if (tileRange.maxX > this.maxX) {
        this.maxX = tileRange.maxX;
      }
      if (tileRange.minY < this.minY) {
        this.minY = tileRange.minY;
      }
      if (tileRange.maxY > this.maxY) {
        this.maxY = tileRange.maxY;
      }
    };
    TileRange2.prototype.getHeight = function() {
      return this.maxY - this.minY + 1;
    };
    TileRange2.prototype.getSize = function() {
      return [this.getWidth(), this.getHeight()];
    };
    TileRange2.prototype.getWidth = function() {
      return this.maxX - this.minX + 1;
    };
    TileRange2.prototype.intersects = function(tileRange) {
      return this.minX <= tileRange.maxX && this.maxX >= tileRange.minX && this.minY <= tileRange.maxY && this.maxY >= tileRange.minY;
    };
    return TileRange2;
  }()
);
function createOrUpdate(minX, maxX, minY, maxY, tileRange) {
  if (tileRange !== void 0) {
    tileRange.minX = minX;
    tileRange.maxX = maxX;
    tileRange.minY = minY;
    tileRange.maxY = maxY;
    return tileRange;
  } else {
    return new TileRange(minX, maxX, minY, maxY);
  }
}
var TileRange_default = TileRange;

export {
  createOrUpdate,
  TileRange_default
};
//# sourceMappingURL=chunk-UVRH6PWK.js.map
