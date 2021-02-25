import * as PIXI from "pixi.js";
import { setup } from "..";

export class App {
  private _w: number;
  private _h: number;
  private _mouse: any;
  private _app: PIXI.Application;
  private _ticker: PIXI.Ticker;
  private _loader: PIXI.Loader;

  constructor() {
    this._w = window.innerWidth;
    this._h = window.innerHeight;
    this._app = new PIXI.Application({
      width: this._w,
      height: this._h,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      antialias: true,
    });
    this._app.stage.interactive = true;
    this._ticker = new PIXI.Ticker();
    this._mouse = this._app.renderer.plugins.interaction.mouse;
    this._loader = PIXI.Loader.shared;

    this.load();
  }

  resize() {
    this._w = window.innerWidth;
    this._h = window.innerHeight;
    this._app.renderer.resize(window.innerWidth, window.innerHeight);
  }

  load() {
    this._loader.add("sprite", "assets/sprite.png");
    this._loader.load();
    this._loader.onComplete.add(function () {
      console.log("Loaded");
      setup();
    });
  }

  get width() {
    return this._w;
  }

  get height() {
    return this._h;
  }

  get center() {
    return {
      x: this._w / 2,
      y: this._h / 2,
    };
  }

  get app() {
    return this._app;
  }

  get mouse() {
    return this._mouse;
  }

  get resources() {
    return this._loader.resources;
  }

  get ticker() {
    return this._ticker;
  }
}

export const application = new App();
document.body.appendChild(application.app.view);
window.addEventListener("resize", () => application.resize());
