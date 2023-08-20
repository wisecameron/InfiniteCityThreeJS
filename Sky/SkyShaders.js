
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

vec3 getSky()
{
    float atmosphere = sqrt(1.0-vUv.y * 1.);
    vec3 skyColor = vec3(0.05,0.3,0.8);
    
    float scatter = pow(5.8 / u_resolution.y,1.0);
    scatter = 1.0 - clamp(scatter,0.7,1.0);
    
    vec3 scatterColor = mix(vec3(1.0),vec3(1.0,0.3,0.0) * 1.5,scatter);
    return mix(skyColor,vec3(scatterColor),atmosphere / 1.25);
    
}

void main()
{
    vec3 sky = getSky();
    
	gl_FragColor = vec4(sky,1.0);
}
`