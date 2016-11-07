import {MovingItem} from "./movingItem"
import {ItemClass} from "./itemClass"
import {Vector} from "../math/vector"

export class Ammo extends MovingItem {
  //_power

  constructor(speed, direction, position) {
    super();
    this._speed = speed;
    this._direction = direction;
    this._position = position;
    this._maxSpeed = speed;
    this._className = ItemClass.AMMO;
    this._size = new Vector(4,2);
    this._power = 10;
    this.updateCornerPoints();
  }

  get power() { return this._power; }
}
