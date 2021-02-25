import * as PIXI from "pixi.js";
import { application } from "./app";
import { Vector } from "./vector";

export class Ball {
  private size: number;
  private location = new Vector(0, 0);
  private velocity = new Vector(2, -5);
  private graphics = new PIXI.Graphics();

  constructor(size: number) {
    this.size = size;
    this.create();
  }

  private create() {
    this.graphics.lineStyle(1, 0xfeeb77, 1);
    this.graphics.drawCircle(this.location.x, this.location.y, this.size);
    this.graphics.endFill();
    // app.stage.addChild(this.graphics);
  }

  move() {
    this.location.add(this.velocity);
  }

  bounce() {
    if (
      this.location.x > application.width / 2 ||
      this.location.x < -application.width / 2
    ) {
      this.velocity.x *= -1;
    }
    if (
      this.location.y > application.height / 2 ||
      this.location.y < -application.height / 2
    ) {
      this.velocity.y *= -1;
    }
  }

  draw() {
    this.graphics.position.set(this.location.x, this.location.y);
  }
}
