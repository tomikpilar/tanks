export class Vector {
  //_x;
  //_y;

  constructor(x,y) {
    this._x = x;
    this._y = y;
  }

  add(vec) {
    this._x += vec.x;
    this._y += vec.y;
    return this;
  }

  sub(vec) {
    this._x -= vec.x;
    this._y -= vec.y;
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

  angle(vec) {
    return Math.acos(this.dot(vec)/(this.length()*vec.length()));
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

  static add2(a, b) {
    return a.clone().add(b);
  }

  static sub2(a, b) {
    return a.clone().sub(b);
  }

  static dot2(a, b) {
    return a.clone().dot(b);
  }

  static angle2(a, b) {
    return a.angle(b);
  }

  static distance(a, b) {
    let x = Math.abs(a.x - b.x);
    let y = Math.abs(a.y - b.y);
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  }

  static ringIterate(center, radius, process) {
    let ref = Vector.sub2(center, new Vector(radius, radius)).floor();
    let xEnd = ref.x + 2*radius;
    let yEnd = ref.y + 2*radius;
    for(;ref.x < xEnd; ref.x++) {
      for(;ref.y < yEnd; ref.y++) {
        if(Vector.distance(ref, center) < radius) process(ref);
      }
      ref.y -= 2*radius;
    }
  }
}
