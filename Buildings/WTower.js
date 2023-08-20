
export default function WTowerInstancedData(pX, pZ)
{
    let data = {
        pos: [],
        scale: [],
        cone: [],
        coneScale: []
    }

    //composed of 3 layers on each side, 3x3 + 1 center.

    //create center, gets full height

    let h = 620 + Math.random() * 400;
    let wl = 60; // 60 * 3 = 180, 20 buffer from road.  each unit has 60 wl.

    //offset center relative to 2x2 plot, not 1x1.
    pX += 50;
    pZ -= 50;

    //middle piece.
    data.pos.push(pX, h * .5, pZ)
    data.scale.push(wl, h, wl);

    //handle front

    //1: rightmost piece is 35% total height.
    data.pos.push(pX + 60, h * .175, pZ + 60);
    data.scale.push(wl, h * .35, wl);

    //2: center piece: 75% of total height
    data.pos.push(pX, h * .375, pZ + 60);
    data.scale.push(wl, h * .75, wl);

    //3: leftmost piece
    data.pos.push(pX - 60, h * .25, pZ + 60);
    data.scale.push(wl, h * .5, wl);

    //handle left
    //1: center
    data.pos.push(pX - 60, h * .375, pZ);
    data.scale.push(wl, h * .75, wl);

    //2 left of center
    data.pos.push(pX - 60, h * .175, pZ - 60);
    data.scale.push(wl, h * .35, wl);

    //handle back

    //1: center
    data.pos.push(pX, h * .5, pZ - 60);
    data.scale.push(wl, h, wl);
    
    //2: left
    data.pos.push(pX + 60, h * .25, pZ - 60);
    data.scale.push(wl, h * .5, wl);

    //handle right
    data.pos.push(pX + 60, h * .375, pZ);
    data.scale.push(wl, h * .75, wl);

    //handle top antenna.
    
    //front
    data.cone.push(pX, h + 50, pZ);
    data.coneScale.push(4, 100, 4);

    data.cone.push(pX, h + 50, pZ - 60);
    data.coneScale.push(4, 100, 4);

    return data;

}