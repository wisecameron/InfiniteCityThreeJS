import { useRef } from "react";
import { useFrame, useThree } from '@react-three/fiber';

//"#66BF2F" 

export default function MovingLight()
{
    const ref = useRef()

    const {camera} = useThree()

    useFrame(() =>
    {
        ref.current.position.z = camera.position.z;
    })

    return( 
        <pointLight ref = {ref} intensity = {.8} position = {[0, 500, -400]} color = "#949494" distance={2200}/> 
    )
    
}
