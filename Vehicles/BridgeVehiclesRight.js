import {useFrame} from '@react-three/fiber'
import { useMemo, useEffect, useRef } from 'react'
import { Object3D } from 'three'

export default function BridgeVehiclesRight(props)
{
    const dummy = useMemo(() => { return new Object3D(0,0,0)} )
    const ref = useRef()
    const boxRef = useRef()
    const groupRef = useRef();

    let positions = useMemo(() =>
    {

        console.log("F")
        //varies by x, z +- 2
    
        let data = {
            lightPos: [],
            boxPos: []
        };
    
        let startX = 0;
        let startZ = -2;

        for(let i = 0; i < props.totalVehicles; i++)
        {
            data.lightPos.push(startX, 14, startZ);
            data.lightPos.push(startX, 14, startZ + 2);
            startX += 10 + Math.random() * 50;

            //add box in between

            data.boxPos.push(startX + 3, 14, startZ + 1);

        }
        return data;
    }, [])

    useEffect(() =>
    {
        let tot = props.totalVehicles * 3;
        let count = 0;

        for(let i = 0 ; i < tot; i+=3)
        {
            dummy.position.set(
                positions.lightPos[i],
                positions.lightPos[i + 1],
                positions.lightPos[i + 2]
            )
            dummy.updateMatrix();
            ref.current.setMatrixAt(count, dummy.matrix);
            count ++;
        }
        ref.current.instanceMatrix.needsUpdate = true;

        tot = positions.boxPos.length;     
        for(let i = 0; i < tot; i+=3)
        {
            dummy.position.set(
                positions.boxPos[i],
                positions.boxPos[i + 1],
                positions.boxPos[ i + 2 ]
            )

            dummy.updateMatrix();
            boxRef.current.setMatrixAt(count, dummy.matrix);
            count++;
        }
        boxRef.current.instanceMatrix.needsUpdate = true;

    }, [positions])

    useFrame((_, delta) =>
    {
        groupRef.current.position.x += 15 * delta;
    })

    return(
        <group ref = {groupRef}>
            <instancedMesh
            scale = {5}
            ref = {boxRef}
            args = {[null, null, positions.boxPos.length]}
            position = {[props.position[0] - positions[positions.length - 3] + 400, props.position[1], props.position[2]]}>
                <boxBufferGeometry args = {[63, 40, 20]}/>
                <meshBasicMaterial color = "green"/>
            </instancedMesh>

            <instancedMesh 
            scale = {5} 
            ref = {ref} 
            args = {[null, null, props.totalVehicles]}
            position = {[props.position[0] - positions[positions.length - 3] + 400, props.position[1], props.position[2]]}>
                <sphereBufferGeometry args = {[0.2, 8, 16]}/>
                <meshStandardMaterial color = "#eedd82" emissive = "#eedd82" emissiveIntensity = {1}/>
            </instancedMesh>
        </group>

    )

}
