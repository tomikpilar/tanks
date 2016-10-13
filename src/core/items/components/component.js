export class Component {
  //_type;
  //_weight;
  //_size;
  //_position;
  //_modifiers;

  constructor(type, weight, size, position, modifiers) {
    this._type = type;
    this._weight = weight;
    this._size = size;
    this._modifiers = modifiers;
  }

  get type() { return this._type; }
  get weight() { return this._weight; }
  get size() { return this._size; }
  get position() { return this._position; }
  get modifiers() { return this._modifiers; }
}