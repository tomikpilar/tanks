export const ImageType = Object.freeze({
  TANK: 0,
  AMMO: 1
});

const ImageMap = new Map([
  [ImageType.TANK, "tank.png"],
  [ImageType.AMMO, "ammo.png"]
]);

let IMAGE_NUM = ImageMap.size;
let IMAGE_BASE_PATH = "img/items/";

export class ImageLoader {
  //_images;
  //_loadedImages;

  constructor() {
    this._images = {};
    this._loadedImages = 0;
  }

  loadImages(callback) {
    for(let imgType in ImageType) {
      if(!ImageType.hasOwnProperty(imgType)) continue;
      let img = new Image();
      img.onload = () => {
        this._loadedImages++;
        if(this.isReady()) {
          console.log("images loaded");
          callback();
        }
      };

      img.src = IMAGE_BASE_PATH + ImageMap.get(ImageType[imgType]);
      this._images[ImageType[imgType]] = img;
    }
  }

  isReady() { return this._loadedImages == IMAGE_NUM; }

  getImage(imgType) {
    return this._images[imgType];
  }
}
