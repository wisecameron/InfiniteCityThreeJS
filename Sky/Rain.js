import { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from '@react-three/fiber'
import { MeshBasicMaterial, Object3D } from "three";

export default function Rain(props)
{
    const ref = useRef()
    const ref2 = useRef()
    const dummy = useMemo(() => {return new Object3D(0,0,0)}, []);
    const mat = useMemo(() => {return new MeshBasicMaterial({color: "white"})}, []);

    const spreadY = 5000;

    //step 1: Create rain positions

    const positions = useMemo(() =>
    {
        let pos = []

        let spreadX = 2000;
        let spreadZ = -6000;

        let x,y,z, r1, r2, r3;

        for(let i = 0; i < props.total; i++)
        {
            r1 = Math.random();
            r2 = Math.random() * 1.7;
            r3 = Math.random();

            x = spreadX * r1;
            y = spreadY * r2;
            z = spreadZ * r3;
            
            pos.push(x,y,z);
        }
        return pos;
    }, [props.total])

    useEffect(() =>
    {
        let count = 0;
        let l = positions.length;
        for(let i = 0; i < l; i+= 3)
        {

            dummy.position.set(
                positions[ i ],
                positions[ i + 1 ],
                positions[ i + 2]
            );

            dummy.updateMatrix();
            ref.current.setMatrixAt(count, dummy.matrix);
            count++;
        }
        ref.current.instanceMatrix.needsUpdate = true;

    }, [positions])

    const {camera} = useThree()
    const limit = -1 * spreadY + 600;
    let dropSpeed = 800;

    useFrame((_, delta) =>
    {
        ref.current.position.y -= dropSpeed * delta;

        if(ref.current.position.y < limit)
        {
            ref.current.position.y = 0;
        }

        ref.current.position.z = camera.position.z;

    })

    return(
        <>
            <instancedMesh 
            {...props}
            position = {[props.position[0], spreadY * .5 , props.position[2]]}
            args = {[null, null, positions.length / 3]}
            ref = {ref}
            material = {mat}
            frustumCulled = {false}>
                <sphereBufferGeometry args = {[1, 2, 4]}/>
            </instancedMesh>

        </>

    )
}