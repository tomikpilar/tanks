import {MovingItem} from "./movingItem";
import {ItemClass} from "./itemClass";
import {Ammo} from "./ammo";
import {Vector} from "../math/vector";

export class Tank extends MovingItem {
  //_weight;
  //_components;
  //_shotInterval;
  //_lastShot;

  constructor() {
    super();
    this._size = new Vector(40, 17);
    this._className = ItemClass.TANK;
    this._shotInterval = 800;
    this._lastShot = 0;
    this._health = 100;
    this.updateCornerPoints();
  }

  addComponent(component) {
    this.removeComponent(component.type);
    this._components = {};
    this._weight += component.weight;
  }

  removeComponent(type) {
    let component = this._components[type];

    if(component === undefined) return;

    this._weight -= component.weight;
  }

  shoot() {
    if(Date.now() - this._lastShot < this._shotInterval) return null;
    this._lastShot = Date.now();
    return new Ammo(40, this._direction.clone(), this._direction.clone().multiply(this._size.x/2+3).add(this._position));
  }

  set weight(weight) { this._weight = weight; }
  get weight() { return this._weight; }

  hit(power) {
    this._health -= power;

    return this._health <= 0;
  }
}

export const TANK_SHOT = "tank_shot";
