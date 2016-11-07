import {Vector} from "../math/vector";
import {ItemClass} from "./itemClass";

export class Item {
  //_position;
  //_size;
  //_layer;
  //_className;
  //_radius;
  //_cornerPoints;
  //_health
  
  constructor() {
    this._position = new Vector(0,0);
    this._size = new Vector(0,0);
    this._radius = 0;
    this._className = ItemClass.ITEM;
    this._health = 1;
    this.updateCornerPoints();
  }
  
  initRadius() {
    this._radius = Math.sqrt(Math.pow(this._size.x, 2) + Math.pow(this._size.y, 2));
  }

  updateCornerPoints() {
    this._cornerPoints = [
      (new Vector( this._size.x/2,  this._size.y/2)),
      (new Vector( this._size.x/2, -this._size.y/2)),
      (new Vector(-this._size.x/2,  this._size.y/2)),
      (new Vector(-this._size.x/2, -this._size.y/2))
    ]
  }

  get radius() { return this._radius; }
  get cornerPoints() {
    return [
      Vector.add2(this._cornerPoints[0], this._position).floor(),
      Vector.add2(this._cornerPoints[1], this._position).floor(),
      Vector.add2(this._cornerPoints[2], this._position).floor(),
      Vector.add2(this._cornerPoints[3], this._position).floor()
    ];
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