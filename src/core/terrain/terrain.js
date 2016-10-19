export class Terrain {
  //_data;
  //_size

  constructor(data, size) {
    this._data = data;
    this._size = size;
  }

  getViewPort(topLeft, bottomRight) {
    var viewPort = [];
    for(let i = topLeft.y; i < bottomRight.y; i++) {
      viewPort.push(this._data[i].slice(topLeft.x, bottomRight.x));
    }
    return viewPort;
  }
}
