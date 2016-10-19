import {Tanks} from "../core/tanks";
import {TANK_SHOT} from "../core/items/tank";
import {Renderer} from "./ui/renderer";
import {KeyboardManager} from "./api/keyboardManager";
import {Player} from "./player";
import {PubSub} from "../core/pubsub";

const UPDATE_RATE = 60/1000;

class Client {
  //_renderer;
  //_core;
  //_keyboardManager;
  //_player;
  //_pubSub;

  constructor() {
    var canvas = document.getElementById("game-container");
    this.initCanvas(canvas);
    this._renderer = new Renderer(canvas);
    this._core = new Tanks(1);
    this._keyboardManager = KeyboardManager.getInstance();
    this._player = new Player(this._core);
    this._pubSub = PubSub.getInstance();
    console.log("game ready");
  }

  start() {

    this._player.tank.setPosition(1000, 1000);

    this._core.addItem(this._player.tank);

    this._renderer.init(this._player.tank.position, this._core.terrain);
    this._renderer.addToRender(this._player.tank);

    var self = this;

    this._pubSub.subscribe(TANK_SHOT, function (ammo) {
      console.log("shooting");
      if(ammo == null) return;
      self._core.addItem(ammo);
      self._renderer.addToRender(ammo);
    });

    function update() {
      let enter = Date.now();

      self._player.update();
      self._core.update(UPDATE_RATE);

      let t = UPDATE_RATE - (Date.now() - enter);
      setTimeout(update, t < 1 ? 1 : t);
    }

    update();
  }

  initCanvas(canvas) {
    canvas.width = 400;
    canvas.height = 400;
  }
}

(function() {
  let game = new Client();

  game.start();
})();
