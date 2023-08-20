export function SpireBuildingInstancedData(pX, pZ)
{
    let data = {
        pos: [],
        scale: [],
        conePos: [],
        coneScale: []
    }

    let w,h,l;

    let aggHeight = 0;

    //create bases.
    w = 40 + Math.random() * 50;
    aggHeight = h = 120 + Math.random() * 100;
    l = 40 + Math.random() * 50;

    data.pos.push(pX, h * .5, pZ);
    data.scale.push(w, h, l);

    let bases = 2 + Math.random() * 5;

    for(let i = 0; i < bases; i++)
    {
        w *= 0.8;
        h *= 0.8;
        l *= 0.8;

        data.pos.push(pX, aggHeight + h * .5, pZ);
        data.scale.push(w, h, l);

        aggHeight += h;
    }

    data.conePos.push(pX, aggHeight + 30, pZ);
    data.coneScale.push(w * .125, 60, w * .125);


    return data;
}