//roadCount, roadLength, xOffset
export default function StreetlightPositions(props)
{
    let data = [];
    let x = -100 + props.startX;
    //place road positions in data

    for(let i = 0; i < props.roadCount; i ++)
    {
        let inc = props.RoadLength / 20;
        let p = 0;

        for(let j = 0; j < 20; j++)
        {
            data.push(x - 20, 40, p);
            data.push(x + 20,40, p);
            p-=inc;
        }

        //do another for loop to populate going all the way up

        
        x+= 300;
    }

    return data;
}