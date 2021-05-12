import vertexShader from "./vert.vert"
import fragmentShader from "./frag.frag"

import {
  Player,
  sine, 
} from "../../src"

const player = new Player()

const wave = sine("A#4", 1/8)(player)

console.log(wave)

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
const gl = canvas.getContext('webgl')!

const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type)!

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)

  if (success) return shader
 
  console.error(gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
}

const createProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
  const program = gl.createProgram()!
  
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  const success = gl.getProgramParameter(program, gl.LINK_STATUS)

  if (success) return program
 
  console.log(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
}

const program = createProgram(
  gl, 
  createShader(gl, gl.VERTEX_SHADER, vertexShader)!, 
  createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)!,
)

if (program) {
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position")
  const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution")
  const wavelengthUniformLocation = gl.getUniformLocation(program, "u_wavelength")

  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  
  const positions = [
    0, 0,
    canvas.width, 0,
    0, canvas.height,
    0, canvas.height,
    canvas.width, 0,
    canvas.width, canvas.height,
  ]
  
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  
  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)
  gl.enableVertexAttribArray(positionAttributeLocation)

  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
  gl.uniform1f(wavelengthUniformLocation, wave.length)

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  const newWave: number[] = []

  const scale = wave.length / canvas.width

  for (let i = 0; i < canvas.width; i++) {
    newWave.push(wave[Math.floor(i * scale)])
  }

  const data = newWave.map((sample) => {
    const R = Math.floor((sample + 0.1) / 2 * 2550)

    return [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), 255]
  }).flat()

  const image = document.createElement('canvas')
  const ctx = image.getContext('2d')!
  document.body.appendChild(image)

  image.width = data.length
  image.height = 1

  for (let i = 0; i < data.length / 4; i++) {
    const [r, g, b, a] = data.slice(i, i + 4)

    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`
    ctx.fillRect(i, 0, 1, 1)
  }

  {
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)

    // Because images have to be download over the internet
    // they might take a moment until they are ready.
    // Until then put a single pixel in the texture so we can
    // use it immediately. When the image has finished downloading
    // we'll update the texture with the contents of the image.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 255, 255]))

    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image)

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  }
  // gl.texImage2D(
  //   gl.TEXTURE_2D, 
  //   level, 
  //   internalFormat, 
  //   width, 
  //   height, 
  //   border,
  //   srcFormat, 
  //   srcType, 
  //   new Uint8Array(data),
  // )

  // set the filtering so we don't need mips and it's not filtered
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
 
  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  const size = 2          // 2 components per iteration
  const type = gl.FLOAT   // the data is 32bit floats
  const normalize = false // don't normalize the data
  const stride = 0        // 0 = move forward size * sizeof(type) each iteration to get the next position
  const offset = 0        // start at the beginning of the buffer

  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)

  {
    const primitiveType = gl.TRIANGLES
    const offset = 0
    const count = 6
  
    gl.drawArrays(primitiveType, offset, count)
  }
}
