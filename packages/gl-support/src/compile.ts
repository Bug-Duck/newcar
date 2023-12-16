/**
 * Compile GL program.
 * @param code The code for WebGL.
 * @param shaderType The type of shader.
 * @param webGLContext The context of WebGL.
 * @param program The willing compiled program.
 */
export function compile(
  code: string,
  shaderType: number,
  webGLContext: WebGLRenderingContext,
  program: WebGLProgram,
): void {
  const shader = webGLContext.createShader(shaderType);
  webGLContext.shaderSource(shader!, code);
  webGLContext.compileShader(shader!);
  webGLContext.attachShader(program, shader!);
  webGLContext.linkProgram(program);
  webGLContext.useProgram(program);
}
