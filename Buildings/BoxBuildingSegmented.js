
//window material, base geometry
export default function BoxBuildingSegmentedInstancedData(pX, pZ)
{
    let data = {
        positionsWindow: [],
        scalesWindow: [], 
        positionsBase: [], 
        scalesBase: []
    }

    //generate base window segment in 100x100 plot
    let h = 100 + Math.random() * 100;
    let wl = 50 + Math.random() * 45;

    data.positionsWindow.push(pX, h * .5, pZ);
    data.scalesWindow.push(wl, h, wl);

    //generate base segment
    data.positionsBase.push(pX, h * .5, pZ);
    data.scalesBase.push(wl + 2, h * .2, wl + 2);

    let iterations = Math.random() * 3;
    let priorHeight = h;

    for(let i = 0; i < iterations; i++)
    {
        //upkeep
        if(i > 0) priorHeight += h * .5;
        h /= 2;

        //window
        data.positionsWindow.push(pX, priorHeight, pZ);
        data.scalesWindow.push(wl, h, wl);

        //base
        data.positionsBase.push(pX, priorHeight, pZ);
        data.scalesBase.push(wl + 2, h  * .2, wl + 2);
    }

    return data;
}

export function BoxBuildingSegmentedInstancedDataVariant2(pX, pZ)
{
    let data = {
        positionsWindow: [],
        scalesWindow: [], 
        positionsBase: [], 
        scalesBase: [],
        triPos: [],
        triScales: []
    }

    //generate base window segment in 100x100 plot
    let h = 50 + Math.random() * 60;
    let wl = 50 + Math.random() * 25;

    data.positionsWindow.push(pX, h * .5, pZ);
    data.scalesWindow.push(wl, h, wl);

    //generate base segment
    data.positionsBase.push(pX, h * .1, pZ);
    data.scalesBase.push(wl + 8, h * .2, wl + 8);

    let iterations = Math.random() * 4;
    let priorHeight = h;

    for(let i = 0; i < iterations; i++)
    {
        //upkeep
        if(i > 0) priorHeight += h * .5;
        h /= 2;

        //window
        data.positionsWindow.push(pX, priorHeight - (h * .5), pZ);
        data.scalesWindow.push(wl, h, wl);

        /*
        data.positionsBase.push(pX, priorHeight - (h * .1), pZ);
        data.scalesBase.push(wl + 8, (h * .2) + 4 , wl + 8);
        */

    }

    if(Math.random() < 0.2)
    {
        data.triPos.push(pX + (Math.random() * wl * .5), priorHeight + 30, pZ);
        data.triScales.push(wl * .05, 60, wl * 0.05);
    }
    
    else
    {
        iterations = Math.random() * 2;
        let halfWL =  (wl - 3) * .5;
        let sign, posX, posZ;

        for(let j = 0; j < iterations; j++)
        {
            sign = j % 2 == 0 ? 1 : -1;

            posX = pX + Math.random() * halfWL * sign;
            posZ = pZ + Math.random() * halfWL * sign;

            data.positionsWindow.push(posX, priorHeight + 2.5, posZ)
            data.scalesWindow.push(wl * 0.2, 5, wl * 0.2);
        }
    }

    return data;
}