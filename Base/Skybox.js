import { TextureLoader, BackSide, MeshStandardMaterial } from "three";
import i1 from '../../../../assets/Skybox/1.png'
import i2 from '../../../../assets/Skybox/2.png'
import i3 from '../../../../assets/Skybox/3.png'
import i4 from '../../../../assets/Skybox/4.png'
import i5 from '../../../../assets/Skybox/Top.png'


export default function Skybox(props)
{
    let loader = new TextureLoader()
    let img1 = loader.load(i1);



    return(
        <mesh 
        {...props}>
            <meshStandardMaterial map = {img1} side = {BackSide} />
            <sphereGeometry args = {[1, 8, 16]}/>
        </mesh>
    )

}