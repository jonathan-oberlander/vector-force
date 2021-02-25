import { Vector } from "./vector";

type TVector = {
  x: number;
  y: number;
};

const add = (v1: TVector) => (v2: TVector): TVector => ({
  x: v1.x + v2.x,
  y: v1.y + v2.y,
});

const sub = (v1: TVector) => (v2: TVector): TVector => ({
  x: v1.x - v2.x,
  y: v1.y - v2.y,
});

const mult = (v1: TVector) => (v2: TVector): TVector => ({
  x: v1.x * v2.x,
  y: v1.y * v2.y,
});

const div = (v1: TVector) => (v2: TVector): TVector => ({
  x: v2.x > 0 ? v1.x / v2.x : 0,
  y: v2.y > 0 ? v1.y / v2.y : 0,
});

const magnitude = (v: TVector): number => Math.sqrt(v.x * v.x + v.y * v.y);

const normalize = (v: TVector): TVector => {
  const d = div(v);
  const m = magnitude(v);
  if (m > 0) {
    return d({ x: m, y: m });
  }
};

const setMag = (n: number) => (v: TVector): TVector => {
  const mul = mult({ x: n, y: n });
  const mlz = normalize(v);
  return mul(mlz);
};

const limit = (v1: TVector) => (limit: number): TVector => ({
  x: Math.max(v1.x, limit),
  y: Math.max(v1.y, limit),
});

const random2D = (): TVector => ({
  x: Math.random() * 2 - 1,
  y: Math.random() * 2 - 1,
});

const copy = (v1: TVector) => ({
  x: v1.x,
  y: v1.y,
});

const make = (n: number): TVector => ({
  x: n,
  y: n,
});

const cast = (v: TVector) => new Vector(v.x, v.y);

const zero = mult(make(0));

const acceleration = (force: TVector) => (mass: number) =>
  div(force)(make(mass));

export default {
  add,
  sub,
  mult,
  div,
  magnitude,
  normalize,
  setMag,
  limit,
  random2D,
  copy,
  cast,
  make,
  acceleration,
  zero,
};

////////////// UTILS //////////////

const print = (val: any) => console.log(val);

const curry = <T>(f: (...args: T[]) => T) =>
  function g(...x: T[]) {
    return x.length >= f.length ? f(...x) : (...y: T[]) => g(...x, ...y);
  };

const pipe = (...fns: any[]) => (...args: any[]) =>
  fns.reduce((res, fn) => [fn.call(null, ...res)], args)[0];

const compose = (...fns: any[]) => (...args: any[]) =>
  fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

const addC = curry(
  (v1: TVector, v2: TVector): TVector => ({
    x: v1.x + v2.x,
    y: v1.y + v2.y,
  })
);

const divC = curry(
  (v1: TVector, v2: TVector): TVector => ({
    x: v1.x / v2.x,
    y: v1.y / v2.y,
  })
);

const v = { x: 4, y: 9 };
const w = { x: 2, y: 3 };
const x = { x: 7, y: 4 };

const addV = addC(x);
const divW = divC(w);

const res = compose(addV, divW);
print(res(v));
print(res(x));
print(res(w));

const mass = (m: number) => make(m);
const accel = curry((mass: TVector, force: TVector) => divC(force, mass));
const speed = curry((accel: TVector, velo: TVector) => addC(accel, velo));

const m = accel(mass(9), { x: 3, y: 9 });
// print(m({ x: 3, y: 9 }));
// print(m);
