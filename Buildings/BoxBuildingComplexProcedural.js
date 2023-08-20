
import { useMemo, useRef } from "react"
import {  Object3D, Vector2 } from "three";
import * as THREE from 'three'
import { useEffect } from "react";


export function BoxBuildingComplexProceduralInstanced(props)
{
    const ref = useRef()

    const size = useMemo(() => ({
        w: 50,
        h: 120 + Math.random() * 250,
        l: 50}), []);

    const dummy = useMemo(() => {return new Object3D(0,0,0)})

    const ConstructedBuildingData = useMemo(() =>
    {
        let w,h,l;
        let data = {positions: [], scales: []};
        let xPos, zPos;
        let standin;

        //1: Create base geometry data.
        data.positions.push(0, size.h * .5, 0);
        data.scales.push(size.w,size.h, size.l);

        //step 2: Create random addition pieces.
        for( let i = 1 ; i < 6; i ++)
        {
            //Create protruding geometries.

            //get greatest possible size that will not break out of 100x100 plot
            w = 5 + (20 * Math.random());

            //calculate height & length smaller than original building.
            h = 30 + (Math.random() * (size.h - 60));
            l = 20 + (Math.random() * 20);

            //vispos
            xPos = 25 - (w * .5);

            //protrusionfactor
            xPos +=  5 + (((w-5) * .5) * Math.random());
            xPos *= (Math.random() > 0.5 ? -1:1);
            zPos = (23 - (l * .5)) * Math.random()

            if(Math.random() > 0.5)
            {
                standin = xPos;
                xPos = zPos;
                zPos = standin;
            }
            
            //push new points.
            data.positions.push(xPos, h * .5, zPos);
            data.scales.push(w, h, l)
                
        }
        return data;
    }, [size])

    //create instanced mesh
    useEffect(() =>
    {
        let len = ConstructedBuildingData.positions.length;
        let count = 0;

        for(let i = 0; i < len; i+=3)
        {
            dummy.position.set(ConstructedBuildingData.positions[i],
                ConstructedBuildingData.positions[i + 1],
                ConstructedBuildingData.positions[i + 2])
            dummy.scale.set(ConstructedBuildingData.scales[i],
                ConstructedBuildingData.scales[i + 1],
                ConstructedBuildingData.scales[i + 2])
            
            dummy.updateMatrix();
            ref.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        ref.current.instanceMatrix.needsUpdate = true;
    }, [ConstructedBuildingData])

    return(
        <instancedMesh
            args = {[null, null, ConstructedBuildingData.scales.length / 3]}
            ref = {ref}
            {...props}
            geometry = {props.cache.boxGeo}
            material = {props.cache.complexBuildingWindows} />
    )
}

export function BoxBuildingComplexProceduralInstancedData(posX, posZ)
{
    const size = ({
        w: 50,
        h: 120 + Math.random() * 250,
        l: 50})

    let w,h,l;
    let data = {positions: [], scales: []};
    let xPos, zPos;
    let standin;

    //1: Create base geometry data.
    data.positions.push(posX, size.h * .5, posZ);
    data.scales.push(size.w,size.h, size.l);

    //step 2: Create random addition pieces.
    for( let i = 1 ; i < 6; i ++)
    {
        //Create protruding geometries.

        //get greatest possible size that will not break out of 100x100 plot
        w = 5 + (20 * Math.random());

        //calculate height & length smaller than original building.
        h = 30 + (Math.random() * (size.h - 60));
        l = 20 + (Math.random() * 20);

        //vispos
        xPos = 25 - (w/2);

        //protrusionfactor
        xPos +=  5 + (((w-5) * .5) * Math.random());
        xPos *= (Math.random() > 0.5 ? -1:1);
        zPos = (23 - (l * .5)) * Math.random()

        if(Math.random() > 0.5)
        {
            standin = xPos;
            xPos = zPos;
            zPos = standin;
        }
        
        //push new points.
        data.positions.push(xPos + posX, h * .5, zPos + posZ);
        data.scales.push(w, h, l)
            
    }
    return data;

}
