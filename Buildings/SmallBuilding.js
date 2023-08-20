
export default function SmallBuildingInstancedData(pX, pZ)
{
    let data = {
        pos: [],
        scale: [],
        posBase: [],
        scaleBase: [],

    }

    let w = 30 + Math.random() * 40;
    let h = 30;
    let l = 65;

    let tX, tZ;

    data.pos.push(pX,h * .5,pZ );
    data.scale.push(w,h,l);

    //protruding rect
    if(Math.random() > 0.7)
    {
        let side = Math.random() > 0.5 ? 1:-1;

        if(Math.random() > .5)
        {
            tZ = pZ + (side * (l * .25));
            data.pos.push(pX, h + h * .5, tZ);
            data.scale.push(w - 10,h, l * .5)
        }
        else
        {
            data.pos.push(pX + (side * (w * .25)), h + h * .5, pZ );
            data.scale.push(w * .5, h, l)
        }
    }

    //beams
    if(Math.random() > 0.7)
    {
        data.posBase.push(pX, h * .5, pZ - (l * .25));
        data.scaleBase.push(w + 10,h, l * .125);

        data.posBase.push(pX, h/2, pZ + (l * .25));
        data.scaleBase.push(w + 10,h,l * .125);
    }

    //roof
    data.posBase.push(pX, h + (h * .1), pZ);
    data.scaleBase.push(w + 10, h * .2, l + 10);

    return data;
}