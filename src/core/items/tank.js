import {MovingItem} from "./movingItem";
import {ItemClass} from "./itemClass";
import {Ammo} from "./ammo";

export class Tank extends MovingItem {
  //_weight;
  //_components;

  constructor() {
    super();
    this._className = ItemClass.TANK;
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
    return new Ammo(100, this._direction.clone());
  }

  set weight(weight) { this._weight = weight; }
  get weight() { return this._weight; }
}

export const TANK_SHOT = "tank_shot";
