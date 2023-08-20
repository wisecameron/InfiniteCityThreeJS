export function SegementedBuildingInstancedData(pX, pZ)
{
    let wl = 0, h = 0, priorHeight = 0;
    let iterations = 1 + Math.random() * 2;
    let data = {positionsWindow: [], scalesWindow: [], positionsBase: [], scalesBase: [], positionsTri: [], scalesTri: []};

    h = 300 + Math.random() * 200;

    wl = 60 + Math.random() * 15;

    //window 1
    data.positionsWindow.push(pX, h * .5, pZ);
    data.scalesWindow.push(wl, h, wl);

    //base 1
    data.positionsBase.push(pX, h * .1, pZ);
    data.scalesBase.push(wl + 8, h * .2, wl + 8)

    priorHeight = h;

    for(let i = 0; i < iterations; i++)
    {
        wl = wl - (wl / 5);
        if(i > 0) priorHeight += h * .5;
        h /= 2;

        data.positionsWindow.push(pX, priorHeight, pZ);
        data.scalesWindow.push(wl, h, wl);

        //base
        data.positionsBase.push(pX, priorHeight, pZ);
        data.scalesBase.push(wl + 5, h * .2, wl + 5);


        //for pyramid top.
        if(i == Math.ceil(iterations) - 1)
        { 
            priorHeight += h * .5;
        }
    }


    data.positionsTri.push(pX, priorHeight + 5, pZ);
    data.scalesTri.push(wl * 0.7, 10, wl * 0.7);


    return data;
}

