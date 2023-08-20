import { useEffect, useState, useMemo} from 'react';
import {useThree, useFrame} from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { Vector, Vector3 } from 'three';
import { lerp } from 'three/src/math/MathUtils';


export default function CameraSettings(props)
{
    const {camera} = useThree();
    const scroll = useScroll();
    let f;

    useFrame(() =>
    {
        f = lerp(500, 300, scroll.offset);
        camera.position.y = f;    
    })

    useEffect(() =>
    {
        camera.rotation.z = 0
        camera.far = 1600;
        camera.position.y = 550;
        camera.position.x = 60;
        //camera.lookAt(camera.position.x + 10, 15, -10000);

        camera.updateProjectionMatrix();
    }, [camera])

}