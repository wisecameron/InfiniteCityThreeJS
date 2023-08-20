import {useRef, useMemo} from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Object3D } from 'three'
import { useEffect } from 'react'

export default function VehiclesLeftSide(props)
{
    const ref = useRef()
    const dummy = useMemo(() => {return new Object3D(0,0,0)}, [])
    let totalZ;

    const positions = useMemo(() =>
    {
        let pos = []
        let posX = -1;
        let posY = 0;
        let posZ = 0;
        let runner = 60;
        let dZ;
        let pZ
        let deltaZ = 0;
        let j;

        for(let i = 0; i < 500; i++)
        {
            //set up first pair
            posX = (-1 * Math.random()) + props.xOffset;

            pos.push(posX);
            pos.push(posY);
            pos.push(posZ);

            pos.push(posX + 2);
            pos.push(posY);
            pos.push(posZ);

            //move across to each road with some variance
            for(j = 0; j < props.roads; j++)
            {
                dZ = deltaZ * Math.random();
                pZ = (posZ - deltaZ) + dZ;

                pos.push(posX + runner);
                pos.push(posY);
                pos.push(pZ);

                pos.push(posX + runner + 2);
                pos.push(posY);
                pos.push(pZ);
                runner += 60;
            }
            runner = 60;
            posX += 2;
        
            deltaZ = 30 + Math.random() * 55;
            posZ += deltaZ
        }

        return pos;
    }, [props.roads, props.xOffset])

    useEffect(() =>
    {
        let len = (positions.length);
        let count = 0;

        for(let i = 0; i < len; i+=3)
        {
            dummy.position.set(positions[i], positions[i+1], positions[i+2]);
            dummy.updateMatrix();
            ref.current.setMatrixAt(count, dummy.matrix);

            count++;
        }
        ref.current.instanceMatrix.needsUpdate = true;
    }, [positions, dummy])

    totalZ = positions[positions.length - 1];
    const {camera} = useThree()

    useFrame((_, delta) =>
    {
        ref.current.position.z += 15 * delta;

        if(camera.position.z < ref.current.position.z)
        {
            ref.current.position.z -= totalZ * .5
        }
    })



    return(
        <instancedMesh 
        scale = {5} 
        ref = {ref} 
        args = {[null, null, positions.length / 3]}
        position = {[props.position[0], props.position[1], props.position[2] - totalZ]}>
            <sphereBufferGeometry args = {[0.2, 8, 16]}/>
            <meshLambertMaterial color = "#EEDD82" emissive = "#EEDD82" emissiveIntensity = {15}/>
        </instancedMesh>
    )
} 