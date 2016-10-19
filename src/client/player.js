import {Tank, TANK_SHOT} from "../core/items/tank";
import {KeyboardManager, KeyCode} from "./api/keyboardManager";
import {PubSub} from "../core/pubsub";

export class Player {
  //_tank;
  //_keyManager
  //_pubSub

  constructor() {
    this._tank = new Tank();
    this._keyboardManager = KeyboardManager.getInstance();
    this._pubSub = PubSub.getInstance();
  }

  update() {
    if(this._keyboardManager.isKeyPressed(KeyCode.W)) {
      this._tank.accelerate();
    } else if(this._keyboardManager.isKeyPressed(KeyCode.S)) {
      this._tank.brake();
    } else {
      this._tank.decelerate();
    }

    if(this._keyboardManager.isKeyPressed(KeyCode.A)) {
      this._tank.turnLeft();
    }

    if(this._keyboardManager.isKeyPressed(KeyCode.D)) {
      this._tank.turnRight();
    }

    if(this._keyboardManager.isKeyPressed(KeyCode.SPACE)) {
      let ammo = this._tank.shoot();
      this._pubSub.publish(TANK_SHOT, ammo);
    }
  }

  get tank() { return this._tank; }
}
