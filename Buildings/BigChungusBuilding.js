export function BigChungusBuildingInstancedData(pX, pZ)
{
    let data = {
        pos: [],
        scale: [],
        linePos: [],
        lineScale: []
    }

    let w,h,l;

    let aggHeight = 0;

    //create bases.
    w = 110 + Math.random() * 50;
    aggHeight = h = 120 + Math.random() * 100;
    l = 40 + Math.random() * 50;

    data.pos.push(pX + 50, h / 2, pZ);
    data.scale.push(w, h, l);

    let bases = Math.random() * 6;

    for(let i = 0; i < bases; i++)
    {
        w *= 0.93;
        h *= 0.93;
        l *= 0.93;

        data.pos.push(pX + 50, aggHeight + h/2, pZ);
        data.scale.push(w, h, l);

        aggHeight += h;
    }

    /*
    //add segments -> same number of segments on each base.

    let segments = 0;

    for(let i = 0; i < segments; i++)
    {

    }
    */

    return data;
}