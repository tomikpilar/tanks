import {ItemClass} from "../../core/items/itemClass";
import {TerrainType} from "../../core/terrain/terrainType";
import {Vector} from "../../core/math/vector";

import {ImageLoader, ImageType} from "./imageLoader";


const ROCK_COLOR = [79, 59, 49, 255];
const HOME_COLOR = [99, 99, 99, 255];
const PLAIN_COLOR = [110, 110, 110, 255];

export class Renderer {
  //_context;
  //_data;
  //_lastRender;
  //_imageLoader;
  //_width
  //_height
  //_halfWidth
  //_halfHeight
  //_positionReferrer
  //_terrain

  constructor(canvas) {
    this._context = canvas.getContext("2d");
    this._width = canvas.width;
    this._height = canvas.height;
    this._halfWidth = this._width/2;
    this._halfHeight = this._height/2;
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
    this.renderTerrain();
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
      case ItemClass.AMMO:
        this.renderAmmo(item);
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
    this._context.translate(this._halfWidth, this._halfHeight);
    this._context.rotate(Math.atan2(tank.direction.y, tank.direction.x));
    this._context.drawImage(img, 0, 0, w, h, x, y, w2, h2);
  }

  renderAmmo(ammo) {
    if(!this.shouldRender(ammo)) return;
    let img = this._imageLoader.getImage(ImageType.AMMO);
    let w = img.width;
    let h = img.height;
    let w2 = w/2;
    let h2 = h/2;
    let x = -w2/2;
    let y = -h2/2;
    let translateX = ammo.position.x - this._positionReferrer.x + this._halfWidth;
    let translateY = ammo.position.y - this._positionReferrer.y + this._halfHeight;
    this._context.translate(translateX, translateY);
    this._context.rotate(Math.atan2(ammo.direction.y, ammo.direction.x));
    this._context.drawImage(img, 0, 0, w, h, x, y, w2, h2);
  }

  shouldRender(item) {
    let refLen = Math.max(item.size.x, item.size.y)/2;
    let diffX = Math.abs(this._positionReferrer.x - (item.position.x + refLen));
    let diffY = Math.abs(this._positionReferrer.y - (item.position.y + refLen));
    return diffX < this._halfWidth && diffY < this._halfHeight;
  }

  renderTerrain() {
    let topLeft = new Vector(-this._halfWidth, -this._halfHeight);
    let ref = this._positionReferrer.clone().floor();
    topLeft.add(ref);
    let bottomRight = new Vector(this._halfWidth, this._halfHeight);
    bottomRight.add(ref);
    let viewPort = this._terrain.getViewPort(topLeft, bottomRight);

    let imageData = this._context.createImageData(this._width, this._height);

    let x = viewPort.length;
    let y = viewPort[0].length;

    for(let i = 0; i < x; i++) {
      for(let j = 0; j < y; j++) {
        let offset = 4*(i*y + j);
        switch (viewPort[i][j]) {
          case TerrainType.OUT:
            Renderer.putPointData(imageData, offset, 0, 0, 0, 255);
            break;
          case TerrainType.ROCKS:
            Renderer.putPointData(imageData, offset,
              ROCK_COLOR[0] + (topLeft.x + i + topLeft.y + j)%10,
              ROCK_COLOR[1] + (topLeft.x + i - topLeft.y + j)%10,
              ROCK_COLOR[2] - (topLeft.x + i + topLeft.y + j)%10,
              ROCK_COLOR[3]
            );
            break;
          case TerrainType.HOME:
            Renderer.putPointData(imageData, offset, HOME_COLOR[0], HOME_COLOR[1], HOME_COLOR[2], HOME_COLOR[3]);
            break;
          case TerrainType.PLAIN:
            Renderer.putPointData(imageData, offset, PLAIN_COLOR[0], PLAIN_COLOR[1], PLAIN_COLOR[2], PLAIN_COLOR[3]);
            break;
        }
      }
    }

    this._context.putImageData(imageData, 0, 0);
  }

  static putPointData(imageData, offset, r, g, b, alpha) {
    imageData.data[offset    ] = r;
    imageData.data[offset + 1] = g;
    imageData.data[offset + 2] = b;
    imageData.data[offset + 3] = alpha;
  }

}
