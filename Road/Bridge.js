export default function BridgeDataInstanced(length, roads)
{
    let data = {
        bridgePos: [],
        bridgeScale: [],
        beamPos: [],
        beamScale: []
    }

    //z : 1100 - 1200

    data.bridgePos.push(-150, 50, -1150);
    data.bridgeScale.push(length, 20, 90);

    let x,y,z;

    x = (-length / 2) + 60;
    y = 25;
    z = -1150;

    for(let i = 0; i < roads; i++)
    {
        data.bridgePos.push(x, y, z);
        data.bridgeScale.push(20, 50, 90);
        x += 300;
    }

    //bridge sides
    data.bridgePos.push(0, 70, -1105);
    data.bridgeScale.push(length, 5, 3)

    data.bridgePos.push(0, 70, -1195);
    data.bridgeScale.push(length, 5, 3)
    return data;

}