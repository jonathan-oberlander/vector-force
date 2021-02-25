export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(v: number | Vector) {
    if (typeof v === "number") {
      this.y += v;
      this.x += v;
    }
    if (v instanceof Vector) {
      this.y += v.y;
      this.x += v.x;
    }
  }

  sub(v: number | Vector) {
    if (typeof v === "number") {
      this.y -= v;
      this.x -= v;
    }
    if (v instanceof Vector) {
      this.y -= v.y;
      this.x -= v.x;
    }
  }

  mult(val: number | Vector) {
    if (typeof val === "number") {
      this.x *= val;
      this.y *= val;
    }
    if (val instanceof Vector) {
      this.x *= val.x;
      this.y *= val.y;
    }
  }

  div(val: number | Vector) {
    if (typeof val === "number") {
      this.x /= val;
      this.y /= val;
    }
    if (val instanceof Vector) {
      this.x /= val.x;
      this.y /= val.y;
    }
  }

  mag() {
    const absX = Math.abs(this.x);
    const absY = Math.abs(this.y);
    const magnitude = Math.sqrt((absX ^ 2.0) + (absY ^ 2.0));
    return Number(magnitude.toPrecision(7));
    // return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    let m = this.mag();
    if (m > 0) {
      this.div(m);
    }
  }

  setMag(n: number) {
    this.normalize();
    this.mult(n);
  }

  limit(min: number, max: number) {
    this.x = Math.min(Math.max(this.x, min), max);
    this.y = Math.min(Math.max(this.y, min), max);
  }

  copy() {
    return new Vector(this.x, this.y);
  }
}

export class V {
  static add(v1: Vector, v2: Vector): Vector {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }

  static random2D() {
    return new Vector(
      Number((Math.random() * 2 - 1).toPrecision(7)),
      Number((Math.random() * 2 - 1).toPrecision(7))
    );
  }
}
