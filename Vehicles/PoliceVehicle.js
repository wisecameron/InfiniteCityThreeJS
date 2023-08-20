import { useRef, useState} from "react";
import {useFrame , useThree} from '@react-three/fiber'

export default function PoliceVehicle(props)
{
    const ref = useRef()
    const lightRef = useRef("#0000FF")
    const ref2 = useRef()
    const speedRef = useRef(245)
    const timePassed = useRef(0)

    const [lightCol, setCol] = useState("blue")

    const {camera} =  useThree()

    
    useFrame((_, delta) =>
    {
        //movement, reset.
        ref.current.position.z -= delta * speedRef.current;

        if(ref.current.position.z < camera.position.z - 3500)
        {
            ref.current.position.z = camera.position.z;

            if(Math.random() > .5)
            {
                ref.current.position.x = (60 + (300 * (Math.ceil(Math.random() * 3))));
            }
            else
            {
                ref.current.position.x = (-260 - (300 * (Math.ceil(Math.random() * 3))));
            }

            speedRef.current = 250 + Math.random() * 435;
        }
        
        //light
        timePassed.current += delta

        if(timePassed.current > 0.15)
        {
            if(lightCol == "blue")
            {
                setCol("red")
            }
            else
            {
                setCol("blue")
            }
            timePassed.current = 0;
        }

    })

    return(
        <group ref = {ref}
        position = {[60, 50, 0]}>
            <mesh>
                <boxGeometry args = {[2, 2, 5]} />
                <meshBasicMaterial color = "red" />
            </mesh>
            <pointLight color = {lightCol} intensity = {1.5} distance = {500}/>
        </group>
    )
}