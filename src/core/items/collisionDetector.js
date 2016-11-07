import {Vector} from "../math/vector";
import {TerrainType} from "../terrain/terrainType";

export class CollisionDetector {
  constructor() {

  }

  static detectItemToItem(a, b) {
    if(a.radius + b.radius < Vector.distance(a.position, b.position)) return false;

    let pointsA = a.cornerPoints;
    let pointsB = b.cornerPoints;
    let axisA = a.direction.clone();

    if(!CollisionDetector.detectProjectionCollision(axisA, pointsA, pointsB)) return false;

    axisA.rotate(Math.PI/2);
    if(!CollisionDetector.detectProjectionCollision(axisA, pointsA, pointsB)) return false;

    let axisB = b.direction.clone();
    if(!CollisionDetector.detectProjectionCollision(axisB, pointsA, pointsB)) return false;

    axisB.rotate(Math.PI/2);
    if(!CollisionDetector.detectProjectionCollision(axisB, pointsA, pointsB)) return false;

    return true;
  }

  static detectItemToTerrain(a, terrain) {
    let pointGen = CollisionDetector.getCheckPointsGenerator(a);
    let pos;
    while(!(pos = pointGen.next()).done) {
      let t = terrain.getPointType(pos.value);
      console.log(pos.value, t);
      if (t == TerrainType.ROCKS) return true;
    }

    return false;
  }
  
  static detectProjectionCollision(axis, pointsA, pointsB) {
    let minA, maxA, minB, maxB;

    for(let i = 0; i < pointsA.length; i++) {
      let scalar = CollisionDetector.projectionScalar(CollisionDetector.axisProjection(axis, pointsA[i]), axis);
      if(minA == undefined || minA > scalar) minA = scalar;
      if(maxA == undefined || maxA < scalar) maxA = scalar;
    }

    for(let i = 0; i < pointsB.length; i++) {
      let scalar = CollisionDetector.projectionScalar(CollisionDetector.axisProjection(axis, pointsB[i]), axis);
      if(minB == undefined || minB > scalar) minB = scalar;
      if(maxB == undefined || maxB < scalar) maxB = scalar;
    }

    return (minB <= maxA && minA <= maxB);
  }
  
  static axisProjection(axis, point) {
    let ref = Vector.dot2(axis, point)/(Math.pow(axis.x, 2) + Math.pow(axis.y, 2));
    return new Vector(ref*axis.x, ref*axis.y);
  }

  static projectionScalar(projection, axis) {
    return Vector.dot2(projection, axis);
  }

  static getCheckPointsGenerator(a) {
    let cornerPoints = a.cornerPoints;
    let i = 0;
    return {
      next: function () {
        if(i < 4) {
          return {value: cornerPoints[i++], done: false};
        }



        return {value: null, done: true};
      }
    }
  }
}