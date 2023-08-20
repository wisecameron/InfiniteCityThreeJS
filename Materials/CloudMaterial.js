import cloudImg from '../../../../assets/cloud.png';
import { Color, MeshLambertMaterial, NearestFilter, RepeatWrapping, sRGBEncoding } from 'three';


export const CloudMaterial = (Loader) =>
{
    const loaded = Loader.load(cloudImg);
    loaded.minFilter = NearestFilter;
    loaded.magFilter = NearestFilter;
    loaded.wrapS = RepeatWrapping;
    loaded.wrapT = RepeatWrapping;
    loaded.encoding = sRGBEncoding;

    const mat = new MeshLambertMaterial({ map: loaded, transparent: true, fog: false});

    mat.alphaMap = loaded;
    mat.depthWrite = false;
    mat.alphaTest = 0;


    return mat;
}

export const CloudMaterial2 = (Loader) =>
{
    const loaded = Loader.load(cloudImg);
    loaded.minFilter = NearestFilter;
    loaded.magFilter = NearestFilter;
    loaded.wrapS = RepeatWrapping;
    loaded.wrapT = RepeatWrapping;
    loaded.encoding = sRGBEncoding;

    const mat = new MeshLambertMaterial({ map: loaded, transparent: true, fog: false, color: "white", opacity: 0});

    mat.alphaMap = loaded;
    mat.depthWrite = false;
    mat.alphaTest = 0;


    return mat;
}

export const CloudMaterial3 = (Loader, color) =>
{
    const loaded = Loader.load(cloudImg);
    loaded.minFilter = NearestFilter;
    loaded.magFilter = NearestFilter;
    loaded.wrapS = RepeatWrapping;
    loaded.wrapT = RepeatWrapping;
    loaded.encoding = sRGBEncoding;

    const mat = new MeshLambertMaterial({ map: loaded, transparent: true, fog: false, color: color, emissiveIntensity: 0.05, emissive: color});

    mat.alphaMap = loaded;
    mat.depthWrite = false;
    mat.alphaTest = 0;


    return mat;
}

export function CloudMaterial4(Loader, baseXColor, endXColor, baseYColor, endYColor, xLimit, yLimit)
{
    const loaded = Loader.load(cloudImg);
    loaded.minFilter = NearestFilter;
    loaded.magFilter = NearestFilter;
    loaded.wrapS = RepeatWrapping;
    loaded.wrapT = RepeatWrapping;
    loaded.encoding = sRGBEncoding;
  
    const mat = new MeshLambertMaterial({
      map: loaded,
      transparent: true,
      fog: false,
      emissiveIntensity: 0.05,
      alphaMap: loaded,
      depthWrite: false,
      alphaTest: 0,
      onBeforeCompile: (shader) => {
        shader.uniforms.uTime = { value: 0 };
        shader.uniforms.baseXColor = { value: new Color(baseXColor) };
        shader.uniforms.endXColor = { value: new Color(endXColor) };
        shader.uniforms.baseYColor = { value: new Color(baseYColor) };
        shader.uniforms.endYColor = { value: new Color(endYColor) };
        shader.vertexShader = `
          uniform float uTime;
          uniform vec3 baseXColor;
          uniform vec3 endXColor;
          uniform vec3 baseYColor;
          uniform vec3 endYColor;
          varying vec2 vUv;
          varying vec3 vColor;
          ${shader.vertexShader}
          void main() {
            vUv = uv;
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
            gl_Position = projectedPosition;
            float xRatio = clamp(abs(position.x) / ${xLimit.toFixed(1)}, 0.0, 1.0);
            float yRatio = clamp(abs(position.y) / ${yLimit.toFixed(1)}, 0.0, 1.0);
            vec3 colorX = mix(baseXColor, endXColor, xRatio);
            vec3 colorY = mix(baseYColor, endYColor, yRatio);
            vColor = mix(colorX, colorY, 0.5);
          }
        `;
      }
    });
  
    mat.emissive.set(mat.color);
  
    return mat;
  };