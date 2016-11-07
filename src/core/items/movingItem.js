import {Item} from "./item";
import {ItemClass} from "./itemClass";
import {Vector} from "../math/vector";

const DEG = Math.PI/180;
const SPEED_THRESHOLD = 0.1;

export class MovingItem extends Item {
  //_speed;
  //_direction;
  //_acceleration;
  //_rotation;
  //_maxSpeed;
  //_lastState;

  constructor() {
    super();
    this._direction = new Vector(1,0);
    this._speed = SPEED_THRESHOLD;
    this._acceleration = 1;
    this._rotation = 0;
    this._maxSpeed = 30;
    this._className = ItemClass.MOVING_ITEM;
    this._lastState = {
      speed: this._speed,
      position: this._position,
      direction: this._direction
    };
    this.updateCornerPoints();
  }
  
  // @override
  updateCornerPoints() {
    super.updateCornerPoints();
    if(this._direction == undefined) return;
    let angle = this._direction.angle(new Vector(1,0));
    this._cornerPoints[0].rotate(angle);
    this._cornerPoints[1].rotate(angle);
    this._cornerPoints[2].rotate(angle);
    this._cornerPoints[3].rotate(angle);
  }
  

  get speed() { return this._speed; }
  set speed(spd) { this._speed = spd; }

  get direction() { return this._direction; }
  set direction(dir) { this._direction = dir.normalize(); }

  rotate(rad) {
    this._direction.rotate(rad);
    this._direction.normalize();
    this.updateCornerPoints();
  }

  move(timeDiff) {
    this.setLastState();
    if(this._rotation != 0)  {
      this.rotate(this._rotation * DEG);
      this._rotation = 0;
    }
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
    this._rotation = -1;
  }

  turnRight() {
    this._rotation = 1;
  }

  setLastState() {
    this._lastState = {
      position: this._position.clone(),
      direction: this._direction.clone()
    }
  }

  reloadLastState() {
    this._direction = this._lastState.direction;
    this._position = this._lastState.position;
  }
}
