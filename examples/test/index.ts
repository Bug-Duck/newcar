import * as $ from "newcar";

const circle = new $.Arc(100);

const scene = $.createScene(circle).addHandler(
  new $.AnimationHandler(
    $.createAnimation(
      circle,
      $.move,
      100,
      {}
    ),
    1,
    0
  )
)

$.createCar(scene).set("#test").play()