import * as chart from "../../packages/mod-chart/dist/newcar-mod-chart.mjs";
import * as $ from "../../packages/newcar/dist/newcar.mjs";

const scene = new $.Scene().add(
  new chart.Bar(1000, 350, {
    x: 200,
    y: 450,
    data: [
      new chart.DataGroup("line", [
        new chart.DataUnit("1", 300)
      ])
    ]
  }),
);

const car = $.newcar("#canvas");
car.scene = scene;
car.play();
