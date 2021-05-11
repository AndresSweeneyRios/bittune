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
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)

  const level = 0
  const internalFormat = gl.RGBA
  const width = 1
  const height = 1
  const border = 0
  const srcFormat = gl.RGBA
  const srcType = gl.UNSIGNED_BYTE

  const colors = [
    [255, 255, 0, 255],
    // [0, 0, 255, 255],
  ]

  colors.forEach(function(color, ndx) {
    gl.activeTexture(gl.TEXTURE0 + ndx)
    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)

    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, 
      2, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, 
      new Uint8Array(color),
    )
  })
  
  const textureLoc = gl.getUniformLocation(program, "u_sampler")
  gl.uniform1iv(textureLoc, [0, 1])

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
