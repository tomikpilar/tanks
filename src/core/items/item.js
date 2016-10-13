import {Vector} from "../math/vector";
import {ItemClass} from "./itemClass";

export class Item {
  //_position;
  //_size;
  //_layer;
  //_className;
  
  constructor() {
    this._position = new Vector(0,0);
    this._size = new Vector(0,0);
    this._className = ItemClass.ITEM;
  }

  update(timeDiff) {}

  setPosition(x, y) {
    this._position.x = x;
    this._position.y = y;
  }
  
  set position(pos) { this._position = pos; }
  get position() { return this._position; }

  set size(size) { this._size = size; }
  get size() { return this._size; }

  set layer(layer) { this._layer = layer; }
  get layer() { return this._layer; }
  
  get className() { return this._className; }
}