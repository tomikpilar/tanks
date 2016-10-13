export class Vector {
  //_x;
  //_y;

  constructor(x,y) {
    this._x = x;
    this._y = y;
  }

  add(vec) {
    this._x += vec._x;
    this._y += vec._y;
    return this;
  }

  multiply(i) {
    this._x *= i;
    this._y *= i;
    return this;
  }

  dot(vec) {
    return (this._x*vec._x) + (this._y*vec._y);
  }

  length() {
    return Math.sqrt((this._x*this._x) + (this._y*this._y));
  }

  normalize() {
    let l = this.length();
    this._x /= l;
    this._y /= l;
    return this;
  }

  rotate(rad) {
    this._x = this._x * Math.cos(rad) - this._y * Math.sin(rad);
    this._y = this._x * Math.sin(rad) + this._y * Math.cos(rad);
    return this;
  }

  floor() {
    this._x = ~~(this._x);
    this._y = ~~(this._y);
    return this;
  }

  get x() { return this._x; }
  get y() { return this._y; }

  set x(val) { this._x = val; }
  set y(val) { this._y = val; }

  clone() {
    return new Vector(this._x, this._y);
  }
}
