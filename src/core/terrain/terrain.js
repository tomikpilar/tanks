import {TerrainType} from "./terrainType"
import {Vector} from "../math/vector"

export class Terrain {
  //_data;
  //_size;
  //_offset;

  constructor(data, size) {
    this._data = data;
    this._size = size;
    let xOffset = (data[0].length - size.x)/2;
    let yOffset = (data.length - size.y)/2;
    this._offset = new Vector(xOffset, yOffset);
  }

  getViewPort(topLeft, bottomRight) {
    topLeft.add(this._offset);
    bottomRight.add(this._offset);
    var viewPort = [];
    for(let i = topLeft.y; i < bottomRight.y; i++) {
        viewPort.push(this._data[i].slice(topLeft.x, bottomRight.x));
    }
    return viewPort;
  }

  getPointType(vec) {
    return this._data[vec.y + this._offset.y][vec.x + this._offset.x];
  }
}
