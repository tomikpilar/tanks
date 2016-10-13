import {Item} from "./item";
import {ItemClass} from "./itemClass";
import {Vector} from "../math/vector";

const DEG = Math.PI/180;
const SPEED_THRESHOLD = 0.1;

export class MovingItem extends Item {
  //_speed;
  //_direction;
  //_acceleration;
  //_maxSpeed;

  constructor() {
    super();
    this._speed = SPEED_THRESHOLD;
    this._direction = new Vector(1,0);
    this._acceleration = 1;
    this._maxSpeed = 40;
    this._className = ItemClass.MOVING_ITEM;
  }

  get speed() { return this._speed; }
  set speed(spd) { this._speed = spd; }

  get direction() { return this._direction; }
  set direction(dir) { this._direction = dir.normalize(); }

  rotate(rad) {
    this._direction.rotate(rad);
    this._direction.normalize();
  }

  move(timeDiff) {
    this._speed *= this._acceleration;
    if(this._speed > this._maxSpeed) this._speed = this._maxSpeed;
    let speed = this._speed;
    if(this._speed < SPEED_THRESHOLD) {
      this._speed = SPEED_THRESHOLD;
      speed = 0;
    }
    this._position.add(this._direction.clone().multiply(timeDiff * speed));
  }

  update(timeDiff) {
    super.update(timeDiff);
    this.move(timeDiff);
  }

  accelerate() {
    this._acceleration = 1.5;
  }

  decelerate() {
    this._acceleration = 0.6;
  }

  brake() {
    this._acceleration = 0.3;
  }

  turnLeft() {
    this.rotate(DEG);
  }

  turnRight() {
    this.rotate(-DEG);
  }
}
