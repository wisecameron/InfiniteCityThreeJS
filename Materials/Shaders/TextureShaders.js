

export const VertexShader = `

varying vec2 vUv;

void main()
{
    vUv = uv;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}
`

export const FragmentShader = `

varying vec2 vUv;
uniform vec2 u_resolution;
uniform sampler2D u_texture;

void main()
{
    vec4 texData = texture(u_texture, vUv);
    gl_FragColor = texData;
}

`