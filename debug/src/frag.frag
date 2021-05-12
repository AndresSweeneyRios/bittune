precision mediump float;
uniform mediump vec2 u_resolution;
uniform mediump sampler2D u_sampler;

vec2 textureSize = vec2(2.0, 1.0);

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;

  float index = 0.0;

  float column = mod(index, textureSize.x);
  float row    = floor(index / textureSize.x);
  vec2 uv = vec2(
    (column + 0.5) / textureSize.x,
    (row    + 0.5) / textureSize.y);

  vec4 color = texture2D(u_sampler, uv);

  gl_FragColor = vec4(vec3(0.5), 1.0);
}
