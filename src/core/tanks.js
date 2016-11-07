import {TerrainGenerator} from "./terrain/terrainGenerator"
import {TerrainType} from "./terrain/terrainType"
import {Vector} from "./math/vector"
import {ItemClass} from "./items/itemClass"
import {CollisionDetector} from "./items/collisionDetector"
import {PubSub} from "./pubsub"

export class Tanks {
  //_itemsByType
  //_terrain
  //_pubSub

  constructor(playerCount) {
    this._itemsByType = {};
    let self = this;
    Object.keys(ItemClass).forEach(function(key) {
        self._itemsByType[ItemClass[key]] = [];
    });
    this._terrain = (new TerrainGenerator(playerCount, new Vector(10000,10000))).generate();
  }

  get terrain() { return this._terrain; }

  addItem(item) {
    item.initRadius();
    this._itemsByType[item.className].push(item);

  }

  removeItem(item) {
    this._itemsByType[item.className].splice(this._itemsByType[item.className].indexOf(item), 1);
  }

  update(timeDiff) {
    let self = this;
    Object.keys(ItemClass).forEach(function(key) {
      for(let item of self._itemsByType[ItemClass[key]]) {
        item.update(timeDiff);
      }
    });

    this.checkForCollisions()
  }

  checkForCollisions() {
    let t = this._itemsByType[ItemClass.TANK];
    let a = this._itemsByType[ItemClass.AMMO];
    let ammoLen = a.length;
    let tanksLen = t.length;
    while(ammoLen > 0) {
      let flag = false;
      for(let i = 0; i < tanksLen; i++) {
        console.log(t[i]);
        if(CollisionDetector.detectItemToItem(a[ammoLen - 1], t[i])) {
          t[i].hit(10 /* todo config + kill */);
          a.splice(ammoLen - 1, 1);
          flag = true;
          break;
        }
      }

      if(flag) continue;

      if(CollisionDetector.detectItemToTerrain(a[ammoLen - 1], this._terrain)) {
        this.handleAmmoTerrainHit(10, a[ammoLen -1].position);
        a.splice(ammoLen - 1, 1);
      }
      ammoLen--;
    }

    while(tanksLen > 0) {
      if(CollisionDetector.detectItemToTerrain(t[tanksLen - 1], this._terrain)) {
        console.log("tank hit");
        t[tanksLen - 1].reloadLastState();
      }
      tanksLen--;
    }
  }

  handleAmmoTerrainHit(power, center) {
    let self = this;
    Vector.ringIterate(center, power, function (point) {
      self._terrain.setPointType(point, TerrainType.PLAIN);
    });

  }
}
