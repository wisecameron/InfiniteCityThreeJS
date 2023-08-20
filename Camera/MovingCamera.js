import {useFrame, useThree} from '@react-three/fiber'
import { lerp } from 'three/src/math/MathUtils';
import { useState } from 'react';
import { useScroll } from '@react-three/drei';


export default function MovingCamera(props)
{
    const {camera} = useThree()
    const scroll = useScroll();
    let speed;
    
    useFrame((_, delta) =>
    {
        speed = lerp(50,50, scroll.offset)
        camera.position.z -= speed * delta;
    })
}