export default class Slide {
  constructor(slide, warp) {
    this.slide = document.querySelector(slide);
    this.warp = document.querySelector(warp);
    this.dist = { Final: 0, Startx: 0, Moviment: 0 };
  }

  Onstart(event) {
    event.preventDefault();
    this.warp = addEventListener("mousemove", this.Onmove);
    this.dist.Startx = event.clientX;
  }

  position(clientX) {
    this.dist.Moviment = (this.dist.Startx - clientX) * 1.6;
    console.log(`moment:${this.dist.Moviment}`);
    return this.dist.Final - this.dist.Moviment;
  }

  move(dist) {
    this.dist.positionmove = dist;
    console.log(`dist:${dist}`);
    this.slide.style.transform = `translate3d(${dist}px,0,0)`;
  }

  Onmove(event) {
    const fim = this.position(event.clientX);
    this.move(fim);
  }

  Onend(event) {
    this.warp = removeEventListener("mousemove", this.Onmove);
    this.dist.Final = this.dist.positionmove;
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
