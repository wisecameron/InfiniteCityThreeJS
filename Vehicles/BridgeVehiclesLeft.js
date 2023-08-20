import {useFrame, useThree} from '@react-three/fiber'
import { useMemo, useEffect, useRef } from 'react'
import { Object3D } from 'three'

export default function BridgeVehiclesLeft(props)
{
    const dummy = useMemo(() => { return new Object3D(0,0,0)} )
    const ref = useRef()

    let positions = useMemo(() =>
    {
        //varies by x, z +- 2
    
        let data = [];
    
        let startX = 0;
        let startX2 = 0;
        let startZ = -1;


        let startZ2 = 7;

        for(let i = 0; i < props.totalVehicles; i++)
        {
            data.push(startX, 14, startZ);
            data.push(startX, 14, startZ + 2);

            data.push(startX2, 14, startZ2);
            data.push(startX2, 14, startZ2 + 2);
            startX += 10 + Math.random() * 50;
            startX2 += 10 + Math.random() * 50;
        }
        return data;
    }, [])

    useEffect(() =>
    {
        let tot = positions.length;
        let count = 0;

        for(let i = 0 ; i < tot; i+=3)
        {
            dummy.position.set(
                positions[i],
                positions[i + 1],
                positions[i + 2]
            )
            dummy.updateMatrix();
            ref.current.setMatrixAt(count, dummy.matrix);
            count ++;
            
        }
        ref.current.instanceMatrix.needsUpdate = true;

    }, [positions])

    const {camera} = useThree()

    useFrame((_, delta) =>
    {
        ref.current.position.x -= 15 * delta;

        if(camera.position.z < ref.current.position.z - 300)
        {
            ref.current.position.z -= 1280;
        }
    })

    return(
        <instancedMesh 
        scale = {5} 
        ref = {ref} 
        args = {[null, null, props.totalVehicles * 2]}
        position = {[props.position[0], props.position[1], props.position[2]]}>
            <sphereBufferGeometry args = {[0.2, 8, 16]}/>
            <meshLambertMaterial color = "#eedd82" emissive = "#eedd82" emissiveIntensity = {1} />
        </instancedMesh>
    )

}
