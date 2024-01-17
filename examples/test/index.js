/* eslint-disable no-console */
import * as chart from "../../packages/mod-chart/dist/newcar-mod-chart.mjs";
import Markdown from "../../packages/mod-markdown/dist/newcar-mod-markdown.mjs";
import * as $ from "../../packages/newcar/dist/newcar.mjs";

const s = $.sleep;

const scene = new $.Scene()
  .add(
    new $.Arrow([0, 0], [200, 200]).setup(async (obj) => {
      await s(200);
      obj.emit("test1");
    }),
  )
  .add(
    new $.Arc(100)
      .respond("test", async (obj) => {
        obj.radius = 500;
      })
      .setup(async (obj) => {
        await s(100);
        obj.animate($.changeProperty("radius", 0, 100), 100);
      }),
  )
  .add(
    new Markdown("Hello world!").respond("test1", async (obj) => {
      obj.markdown = "Fuck world!";
    }),
  )
  .add(
    new chart.Bar(100, 100, {
      x: 200,
      y: 200,
    }),
  );

const car = $.newcar("#test");
car.scene = scene;
car.play();

const recorder = new $.Recorder(car);
recorder.record(100, (url) => {
  console.log(url);
});
