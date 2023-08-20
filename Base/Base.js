import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import {useMemo} from 'react'
import { MeshBasicMaterial, PlaneGeometry } from 'three'



export default function Base(props)
{
    const BaseMaterial = useMemo(() =>
    {
        return new MeshBasicMaterial({color: "#000000"});
    }, [])

    const PlaneGeo = useMemo(() =>
    {
        return new PlaneGeometry(1,1)
    })

    const {camera} = useThree()

    const p = useRef(-5000)
    const ref = useRef()

    useFrame(() =>
    {
        if(camera.position.z < p.current)
        {
            p.current -= 5000
            ref.current.position.z -= 5000;
        }
    })
    return(
        <mesh
        ref = {ref}
        geometry={PlaneGeo}
        material = {BaseMaterial}
        scale = {10000}
        {...props}
        rotation = {[-Math.PI / 2, 0, 0]}>
        
        </mesh>
    )
}