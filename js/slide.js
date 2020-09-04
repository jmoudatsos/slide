export default class Slide {
  constructor(slide, warp) {
    this.slide = document.querySelector(slide);
    this.warp = document.querySelector(warp);
  }

  Onstart(event) {
    event.preventDefault();
    this.warp = addEventListener("mousemove", this.Onmove);
  }
  Onmove() {
    console.log("mexeu");
  }
  Onend(event) {
    this.warp = removeEventListener("mousemove", this.Onmove);
  }
  Addevent() {
    this.warp = addEventListener("mousedown", this.Onstart);
    this.warp = addEventListener("mouseup", this.Onend);
  }
  Bind() {
    this.Onstart = this.Onstart.bind(this);
    this.Onmove = this.Onmove.bind(this);
    this.Onend = this.Onend.bind(this);
  }

  init() {
    this.Bind();
    this.Addevent();
  }
}
