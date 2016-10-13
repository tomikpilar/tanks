let _instance = Symbol();

export class KeyboardManager {
  //_keys;

  constructor(token) {
    if(_instance !== token) throw new Error("Cannot instantiate directly.");
    this._keys = {};
    var self = this;
    document.addEventListener("keydown", function (e) {
      self.setKeyPressed(e.keyCode, true);
    }, false);

    document.addEventListener("keyup", function (e) {
      self.setKeyPressed(e.keyCode, false);
    }, false);
  }

  static getInstance() {
    if(!this[_instance]) this[_instance] = new KeyboardManager(_instance);
    return this[_instance];
  }

  setKeyPressed(keyCode, value) {
    this._keys[keyCode] = value;
  }

  isKeyPressed(keyCode) {
    return this._keys[keyCode] === true;
  }

}

export const KeyCode = Object.freeze({
  A: 65,
  D: 68,
  S: 83,
  W: 87,
  CTRL: 17,
  SPACE: 32
});
