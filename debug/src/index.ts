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

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)

  const level = 0
  const internalFormat = gl.RGBA
  const width = 2
  const height = 1
  const border = 0
  const srcFormat = gl.RGBA
  const srcType = gl.UNSIGNED_BYTE

  const data = [
    255, 255, 0, 255,
    0, 0, 255, 255,
  ]

  const alignment = 1 // should be uneccessary for this texture, but 
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment) //   I don't think this is hurting
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border,
    srcFormat, srcType, new Uint8Array(data))

  // set the filtering so we don't need mips and it's not filtered
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  
  const textureLoc = gl.getUniformLocation(program, "u_sampler")
  gl.uniform1iv(textureLoc, [0, 1])
 
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
