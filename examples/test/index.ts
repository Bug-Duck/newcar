import * as $ from "newcar";

const circle = new $.Arc(100);

const scene = $.createScene(circle)

circle.animate($.move, 200, {
  toX: 300
})

$.createCar(scene).set("#test").play()