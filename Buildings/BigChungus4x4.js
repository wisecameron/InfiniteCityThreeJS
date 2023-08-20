export function BigChungusBuildingInstancedData4x4(pX, pZ)
{
    let data = {
        pos: [],
        scale: [],
        linePos: [],
        lineScale: [],
        conePos: [],
        coneScale: []
    }

    let w,h,l;

    pX += 50;
    pZ -= 50;

    let aggHeight = 0;

    //create bases.
    w = 140 + Math.random() * 50;
    aggHeight = h = 120 + Math.random() * 100;
    l = 140 + Math.random() * 50;

    data.pos.push(pX, h * .5, pZ);
    data.scale.push(w, h, l);

    let bases = Math.random() * 3;

    for(let i = 0; i < bases; i++)
    {
        w *= 0.93;
        h *= 0.93;
        l *= 0.93;

        data.pos.push(pX, aggHeight + h * .5, pZ);
        data.scale.push(w, h, l);

        aggHeight += h;
    }

    if(Math.random() < .5)
    {
        data.conePos.push(pX - w * .25, aggHeight + 60, pZ - l * .25);
        data.coneScale.push(3, 120, 3);

        data.conePos.push(pX + w * .25, aggHeight + 60, pZ + l * .25);
        data.coneScale.push(3, 120, 3);
    }
    else
    {
        data.conePos.push(pX - w * .25, aggHeight + 60, pZ);
        data.coneScale.push(3, 120, 3);

        data.conePos.push(pX + w * .25, aggHeight + 60, pZ);
        data.coneScale.push(3, 120, 3);
    }

    return data;
}