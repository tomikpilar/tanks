import {TerrainGenerator} from "./terrain/terrainGenerator"
import {Vector} from "./math/vector"

export class Tanks {
  //_items;
  //_terrain

  constructor(playerCount) {
    this._items = [];
    this._terrain = (new TerrainGenerator(playerCount, new Vector(10000,10000))).generate();
  }

  get terrain() { return this._terrain; }

  addItem(item) {
    this._items.push(item);
  }

  removeItem(item) {
    this._items.splice(this._items.indexOf(item), 1);
  }

  update(timeDiff) {
    for(let item of this._items) {
      item.update(timeDiff);
    }
  }
}