

export function CylinderBuilding(props)
{
    let radius = 25 + (Math.random()) * 25;
    let height = 70 + (Math.random() * 100);
    let radialSegments = 5 + Math.random() * 10;

    return(
        <group {...props}>
            <mesh position = {[0,height/2, 0]}>
                <cylinderGeometry args = {[radius, radius, height, radialSegments, 1]}/>
                <meshPhongMaterial shininess = {30} color = "green"/>
            </mesh>
        </group>
    )
}

export default function CylinderBuildingInstancedData(pX, pZ)
{
    let radius = 25 + Math.random() * 25;
    let height = 140 + Math.random() * 150;

    let data = {
        pos: [],
        scale: []
    }

    data.pos.push(pX, height * .5, pZ);
    data.scale.push(radius, radius, height);

    return data;
}