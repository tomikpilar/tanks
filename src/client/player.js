import {Tank} from "../core/items/tank";
import {KeyboardManager, KeyCode} from "./api/keyboardManager";

export class Player {
  //_tank;
  //_keyManager

  constructor() {
    this._tank = new Tank();
    this._keyboardManager = KeyboardManager.getInstance();
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

    if(this._keyboardManager.isKeyPressed(KeyCode.CTRL)) {
      let ammo = this._tank.shoot();
    }
  }

  get tank() { return this._tank; }
}
