precision mediump float;
uniform mediump vec2 u_resolution;
uniform sampler2D u_sampler;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;

  vec4 sample = texture2D(u_sampler, vec2(0, 0));

  gl_FragColor = sample; //vec4(0.0, 0.0, 1.0, 1.0) + color; 
}
