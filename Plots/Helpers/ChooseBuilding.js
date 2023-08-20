/*
    This comparison table is optimized to minimize comparisons for the most common results
    based on its integrated probability table.
*/

import { 
    BoxBuildingSegmented,
    SmallBuilding,
    ComplexBuilding,
    SpireBuilding,
    SegmentedBuilding,
    BigChungus2x1,
    BigChungus2x2,
    WTowerHandler,

    } from "./PopulateMap";
/*
    Choose building based on simple probability table.
*/
export default function ChooseBuilding(map, data, chosenIndex, pX, pZ, proceedX, proceedZ, Ignores)
{
    //2 wiide buildings

    if((proceedX & 1) == 0) //check if even or odd -- must be even for big building.
    {
        //ensure not last row
        if(proceedZ - 10 < 0)
        {
            if(map.wTowerPositions.length == 0)
            {
                chosenIndex = Math.random() * 10.5;
            }
            else
            {
                chosenIndex = Math.random() * 10.4;
            }

        }
        else chosenIndex = Math.random() * 10.2;
    }
    else chosenIndex = Math.random() * 10;

    //most common case by far.
    if(chosenIndex <= 7.8)
    {
        ComplexBuilding(map, pX, pZ);
    }
    else if(chosenIndex <= 10)
    {
        if(chosenIndex < 8.3)
        {
            SegmentedBuilding(map, pX, pZ);
        }
        else if(chosenIndex < 9)
        {
            SmallBuilding(map, pX, pZ);
        } 
        else
        {
            BoxBuildingSegmented(map, pX, pZ);
        }
    }
    //least common cases.
    else
    {
        if(chosenIndex <= 10.2)
        {
            BigChungus2x1(map, pX, pZ, Ignores, proceedX, proceedZ)
        }
        else if(chosenIndex <= 10.4)
        {
            BigChungus2x2(map, pX, pZ, Ignores, proceedX, proceedZ)
        }
        else
        {
            WTowerHandler(map, pX, pZ, Ignores, proceedX, proceedZ)
        }
    }


    
}
