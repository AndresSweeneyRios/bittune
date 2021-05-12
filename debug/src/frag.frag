precision mediump float;
uniform mediump vec2 u_resolution;
uniform sampler2D u_sampler;
uniform float u_wavelength;

varying highp vec2 v_texcoord;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;

  vec4 sample = texture2D(u_sampler, vec2(st.x, 0.0));

  float normalizedRedChannel = sample.r / 255.0;

  gl_FragColor = vec4(float(st.y < normalizedRedChannel * 150.0), 0, 0, 1.0);
}
