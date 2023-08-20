import  {BoxBuildingComplexProceduralInstancedData} from "../../Buildings/BoxBuildingComplexProcedural"
import CylinderBuilding from "../../Buildings/CylinderBuilding";
import  {SegementedBuildingInstancedData} from "../../Buildings/SegmentedBuilding";
import BoxBuildingSegmentedInstancedData, {BoxBuildingSegmentedInstancedDataVariant2} from "../../Buildings/BoxBuildingSegmented";
import SmallBuildingInstancedData from "../../Buildings/SmallBuilding";
import {SpireBuildingInstancedData} from "../../Buildings/SpireBuilding";
import { BigChungusBuildingInstancedData } from "../../Buildings/BigChungusBuilding";
import { BigChungusBuildingInstancedData4x4 } from "../../Buildings/BigChungus4x4";
import WTowerInstancedData from "../../Buildings/WTower";
import CylinderBuildingInstancedData from "../../Buildings/CylinderBuilding";

export function BoxBuildingSegmented(map, pX, pZ)
{
    let data = BoxBuildingSegmentedInstancedDataVariant2(pX, pZ);

    map.complexPositions.push(...data.positionsWindow);
    map.complexScales.push(...data.scalesWindow);

    map.segmentedBasePositions.push(...data.positionsBase);
    map.segmentedBaseScales.push(...data.scalesBase);

    map.segmentedTrianglePositions.push(...data.triPos);
    map.segmentedTriangleScales.push(...data.triScales);
}

export function SmallBuilding(map, pX, pZ)
{
    let data = SmallBuildingInstancedData(pX, pZ);

    map.segmentedWindowPositions.push(...data.pos);
    map.segmentedWindowScales.push(...data.scale);

    map.segmentedBasePositions.push(...data.posBase)
    map.segmentedBaseScales.push(...data.scaleBase)
}

export function ComplexBuilding(map, pX, pZ)
{
    let data = BoxBuildingComplexProceduralInstancedData(pX, pZ);
    let r = Math.random()

    if(r < .33)
    {
        let f = Math.random();
        if(f < .33)
        {
            map.complexPositions.push(...data.positions);
            map.complexScales.push(...data.scales);
        }
        else if(f < .66)
        {
            map.complexPositionsM.push(...data.positions);
            map.complexScalesM.push(...data.scales);
        }
        else
        {
            map.complexPositionsL.push(...data.positions);
            map.complexScalesL.push(...data.scales);
        }
        return;
    }
    else if(r < .66)
    {
        r = Math.random()
        if(r < .33)
        {
            map.complexPositions2.push(...data.positions);
            map.complexScales2.push(...data.scales);  
        }
        else if(r < .67)
        {
            map.complexPositions2M.push(...data.positions);
            map.complexScales2M.push(...data.scales);  
        }
        else
        {
            map.complexPositions2L.push(...data.positions);
            map.complexScales2L.push(...data.scales);
        }

        return;
    }
    let f = Math.random();

    if(f <= .33)
    {
        map.complexPositions3.push(...data.positions);
        map.complexScales3.push(...data.scales);
    }
    else if(f <= .66)
    {
        map.complexPositions3M.push(...data.positions);
        map.complexScales3M.push(...data.scales);  
    }
    else
    {
        map.complexPositions3L.push(...data.positions);
        map.complexScales3L.push(...data.scales);
    }

}



export function SpireBuilding(map, pX, pZ)
{
    let data = SpireBuildingInstancedData(pX, pZ);

    map.complexPositions.push(...data.pos);
    map.complexScales.push(...data.scale);

    map.segmentedTrianglePositions.push(...data.conePos);
    map.segmentedTriangleScales.push(...data.coneScale);
}

export function SegmentedBuilding(map, pX, pZ)
{
    let data = SegementedBuildingInstancedData(pX, pZ);

    map.segmentedWindowPositions.push(...data.positionsWindow);
    map.segmentedBasePositions.push(...data.positionsBase);
    map.segmentedTrianglePositions.push(...data.positionsTri);

    map.segmentedWindowScales.push(...data.scalesWindow);
    map.segmentedBaseScales.push(...data.scalesBase);
    map.segmentedTriangleScales.push(...data.scalesTri);
}

export function BigChungus2x1(map, pX, pZ, Ignores, proceedX, proceedZ)
{
    let data = BigChungusBuildingInstancedData(pX, pZ);

    map.bcThinPositions.push(...data.pos);
    map.bcThinScales.push(...data.scale);

    Ignores.set(`${proceedX + 1} ${proceedZ}`, 1);
}

export function BigChungus2x2(map, pX, pZ, Ignores, proceedX, proceedZ)
{
    let data = BigChungusBuildingInstancedData4x4(pX, pZ)

    map.bigPositions.push(...data.pos);
    map.bigScales.push(...data.scale)

    map.segmentedTrianglePositions.push(...data.conePos);
    map.segmentedTriangleScales.push(...data.coneScale);

    Ignores.set(`${proceedX + 1} ${proceedZ}`, 1); //one right
    Ignores.set(`${proceedX} ${proceedZ + 1}`, 1); //one up
    Ignores.set(`${proceedX + 1} ${proceedZ + 1}`, 1); //one up, one right
}

export function WTowerHandler(map, pX, pZ, Ignores, proceedX, proceedZ)
{
    let data = WTowerInstancedData(pX, pZ);

    map.wTowerPositions.push(...data.pos);
    map.wTowerScales.push(...data.scale);

    map.segmentedTrianglePositions.push(...data.cone);
    map.segmentedTriangleScales.push(...data.coneScale);

    Ignores.set(`${proceedX + 1} ${proceedZ}`, 1); //one right
    Ignores.set(`${proceedX} ${proceedZ + 1}`, 1); //one up
    //Ignores.set(`${proceedX + 1} ${proceedZ + 1}`, 1); //one up, one right
}

export function CylinderBuildingSimple(map, pX, pZ)
{
    let data = CylinderBuildingInstancedData(pX, pZ);
    map.cylinderPositions.push(...data.pos);
    map.cylinderScales.push(...data.scale);
}