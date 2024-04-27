import fs from 'node:fs'
import { resolve } from 'node:path'

// @ts-ignore
import ffmpeg from 'fluent-ffmpeg/lib/fluent-ffmpeg.js'

import type { HandlerContext } from 'clerc/index'
import type { LocalApp as App } from '@newcar/core'

export default async function build(context: HandlerContext<any>) {
  const app = await resolveApp(context.parameters.input as string)

  const [duration, output, fps] = [
    Number(context.parameters.duration as string),
    context.parameters.target as string,
    Number(context.flags.fps as string),
  ]

  const imagesArray = app.getFrames(duration)
  const tempFiles = imagesArray.map((content: Uint8Array | null, index) => {
    const fileName = `temp_image_${index}.png`
    if (content) fs.writeFileSync(resolve(fileName), Buffer.from(content))
    return fileName
  })

  exportFile(resolve(output), tempFiles, fps)
}

async function resolveApp(path: string): Promise<App> {
  const app = (await import(resolve(path))) as {
    default: App
  }
  return app.default
}

async function exportFile(path: string, files: string[], fps: number) {
  ffmpeg()
    .on('error', (err: Error) => {
      console.error(`An error occurred: ${err.message}`)
    })
    .on('end', () => {
      // eslint-disable-next-line no-console
      console.log('Processing finished!')
      // clear image files
      files.forEach((file) => fs.unlinkSync(file))
    })
    .input(resolve('./temp_image_%d.png'))
    .inputFPS(fps)
    .output(resolve(path as string))
    .outputFPS(30)
    .run()
}
