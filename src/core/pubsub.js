let _instance = Symbol();

export class PubSub {
  //_handlers

  constructor(token) {
    if(_instance !== token) throw new Error("Cannot instantiate directly.");
    this._handlers = {};
  }

  static getInstance() {
    if(!this[_instance]) this[_instance] = new PubSub(_instance);
    return this[_instance];
  }

  subscribe(topic, handler) {
    if(!this._handlers[topic]) this._handlers[topic] = [];
    this._handlers[topic].push(handler);
  }

  publish(topic, data) {
    if(!this._handlers[topic]) return;

    this._handlers[topic].forEach(function(handler) {
      handler(data);
    });
  }
}

export const PubSubTopic = Object.freeze({

});
