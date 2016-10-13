export class Terrain {
  //_data;
  //_size

  constructor(data, size) {
    this._data = data;
    this._size = size;
  }

  getViewPort(topLeft, bottomRight) {
    var viewPort = [];
    for(let i = topLeft.x; i < bottomRight.x; i++) {
      var a = this._data[i].slice(topLeft.y, bottomRight.y)
      viewPort.push(this._data[i].slice(topLeft.y, bottomRight.y));
    }
    return viewPort;
  }
}
