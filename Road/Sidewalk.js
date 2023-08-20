
export default function SideWalkDataInstanced(startX, count)
{
    let data = 
    {
        pos: [],
        scale: [],
    }

    let x = -145 + startX;



    for(let i = 0; i < count; i++)
    {
        data.pos.push(x, 2.5, -640);
        data.scale.push(10, 3, 1280);
    
        data.pos.push(x + 100, 2.5, -640);
        data.scale.push(10, 3, 1280);

        x += 300;
    }

    return data;
}