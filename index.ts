import * as PIXI from "pixi.js";
import { application, Mover, Vector, V } from "./lib";

let movers: Mover[];
let line: PIXI.Graphics;
let box: PIXI.Graphics;

export function setup() {
  const texture = application.resources["sprite"].texture;

  // initialise
  movers = new Array(
    new Mover(new PIXI.Sprite(texture)),
    new Mover(new PIXI.Sprite(texture)),
    new Mover(new PIXI.Sprite(texture)),
    new Mover(new PIXI.Sprite(texture)),
    new Mover(new PIXI.Sprite(texture))
  );

  line = new PIXI.Graphics();
  box = new PIXI.Graphics();
  application.app.stage.addChild(box, line);

  movers.forEach((m) => {
    m.graphic.anchor.set(0.5);
    application.app.stage.addChild(m.graphic);
  });

  // ticker
  application.ticker.add(animate).start();
}

function animate() {
  // const mousePosition = new Vector(
  //   application.mouse.global.x,
  //   application.mouse.global.y
  // );

  // drawline(mousePosition);
  // const m = mousePosition.copy();
  // m.normalize();
  // m.mult(2);
  // drawbox(m);

  movers.forEach((mover) => {
    const gravity = new Vector(0, 0.3);
    gravity.mult(mover.mass); //
    mover.applyForce(gravity);

    const wind = V.random2D();
    wind.div(2);
    mover.applyForce(wind);

    if (application.mouse.pressure > 0) {
      // mousePosition.setMag(0.5);
      // mover.applyForce(mousePosition);

      const friction = mover.velocity;
      friction.normalize();
      friction.mult(-1);
      const c = 0.1;
      friction.mult(c);
      mover.applyForce(friction);
    }

    mover.update();
    mover.edges();
    mover.display();
  });
}

function drawline(mouse: Vector) {
  console.log(mouse);
  line.clear();
  line.lineStyle(1, 0xffd900, 1);
  line.moveTo(application.center.x, application.center.y);
  line.lineTo(mouse.x, mouse.y);
  line.closePath();
  line.endFill();
}

function drawbox(side: Vector) {
  box.clear();
  box.lineStyle(1, 0xffd900, 1);
  box.drawRect(application.center.x, application.center.y, side.x, side.y);
  box.endFill();
}
