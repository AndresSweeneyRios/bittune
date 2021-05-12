precision mediump float;
uniform mediump vec2 u_resolution;
uniform sampler2D u_sampler;
uniform float u_wavelength;

varying highp vec2 v_texcoord;

void main() {
  vec4 sample = texture2D(u_sampler, vec2(0.0, 0.0));

  float normalizedRedChannel = sample.r / 255.0;

  // vec4 color = vec4(1.0 - 1.0 * float(st.y > normalizedRedChannel / 0.005), 0.0, 0.0, 1.0);
  
  vec4 color = vec4(sample.r, sample.g, sample.b, 1.0);

  gl_FragColor = color;
}
