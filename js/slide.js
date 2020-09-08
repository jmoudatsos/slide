export default class Slide {
  constructor(slide, warp) {
    this.slide = document.querySelector(slide);
    this.warp = document.querySelector(warp);
  }

  OnStart(event) {
    event.preventDefault();
    this.warp.addEventListener("mousemove", this.OnMove);
  }

  OnMove(event) {
    console.log("moveu");
  }

  OnEnd() {
    this.warp.removeEventListener("mousemove", this.OnMove);
  }

  AddEvent() {
    this.warp.addEventListener("mousedown", this.OnStart);
    this.warp.addEventListener("mouseup", this.OnEnd);
  }
  bind() {
    this.OnStart = this.OnStart.bind(this);
    this.OnMove = this.OnMove.bind(this);
    this.OnEnd = this.OnEnd.bind(this);
  }
  init() {
    this.bind();
    this.AddEvent();
  }
}
