export default class Slide {
  constructor(slide, warp) {
    this.slide = document.querySelector(slide);
    this.warp = document.querySelector(warp);
    this.dist = { final: 0, startX: 0, moviment: 0 };
  }

  OnStart(event) {
    let stringstart;
    if (event.type == "mousedown") {
      event.preventDefault();
      this.dist.startX = event.clientX;
      stringstart = "mousemove";
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      stringstart = "touchmove";
    }
    this.warp.addEventListener(stringstart, this.OnMove);
  }

  slidetransform(dist) {
    this.slidetrans = dist;
    this.slide.style.transform = `translate3d(${dist}px,0,0)`;
  }

  position(clientX) {
    this.dist.moviment = (this.dist.startX - clientX) * 1.6;
    return this.dist.final - this.dist.moviment;
  }

  OnMove(event) {
    const stringmove =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalposicao = this.position(stringmove);
    this.slidetransform(finalposicao);
  }

  OnEnd(event) {
    const stringend = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.warp.removeEventListener(stringend, this.OnMove);
    this.dist.final = this.slidetrans;
  }

  AddEvent() {
    this.warp.addEventListener("mousedown", this.OnStart);
    this.warp.addEventListener("touchstart", this.OnStart);
    this.warp.addEventListener("mouseup", this.OnEnd);
    this.warp.addEventListener("touchend", this.OnEnd);
  }
  bind() {
    this.OnStart = this.OnStart.bind(this);
    this.OnMove = this.OnMove.bind(this);
    this.OnEnd = this.OnEnd.bind(this);
  }

  SlideCalc(slide) {
    const margin = (this.warp.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  Slideconfig() {
    this.SlideArray = [...this.slide.children].map((element) => {
      const position = this.SlideCalc(element);
      return {
        position,
        element,
      };
    });
    console.log(this.SlideArray);
  }

  SlideNav(index) {
    const last = this.SlideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
    console.log(this.index);
  }

  SlideChange(index) {
    const active = this.SlideArray[index];
    this.slidetransform(active.position);
    this.SlideNav(index);
    this.dist.final = active.position;
  }

  init() {
    this.bind();
    this.AddEvent();
    this.Slideconfig();
  }
}
