import * as $ from "newcar";

const circle = new $.Arc(100);

const scene = $.createScene(circle).addHandler(new $.AnimationHandler(
  circle,
  {
    obj: circle,
    duration: 10,
    elapsed: 0,
    operation(obj, duration, elapsed, context) {
      console.log("Hello world!")
    },
  },
  2,
  0,
  10
))

$.createCar(scene).set("#test").play()