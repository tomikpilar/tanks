import {ItemClass} from "../../core/items/itemClass";
import {TerrainType} from "../../core/terrain/terrainType";
import {Vector} from "../../core/math/vector";

import {ImageLoader, ImageType} from "./imageLoader";


const ROCK_COLOR = [79, 59, 49, 255];

export class Renderer {
  //_context;
  //_data;
  //_lastRender;
  //_imageLoader;
  //_width
  //_height
  //_positionReferrer
  //_terrain

  constructor(canvas) {
    this._context = canvas.getContext("2d");
    this._width = canvas.width;
    this._height = canvas.height;
    this._lastRender = 0;
    this._data = [];
    this._imageLoader = new ImageLoader();
    this._positionReferrer = new Vector(0,0);
    this._terrain = null;
  }

  set positionReferrer(vec) { this._positionReferrer = vec; }
  set terrain(t) { this._terrain = t; }

  addToRender(item) {
    this._data.push(item);
  }

  removeFromRender(item) {
    let index = this._data.indexOf(item);
    if(index < 0) this._data.splice(index, 1);
  }

  init(positionReferrer, terrain) {
    var self = this;

    this._terrain = terrain;
    this._positionReferrer = positionReferrer;

    function update(timestamp) {
      self.render(timestamp);
      window.requestAnimationFrame(update);
    }

    this._imageLoader.loadImages(update);
  }

  render(timestamp) {
    let timeDiff = timestamp - this._lastRender;
    this._context.clearRect(0,0,this._width, this._height);
    this.renderTerrain()
    for(let item of this._data) {
      this.renderItem(item);
    }

    this._lastRender = timestamp;
  }

  renderItem(item) {
    this._context.save();
    switch (item.className) {
      case ItemClass.ITEM:
        break;
      case ItemClass.MOVING_ITEM:
        break;
      case ItemClass.TANK:
        this.renderTank(item);
        break;
    }
    this._context.restore();
  }

  renderTank(tank) {
    let img = this._imageLoader.getImage(ImageType.TANK);
    let w = img.width;
    let h = img.height;
    let w2 = w/3;
    let h2 = h/3;
    let x = -w2/2;
    let y = -h2/2;
    this._context.translate(this._width/2, this._height/2);
    this._context.rotate(Math.atan2(tank.direction.x, tank.direction.y));
    this._context.drawImage(img, 0, 0, w, h, x, y, w2, h2);
  }

  renderTerrain() {
    let topLeft = new Vector(-this._width/2, -this._height/2);
    let ref = this._positionReferrer.clone().floor();
    topLeft.add(ref);
    let bottomRight = new Vector(this._width/2, this._height/2);
    bottomRight.add(ref);
    let viewPort = this._terrain.getViewPort(topLeft, bottomRight);

    let imageData = this._context.createImageData(this._width, this._height);

    let x = viewPort.length;
    let y = viewPort[0].length;

    for(let i = 0; i < x; i++) {
      for(let j = 0; j < y; j++) {
        let offset = 4*(i*y + j);
        switch (viewPort[i][j]) {
          case TerrainType.ROCKS:
            imageData.data[offset    ] = ROCK_COLOR[0] + (topLeft.x + i + bottomRight.x + j)%10;
            imageData.data[offset + 1] = ROCK_COLOR[1] + (topLeft.x + i - bottomRight.x - j)%10;
            imageData.data[offset + 2] = ROCK_COLOR[2] - (topLeft.x + i + bottomRight.x + j)%10;
            imageData.data[offset + 3] = ROCK_COLOR[3];
            break;
          case TerrainType.HOME:
            imageData.data[offset    ] = 99;
            imageData.data[offset + 1] = 99;
            imageData.data[offset + 2] = 99;
            imageData.data[offset + 3] = 255;
            break;
        }
      }
    }

    this._context.putImageData(imageData, 0, 0);
  }

}
