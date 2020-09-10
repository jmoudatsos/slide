export class Slide {
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
    this.transition(false);
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

  transition(active) {
    this.slide.style.transition = active ? "transform .3s" : " ";
  }
  OnEnd(event) {
    const stringend = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.warp.removeEventListener(stringend, this.OnMove);
    this.dist.final = this.slidetrans;
    this.transition(true);
    this.ChangeSlideOnend();
  }

  ChangeSlideOnend() {
    if (this.dist.moviment > 120 && this.index.next !== undefined) {
      this.Nextlide();
    } else if (this.dist.moviment < -120 && this.index.prev !== undefined) {
      this.Prevlide();
    } else {
      this.SlideChange(this.index.active);
    }
  }

  AddEvent() {
    this.warp.addEventListener("mousedown", this.OnStart);
    this.warp.addEventListener("touchstart", this.OnStart);
    this.warp.addEventListener("mouseup", this.OnEnd);
    this.warp.addEventListener("touchend", this.OnEnd);
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
  }

  SlideNav(index) {
    const last = this.SlideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  SlideChange(index) {
    const active = this.SlideArray[index];
    this.slidetransform(active.position);
    this.SlideNav(index);
    this.dist.final = active.position;
    this.ActiveSlide();
  }

  ActiveSlide() {
    this.SlideArray.forEach((item) => {
      item.element.classList.remove("ativo");
    });
    this.SlideArray[this.index.active].element.classList.add("ativo");
  }

  Prevlide() {
    if (this.index.prev !== undefined) {
      this.SlideChange(this.index.prev);
    }
  }
  Nextlide() {
    if (this.index.next !== undefined) {
      this.SlideChange(this.index.next);
    }
  }

  Resize() {
    setTimeout(() => {
      this.Slideconfig();
      this.SlideChange(this.index.active);
    }, 1000);
  }

  EventResize() {
    window.addEventListener("resize", this.Resize);
  }

  bind() {
    this.OnStart = this.OnStart.bind(this);
    this.OnMove = this.OnMove.bind(this);
    this.OnEnd = this.OnEnd.bind(this);
    this.Resize = this.Resize.bind(this);
    this.Prevlide = this.Prevlide.bind(this);
    this.Nextlide = this.Nextlide.bind(this);
  }

  init() {
    this.bind();
    this.AddEvent();
    this.Slideconfig();
    this.EventResize();
    this.SlideChange(0);
    this.transition(true);
    return this;
  }
}

export class SlideNavXX extends Slide {
  addArrow(prev, next) {
    this.prevelement = document.querySelector(prev);
    this.nextelement = document.querySelector(next);
    this.addArrowEvent();
  }

  addArrowEvent() {
    this.prevelement.addEventListener("click", this.Prevlide);
    this.nextelement.addEventListener("click", this.Nextlide);
  }
}
