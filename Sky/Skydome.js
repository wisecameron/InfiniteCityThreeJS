import { useMemo } from "react";
import { Vector2 } from "three";
import { VertexShader, FragmentShader } from "./SkyShaders";
import { DoubleSide } from "three";

export default function Skydome(props)
{
    const uniforms = useMemo(() => ({
        u_resolution: {value: new Vector2(window.innerWidth, window.innerHeight)}
    }), []);

/*
    <cylinderBufferGeometry 
    args={[15,15,5,8, 1, 0, 3.15]}
    />
*/

    return(
        <mesh position = {[0,0,0]}>
            <shaderMaterial 
            uniforms={uniforms}
            vertexShader = {VertexShader}
            fragmentShader = {FragmentShader}
            side = {DoubleSide}
            />
            <boxGeometry args = {[1,1,1]} />
        </mesh>
    )
}