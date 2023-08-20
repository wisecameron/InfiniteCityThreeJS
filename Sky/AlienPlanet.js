import { sRGBEncoding, TextureLoader } from "three";
import { useFrame, useThree } from '@react-three/fiber'
import { MeshStandardMaterial } from "three";
import { useRef } from "react";

export default function AlienPlanet(props)
{
    const ref = {useRef};

    //load textures
    let loader = new TextureLoader();
    const planet = loader.load('./acol.png');
    const planetEMI = loader.load('./aemi.png');

    planet.encoding = sRGBEncoding;
    planetEMI.encoding = sRGBEncoding;

    const {camera} = useThree()
    
    useFrame((_, delta) =>
    {

    })

    return(
        <mesh {...props}
        ref = {ref}
        rotation = {[0, 0.5, 0]}>
            <meshStandardMaterial 
                map = {planet}
                emissiveMap = {planetEMI}
                emissiveIntensity = {45}
                fog = {false}
                emissive = "white"
            />
            <sphereBufferGeometry args = {[200, 128, 256]} />
        </mesh>
    )
}