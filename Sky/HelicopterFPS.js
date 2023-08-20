import {useFrame, useThree} from '@react-three/fiber'
import { useRef } from 'react'
import { Cockpit } from '../../../LoadedModels/Cockpit'

export default function HelicopterPOV()
{
    const ref = useRef();
    const ref2 = useRef();

    const {camera} = useThree()

    useFrame((_, delta) =>
    {
        ref.current.position.z = camera.position.z - 12;
        ref.current.rotation.y += delta * 6;

    })

    return(
        <>
            <Cockpit position = {[63, 486.2 , -105]} rotation = {[-0.25, 3.09,-0.02]} scale = {0.6}/>
            <mesh ref = {ref} position = {[60, 508 , -100]}>
                <boxBufferGeometry args = {[100, 0.5, 1]}/>
                <meshPhongMaterial color = "#707070" emissive="#66BF2F" emissiveIntensity = {1}/>
            </mesh>
        </>
    )
}