import * as PIXI from "pixi.js";
import { application } from "./app";
import { Vector } from "./vector";
import v from "./vectorF";

export class Mover {
  private _gfx: PIXI.Sprite;
  private _location: Vector;
  private _velocity: Vector;
  private _acceleration: Vector;
  private _mass: number;
  // private mousePosition: Vector;

  constructor(gfx: PIXI.Sprite) {
    this._gfx = gfx;
    this._location = new Vector(application.width * Math.random(), 0);
    this._velocity = new Vector(0, 0);
    this._acceleration = new Vector(0, 0);
    this._mass = Math.random() + 0.5;
    this._gfx.scale.set(this._mass);
    // this.mousePosition = new Vector(0, 0);
  }

  // Newton's second law with mass
  applyForce(force: Vector) {
    const acc = v.acceleration(force)(this._mass);
    this._acceleration.add(v.cast(acc));

    // copy the force inside that specific mover
    // const f = force.copy();
    // f.div(this._mass); //
    // this._acceleration.add(f);
  }

  update() {
    // BASIC PHYSICS ENGINE
    this._velocity.add(this._acceleration);
    this._location.add(this._velocity);
    // apply some limitations...
    // this.velocity.limit(-4, 4);

    // wipe out the acceleration
    this._acceleration.mult(0);
  }

  edges() {
    if (this._location.x > application.width) {
      this._location.x = application.width;
      this._velocity.x *= -1;
    }
    if (this._location.x < 0) {
      this._location.x = 0;
      this._velocity.x *= -1;
    }
    if (this._location.y > application.height) {
      this._location.y = application.height;
      this._velocity.y *= -1;
    }
    if (this._location.y < 0) {
      this._location.y = 0;
      this._velocity.y *= -1;
    }
  }

  display() {
    this._gfx.position.set(this._location.x, this._location.y);
  }

  get graphic() {
    return this._gfx;
  }

  get position() {
    return this._location;
  }

  get mass() {
    return this._mass;
  }

  get velocity() {
    return this._velocity;
  }
}
