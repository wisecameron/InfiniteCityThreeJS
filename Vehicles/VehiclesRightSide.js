import {useRef, useMemo} from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Object3D } from 'three'
import { useEffect } from 'react'

export default function VehiclesRightSide(props)
{
    const ref = useRef()
    const dummy = useMemo(() => {return new Object3D(0,0,0)}, []);


    const positions = useMemo(() =>
    {
        let pos = []
        let posX = -1;
        let posY = 0;
        let posZ = 0;
        let deltaZ = 0;
        let dZ;
        let pZ;
        let runnerX = 60;

        //z
        for(let i = 0; i < 500; i++)
        {
            posX = (-1 * Math.random()) + props.xOffset;

            pos.push(posX);
            pos.push(posY);
            pos.push(posZ);

            pos.push(posX + 2);
            pos.push(posY);
            pos.push(posZ);

            for(let j = 0; j < props.roads; j++)
            {
                dZ = deltaZ * Math.random();
                pZ = (posZ - deltaZ) + dZ;

                pos.push(posX + runnerX);
                pos.push(posY);
                pos.push(pZ);
    
                pos.push(posX + 2 + runnerX);
                pos.push(posY);
                pos.push(pZ);

                runnerX += 60;
            }

            runnerX = 60;
            deltaZ = 30 + Math.random() * 55;
            posZ += deltaZ;
        }

        return pos;
    }, [props.roads, props.xOffset])

    useEffect(() =>
    {
        let len = (positions.length / 3);
        let count = 0;

        for(let i = 0; i < len; i+=3)
        {
            dummy.position.set(positions[i], positions[i+1], positions[i+2]);
            dummy.updateMatrix();
            ref.current.setMatrixAt(count, dummy.matrix);

            count++;
        }
        
        //moving negative z
        ref.current.instanceMatrix.needsUpdate = true;
    }, [positions, dummy])

    const {camera} = useThree()
    const totalZ = positions[positions.length - 1];

    useFrame((_, delta) =>
    {
        ref.current.position.z -= 15 * delta;
        if(camera.position.z < ref.current.position.z)
        {
            ref.current.position.z -= totalZ * .5
        }
        
    })



    return(
        <instancedMesh 
        ref = {ref} 
        args = {[null, null, positions.length / 3]} 
        {...props}
        scale = {5}>
            <boxBufferGeometry args = {[0.5,0.5,0.5]}/>
            <meshStandardMaterial color = "red" emissive = "red" emissiveIntensity = {1}/>
        </instancedMesh>
    )
} 