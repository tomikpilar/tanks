import {Terrain} from "./terrain";
import {TerrainType} from "./terrainType";

import * as Utils from "../math/utils";
import {Vector} from "../math/vector";

var HOME_SIZE = new Vector(200, 400);
var OFFSET = new Vector(400, 400);

export class TerrainGenerator {
  //_players;

  /**
   * @param players number
   * @param size Vector
   */
  constructor(players, size) {
    this._players = players;
    this._size = size;
  }

  generate() {
    var terrainData = [];

    for(let i = 0; i < OFFSET.y; i++) {
      terrainData.push(Array(this._size.x + OFFSET.x*2).fill(TerrainType.OUT));
    }

    for(let i = 0; i < this._size.y; i++) {
      terrainData.push(Array(this._size.x + OFFSET.x*2).fill(TerrainType.ROCKS));
      for(let j = 0; j < OFFSET.x; j++) {
        terrainData[OFFSET.y + i][j] = TerrainType.OUT;
        terrainData[OFFSET.y + i][j + this._size.x + OFFSET.x] = TerrainType.OUT;
      }
    }

    for(let i = 0; i < OFFSET.y; i++) {
      terrainData.push(Array(this._size.x + OFFSET.x*2).fill(TerrainType.OUT));
    }

      //this.fillData(terrainData, 0, 0, this._size.x, this._size.y, TerrainType.ROCKS);

    for(var i = 0; i < this._players; i++) {
      this.setPlayerHome(i, terrainData);
    }

    return new Terrain(terrainData, this._size);
  }

  setPlayerHome(playerID, terrainData) {
    let x = Utils.getRandomNumber(0, this._size.x - HOME_SIZE.x);
    let y = Utils.getRandomNumber(0, this._size.y - HOME_SIZE.y);

    x = 900 + OFFSET.x;
    y = 900 + OFFSET.y;

    this.fillData(terrainData, x, y, x + HOME_SIZE.x, y + HOME_SIZE.y, TerrainType.HOME);
  }

  fillData(terrainData, start_x, start_y, end_x, end_y, type) {
    for(var i = start_y; i < end_y; i++) {
      for(var j = start_x; j < end_x; j++) {
        terrainData[i][j] = type;
      }
    }
  }
}
