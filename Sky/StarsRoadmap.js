import { Object3D, Color } from 'three'
import { useThree} from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useMemo } from 'react'

export function StarsRoadmap(props)
{
    const ref = useRef()
    const {camera} = useThree()

    const ColorMemoized = useMemo(() => new Color(), []);
    const dummy = useMemo(() => new Object3D(), []);

    const ColorArray = useMemo(() => 
        Float32Array.from(new Array(props.count)
        .fill()
        .flatMap((_, i) => ColorMemoized.setHex(
            (Math.random() < 0.33) ? 0xf5d271 : (Math.random() > 0.5) ? 0x67a2f0 : 0x9da0a3)
            .toArray()))
            ,[props.count, ColorMemoized]
    )


    useEffect(() =>
    {
        let count = 0;

        for(count; count < props.count; count++)
        {
            dummy.position.set((Math.random() > 0.5 ? 1:-1) * Math.random() * 2000, Math.random() * 1000, Math.random() * 1000)
            dummy.updateMatrix()
            ref.current.setMatrixAt(count, dummy.matrix)
        }
    })


    useFrame(() =>
    {
        ref.current.position.z = camera.position.z - 2100;
    })

    camera.far = 8000;

    return(
    <instancedMesh 
    {...props}
    ref = {ref} args = {[null, null, (props.count)]} frustumCulled = {false}>
        <sphereBufferGeometry args = {[3,4, 8]} >
            <instancedBufferAttribute attach = "attributes-color" args = {[ColorArray, 3]} />
        </sphereBufferGeometry>
        <meshBasicMaterial color = "white" vertexColors transparent opacity = {1.0}/>
    </instancedMesh>)
}
