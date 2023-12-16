import { compile } from "./compile";
import type { FastGLRenderingContext } from "./context";

export function dotStroke(
  ctx: FastGLRenderingContext,
  x: number,
  y: number,
): void {
  compile(
    `
  attribute vec3 position;
  uniform mat4 proj;

  void main(void) {
    gl_Position = proj * vec4(position,1.0);
    gl_PointSize = ${Math.round(ctx.lineWidth)}.0;
  }
  `,
    ctx.webgl.VERTEX_SHADER,
    ctx.webgl,
    ctx.program,
  );
  compile(
    `
  void main(){
    gl_FragColor = vec4(${ctx.r}, ${ctx.g}, ${ctx.b}, ${ctx.a});
  }
  `,
    ctx.webgl.FRAGMENT_SHADER,
    ctx.webgl,
    ctx.program,
  );
  const position = ctx.webgl.getAttribLocation(ctx.program, "position");
  const point = new Float32Array([x, y, 0]);
  ctx.webgl?.vertexAttrib3fv(position, point);
  const uniforproj = ctx.webgl.getUniformLocation(ctx.program, "proj");
  ctx.webgl.uniformMatrix4fv(uniforproj, false, ctx.proj as Float32Array);
  ctx.webgl?.drawArrays(ctx.webgl.POINTS, 0, 1);
}
