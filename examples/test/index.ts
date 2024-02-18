import * as $ from "newcar";

const circle = new $.Arc(100);

const scene = $.createScene(circle.setup((circle) => {
  circle.sleep(100)
  circle.animate($.move, 100)
}))

$.createCar(scene).set("#test").play()