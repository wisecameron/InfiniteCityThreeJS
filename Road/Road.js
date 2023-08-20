export function RoadDataInstanced(roadCount, RoadLength, startX)
{
    let data = [];
    let x = -100 + startX;
    //place road positions in data


    for(let i = 0; i < roadCount; i ++)
    {
        data.push(x, 0, -RoadLength / 2);
        x+= 300;
    }

    return data;
}
