/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { compile } from "./compile";
import type { FastGLRenderingContext } from "./context";

export function lineStroke(
  ctx: FastGLRenderingContext,
  from: [number, number],
  to: [number, number],
): void {
  compile(
    `
    attribute vec3 position;
    uniform mat4 proj;

    void main(void) {
      gl_Position = proj * vec4(position,1.0);
      gl_PointSize = ${ctx.lineWidth}.0;
    }
    `,
    ctx.webgl!.VERTEX_SHADER,
    ctx.webgl!,
    ctx.program!,
  );
  compile(
    `
    void main(){
      gl_FragColor = vec4(${ctx.r}, ${ctx.g}, ${ctx.b}, ${ctx.a});
    }
    `,
    ctx.webgl!.FRAGMENT_SHADER,
    ctx.webgl!,
    ctx.program!,
  );
  const position = ctx.webgl!.getAttribLocation(ctx.program!, "position");
  const lineData = new Float32Array([from![0], from![1], 0, to![0], to![1], 0]);
  const buffer = ctx.webgl?.createBuffer();
  const uniforproj = ctx.webgl!.getUniformLocation(ctx.program!, "proj");
  ctx.webgl!.uniformMatrix4fv(uniforproj, false, ctx.proj as Float32Array);
  ctx.webgl!.bindBuffer(ctx.webgl!.ARRAY_BUFFER, buffer!);
  ctx.webgl!.bufferData(
    ctx.webgl!.ARRAY_BUFFER,
    lineData,
    ctx.webgl!.STATIC_DRAW,
  );
  ctx.webgl!.enableVertexAttribArray(position);
  ctx.webgl!.vertexAttribPointer(position, 3, ctx.webgl!.FLOAT, false, 0, 0);
  ctx.webgl!.drawArrays(ctx.webgl!.LINES, 0, 2);
}
