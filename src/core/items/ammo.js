import {MovingItem} from "./movingItem"
import {ItemClass} from "./itemClass"

export class Ammo extends MovingItem {
  constructor(speed, direction) {
    super();
    this._speed = speed;
    this._direction = direction
    this._maxSpeed = speed;
    this._className = ItemClass.AMMO;
  }
}
