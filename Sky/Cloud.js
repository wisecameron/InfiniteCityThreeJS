import { CloudMaterial } from "../Materials/CloudMaterial";
import { Object3D, TextureLoader } from "three";
import { useRef, useMemo, useEffect } from "react";
import {useFrame, useThree} from '@react-three/fiber';

/**
 * Props: count
 */
export function CloudsInstanced(props)
{
    const Loader = new TextureLoader();
    const material = CloudMaterial(Loader);
    const dummy = useMemo(() => {return new Object3D(0,0,0)}, []);

    const ref = useRef();
    const {camera} = useThree();

    const positions = useMemo(() =>
    {
        let posMap = [];
        let x, y, z;
        const yPosLow = 0;
        
        x = -2;
        z = 0;

        for(let i = 0; i < props.total; i++)
        {
            x += 0.2 + Math.random() * 0.6
            y = yPosLow + (Math.random() * 0.4);
            z += 0.1;
            posMap.push(x);
            posMap.push(y);
            posMap.push(z);    
        }
        return posMap;

    }, [props.total]);


    useEffect(() =>
    {
        let c = 0;
        //map positions
        let len = positions.length;

        for(let i = 0; i < len; i+=3)
        {
            dummy.position.set(positions[i], positions[i + 1], positions[i + 2]);
            dummy.updateMatrix();
            ref.current.setMatrixAt(c, dummy.matrix);
            c++;
        }
        ref.current.instanceMatrix.needsUpdate = true;

    }, [positions, dummy])

    
    useFrame((state) =>
    {
 
       // ref.current.position.z = camera.position.z - 490;
        /*
        for(let i = 0; i < props.total; i++)
        {
            ref.current.getMatrixAt(i, dummy.matrix);
            dummy.rotation.z += 0.00005;
            dummy.updateMatrix();
            ref.current.setMatrixAt(i, dummy.matrix);
        }
        ref.current.instanceMatrix.needsUpdate = true;
        */
    })

    return(
        <instancedMesh 
        ref = {ref}
        {...props}
        args = {[null, null, props.total * 3]}
        material = {material}
        scale = {500}
        >
            <planeBufferGeometry args = {[1,1]}/>
        </instancedMesh>
    )
}

/*
    Depth, width
*/
export function CloudSystemInstanced(props)
{
    const Loader = new TextureLoader();
    const material = CloudMaterial(Loader);
    const dummy = useMemo(() => {return new Object3D(0,0,0)}, []);
    const ref = useRef();

    const zFin = useRef(-300);
    const zLim = useRef(props.zLim);
    const {camera} = useThree()

    let yPosLow = 550;
    const positions = useMemo(() =>
    {
        let map = []
        let x = -1500;
        let y = 0;
        let z = zFin.current;

        for(let i = 0; i < props.depth; i++)
        {
            z = zFin.current;
            for(let j = 0; j < props.width; j++)
            {
                x += 150 + Math.random() * 250
                y = yPosLow + Math.random() * 100;
                z -= 3.5;
                map.push(x);
                map.push(y);
                map.push(z);    
            }
            zFin.current -= props.zStep;
            x = -1500;
        }

        return map;

    }, [ props.width, props.depth ])

    useFrame(() =>
    {
        if(camera.position.z < zLim.current)
        {
            ref.current.position.z -= (2 * (props.depth * props.zStep));
            zLim.current -= 2 * (props.depth * props.zStep);
        }
    })

    useEffect(() =>
    {
        let c = 0;
        let totalPositions = 3 * (props.depth * props.width);

        for(let i = 0; i < totalPositions; i+=3)
        {
            dummy.position.set(positions[i], positions[i + 1], positions[i + 2]);
            dummy.rotation.set(0.7,0,0)
            dummy.updateMatrix();
            ref.current.setMatrixAt(c, dummy.matrix);
            c++;
        }
        ref.current.instanceMatrix.needsUpdate = true;
    }, [])

    return(
        <instancedMesh
        rotation = {[0,0,0]}
        ref = {ref}
        {...props}
        args = {[null, null, positions.length / 3]}
        material = {material}
        scale = {1}>
            <planeBufferGeometry args = {[500,500]} />
        </instancedMesh>
    )
}

export default function CloudHandler()
{
    const ref = useRef()
    const ref2 = useRef()
    const zStep = 400;
    const zLim = -2 * zStep;

    const depth = 2;
    const width = 15;

    return(
        <>
            <CloudSystemInstanced width = {width} depth = {depth} position = {[0,0,0]} zLim = {-zStep * depth} zStep = {zStep}/>
            <CloudSystemInstanced width = {width} depth = {depth} position = {[0,0,-depth * zStep]} zLim = {zLim * depth} zStep = {zStep}/>

            <CloudSystemInstanced width = {width} depth = {depth} position = {[0,200,0]} zLim = {-zStep * depth} zStep = {zStep}/>
            <CloudSystemInstanced width = {width} depth = {depth} position = {[0,200,-depth * zStep]} zLim = {zLim * depth} zStep = {zStep}/>
        </>
    )
}