import {useRef, useMemo, useEffect} from 'react';
import {Color, Object3D} from 'three'


/*
    Props:
    - direction: 0: front, 1: back, 2: left, 3: right
    - count
    - distBetween [x]
    - xDispersion [ added to value with rand ]
    - zDispersion [ added to value with rand ]
    - lightColor
    - bodyColor


*/
export default function Vehicles(props)
{
    const positions = useMemo(() =>
    {
        let map = [];
        let i = 0;

        let x = 0;
        let z = 0;

        for(i; i < props.count; i++)
        {
            x =  (props.xDispersion * Math.random());
            z = z + (props.zDispersion * Math.random());

            map.push([x,z]);

            z += props.distBetween;
        }

        return map;
    });

    const colors = useMemo(() =>
    {
        //3 items for each count, each item has 3 elements (rgb)
        const map = new Float32Array(props.count * 3 * 3);

        let i = 0;
        let color = new Color();
        let color2 = new Color();

        color.setColorName(props.lightColor);
        color2.setColorName(props.bodyColor);

        for(i; i < props.count;)
        {
            color.toArray(map, i * 3);
            i += 1;

            color.toArray(map, i * 3);
            i += 1;

            color2.toArray(map, i * 3);
            i += 1;
        }

        return map;
    })

    const dummy =  useMemo(() => new Object3D());

    const ref = useRef(); //instanced mesh

    useEffect(() =>
    {

        //rotate based on direction

        /*
        if(props.direction > 1)
        {
            ref.current.rotation.z = -Math.PI / 2;
        }
        */

        let i = 0;
        let c = 0;

        for(i; i < props.count; i++)
        {
            /* *** handle positions *** */

            //light 1
            dummy.position.set(positions[i][0], 50, positions[i][1] - 1);
            dummy.scale.set(0.5, 0.5, 0.5);
            dummy.updateMatrix();
            ref.current.setMatrixAt(c, dummy.matrix);
            c += 1;

            //light 2
            dummy.position.set(positions[i][0], 50, positions[i][1] + 1);
            dummy.scale.set(0.5, 0.5, 0.5);
            dummy.updateMatrix();
            ref.current.setMatrixAt(c, dummy.matrix);
            c += 1;

            //box
            dummy.position.set(positions[i][0] - 1.3, 50, positions[i][1]);
            dummy.scale.set(2,2,2);
            dummy.updateMatrix();
            ref.current.setMatrixAt(c, dummy.matrix);
            c += 1;

        }
        ref.current.instanceMatrix.needsUpdate = true;
    }, [])



    return(
        <instancedMesh ref = {ref} {...props} args = {[null, null, props.count * 3 * 3]}>
            <boxBufferGeometry args = {[1,1,1]}>
                <instancedBufferAttribute attach="attributes-color" args = {[colors, 3]}/>
            </boxBufferGeometry>
            <meshBasicMaterial vertexColors/>
        </instancedMesh>
    )
}


