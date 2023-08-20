import { useEffect, useRef } from "react";
import { useMemo } from "react";
import { Object3D } from "three";
import ChooseBuilding from "./Helpers/ChooseBuilding";
import { RoadDataInstanced } from "../Road/Road";
import BridgeDataInstanced from "../Road/Bridge";
import SideWalkDataInstanced from "../Road/Sidewalk";
import { useFrame, useThree } from "@react-three/fiber";
import SetDummy, {SetDummy2, SetDummy3, SetDummySimple} from "./Helpers/SetDummy";
import StreetlightPositions from "../Road/Streetlights";


/**
 * This function accumulates the position and scale data for several types of complex buidings,
 * then assembles them as individual instanced meshes.  The buildings cover a [variable] default 2x10 plot space, 
 * which translates to 200 x 2000 units of world space.
 * 
 * Instancing is necessary to reduce draw calls.  Such optimizations allow for more detail to be added
 * to the city as a whole. For example, a 2x10 area of complex buildings would contain a maximum of 
 * 20 * 5 = 100 geometries.  With this solution, it would contain only 1 geometry.
 * 
 * One and done algorithm handling all buildings.  It is run twice, creating two distinct blocks, with one in front of the other.
 * When one is completely passed, it is shifted in front of its neighbor.
 * 
 * Complex building light tiers:
 * Standard: high light
 * M: Medium light
 * L: Low light
 */
export function BuildingPlotAlgorithm2(props)
{
    const refComplex = useRef();
    const refComplexM = useRef();
    const refComplexL = useRef();

    const refComplex2 = useRef();
    const refComplex2M = useRef();
    const refComplex2L = useRef();

    const refComplex3 = useRef();
    const refComplex3M = useRef();
    const refComplex3L = useRef();

    const refBridge = useRef();
    const refSegmentedWindow = useRef();
    const refSegmentedBase = useRef();
    const refSegmentedPyramid = useRef();
    const refWTower = useRef();
    const refChungusBuilding = useRef();
    const bcThinRef = useRef();
    const refStreetlight = useRef();

    const roadRef = useRef();
    const sideWalkRef = useRef();
    const groupRef = useRef();

    const iterations = useRef(0);
    const dummy = useMemo(() => {return new Object3D(0,0,0)}, []);
    const RoadLength = 1280;

    let condLight;

    const PositionMap = useMemo(() => 
    {
        let map = 
        {
            complexPositions:           [],
            complexScales:              [],

            complexPositionsM:          [], //
            complexScalesM:             [],

            complexPositionsL:          [], //
            complexScalesL:             [],

            complexPositions2:          [],
            complexScales2:             [],

            complexPositions2M:         [],
            complexScales2M:            [],

            complexPositions2L:         [],
            complexScales2L:            [],

            complexPositions3:          [],
            complexScales3:             [],

            complexPositions3M:         [],
            complexScales3M:            [],//

            complexPositions3L:         [],
            complexScales3L:            [],//

            segmentedWindowPositions:   [], 
            segmentedWindowScales:      [],

            segmentedBasePositions:     [],
            segmentedBaseScales:        [],

            segmentedTrianglePositions: [],
            segmentedTriangleScales:    [],

            roadPositions:              [],

            streetlightPositions:       [],

            sideWalkPositions:          [],
            sideWalkScales:             [],

            wTowerPositions:            [],
            wTowerScales:               [],

            bigPositions:               [],
            bigScales:                  [],

            bcThinPositions:            [],
            bcThinScales:               [],

            bridgePositions:            [],
            bridgeScales:               [],
        };

        const Ignores = new Map()

        let startX = -1200;
        let pX = startX;
        let pZ = 0;
        let data;
        let chosenIndex = 0;
        let proceedZLim = 11;
        let proceedXLim = 16;

        //configure road, bridge, sidewalk

        let xOffset = -1800;
        let numSidewalkSegments = 12;

        data = RoadDataInstanced(props.roadCount, RoadLength, xOffset)
        map.roadPositions.push(...data);

        data = BridgeDataInstanced(6000, 19);
        map.bridgePositions.push(...data.bridgePos);
        map.bridgeScales.push(...data.bridgeScale);

        data = SideWalkDataInstanced(xOffset, numSidewalkSegments);
        map.sideWalkPositions.push(...data.pos);
        map.sideWalkScales.push(...data.scale);

        data = StreetlightPositions(props.roadCount, RoadLength, xOffset)
        map.streetlightPositions.push(...data);

        /*
            Populate map with building data
        */
        for(let proceedZ = 0; proceedZ < proceedZLim; proceedZ++)
        {
            for(let proceedX = 0; proceedX < proceedXLim; proceedX++)
            {
                
                if(!Ignores.has(`${proceedX} ${proceedZ}`))
                {
                    ChooseBuilding(map, data, chosenIndex, pX, pZ, proceedX, proceedZ, Ignores);
                }

                if(proceedX % 2 === 0)
                {
                    pX += 100
                } 
                else pX += 200;
            }
            //reset X, increment Z
            pX = startX;
            if(proceedZ % 10 === 0 && proceedZ > 0) pZ -= 300;
            else pZ -= 100;
        }
        return map;
    }, [props.roadCount])

    //Load all instancedmesh objects with given points.
    useEffect(() =>
    {
        console.log(props.cache.complexBuildingWindowsM)
        let len = PositionMap.complexPositions.length;
        let count = 0;

        //create complex buildings
        for(let i = 0; i < len; i+=3)
        {
            SetDummy(dummy, PositionMap.complexPositions, PositionMap.complexScales, i);
            refComplex.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        refComplex.current.instanceMatrix.needsUpdate = true;

        len = PositionMap.complexPositions.length;
        count = 0;

        //create complex buildings 1M
        for(let i = 0; i < len; i+=3)
        {
            SetDummy(dummy, PositionMap.complexPositionsM, PositionMap.complexScalesM, i);
            refComplexM.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        refComplexM.current.instanceMatrix.needsUpdate = true;

        len = PositionMap.complexPositions.length;
        count = 0;

        //create complex buildings 1L
        for(let i = 0; i < len; i+=3)
        {
            SetDummy(dummy, PositionMap.complexPositionsL, PositionMap.complexScalesL, i);
            refComplexL.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        refComplexL.current.instanceMatrix.needsUpdate = true;

        
        //create complex buildings 2
        count = 0;
        len = PositionMap.complexPositions2.length;

        for(let i = 0; i < len; i+=3)
        {
            SetDummy(dummy, PositionMap.complexPositions2, PositionMap.complexScales2, i);
            refComplex2.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        refComplex2.current.instanceMatrix.needsUpdate = true;

        //create complex buildings 2M
        count = 0;
        len = PositionMap.complexPositions2M.length;

        for(let i = 0; i < len; i+=3)
        {
            SetDummy(dummy, PositionMap.complexPositions2M, PositionMap.complexScales2M, i);
            refComplex2M.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        refComplex2M.current.instanceMatrix.needsUpdate = true;

        //create complex buildings 2L
        count = 0;
        len = PositionMap.complexPositions2L.length;

        for(let i = 0; i < len; i+=3)
        {
            SetDummy(dummy, PositionMap.complexPositions2L, PositionMap.complexScales2L, i);
            refComplex2L.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        refComplex2L.current.instanceMatrix.needsUpdate = true;

        //create complex buildings 3
        count = 0;
        len = PositionMap.complexPositions3.length;

        for(let i = 0; i < len; i+=3)
        {
            SetDummy(dummy, PositionMap.complexPositions3, PositionMap.complexScales3, i);
            refComplex3.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        refComplex3.current.instanceMatrix.needsUpdate = true;

        len = PositionMap.complexPositions.length;
        count = 0;

        //create complex buildings 3M
        for(let i = 0; i < len; i+=3)
        {
            SetDummy(dummy, PositionMap.complexPositions3M, PositionMap.complexScales3M, i);
            refComplex3M.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        refComplex3M.current.instanceMatrix.needsUpdate = true;

        len = PositionMap.complexPositions.length;
        count = 0;

        //create complex buildings 3L
        for(let i = 0; i < len; i+=3)
        {
            SetDummy(dummy, PositionMap.complexPositions3L, PositionMap.complexScales3L, i);
            refComplex3L.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        refComplex3L.current.instanceMatrix.needsUpdate = true;


        //create bridges
        count = 0;
        len = PositionMap.bridgePositions.length;

        for(let i = 0; i < len; i+=3)
        {
            SetDummy(dummy, PositionMap.bridgePositions, PositionMap.bridgeScales, i);
            refBridge.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        refBridge.current.instanceMatrix.needsUpdate = true;

        //create sidewalwks
        count = 0;
        len = PositionMap.sideWalkPositions.length;

        for(let i = 0; i < len; i+=3)
        {
            SetDummy(dummy, PositionMap.sideWalkPositions, PositionMap.sideWalkScales, i);
            sideWalkRef.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        sideWalkRef.current.instanceMatrix.needsUpdate = true;

        //create streetlights
        count = 0;
        len = PositionMap.streetlightPositions.length;

        for(let i = 0; i < len; i+=3)
        {
            SetDummySimple(dummy, PositionMap.streetlightPositions, i);
            refStreetlight.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        refStreetlight.current.instanceMatrix.needsUpdate = true;

        //handle segmented windows
        count = 0;
        len = PositionMap.segmentedWindowPositions.length;

        for(let i = 0; i < len; i += 3)
        {
            SetDummy(dummy, PositionMap.segmentedWindowPositions, PositionMap.segmentedWindowScales, i);
            refSegmentedWindow.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        refSegmentedWindow.current.instanceMatrix.needsUpdate = true;

        //segmented base
        count = 0;
        len = PositionMap.segmentedBasePositions.length;
        for(let i = 0; i < len; i += 3)
        {
            SetDummy(dummy, PositionMap.segmentedBasePositions, PositionMap.segmentedBaseScales, i);
            refSegmentedBase.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        refSegmentedBase.current.instanceMatrix.needsUpdate = true;

        //segmented triangle
        count = 0;
        len = PositionMap.segmentedTrianglePositions.length;

        let rotations = [0, .8, 0]

        for(let i = 0; i < len; i += 3)
        {
            SetDummy2(dummy, PositionMap.segmentedTrianglePositions, PositionMap.segmentedTriangleScales, rotations, i)
            refSegmentedPyramid.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        refSegmentedPyramid.current.instanceMatrix.needsUpdate = true;

        //handle roads
        count = 0;
        rotations = [-Math.PI * .5, 0, 0];
        len = PositionMap.roadPositions.length;
        for(let i = 0; i < len; i += 3)
        {
            SetDummy3(dummy, PositionMap.roadPositions, [100, RoadLength, 100], rotations, i);

            roadRef.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        roadRef.current.instanceMatrix.needsUpdate = true;


        //WTower
        count = 0;
        rotations = [0, -Math.PI / 2, 0]
        len = PositionMap.wTowerPositions.length;

        for(let i = 0; i < len; i+=3)
        {
            SetDummy2(dummy, PositionMap.wTowerPositions, PositionMap.wTowerScales, rotations, i)
            refWTower.current.setMatrixAt(count, dummy.matrix);
            count += 1;

            condLight = (
            <pointLight 
            color = "red" 
            position = { [PositionMap.wTowerPositions[0], PositionMap.wTowerPositions[1] * 2, PositionMap.wTowerPositions[2]] }
            intensity = {2} />
            )
        }
        refWTower.current.instanceMatrix.needsUpdate = true;

        //BigBuilding
        count = 0;
        len = PositionMap.bigPositions.length;


        for(let i = 0; i < len; i+=3)
        {
            SetDummy2(dummy, PositionMap.bigPositions, PositionMap.bigScales, rotations, i)
            refChungusBuilding.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        refChungusBuilding.current.instanceMatrix.needsUpdate = true;


        //BC Thin (2x1)
        count = 0;
        len = PositionMap.bcThinPositions.length;

        for(let i = 0; i < len; i+=3)
        {
            SetDummy2(dummy, PositionMap.bcThinPositions, PositionMap.bcThinScales, rotations, i)
            bcThinRef.current.setMatrixAt(count, dummy.matrix);
            count += 1;
        }
        bcThinRef.current.instanceMatrix.needsUpdate = true;

    }, [PositionMap, dummy])




    const {camera} = useThree()
    useFrame(() =>
    {
        
        if(camera.position.z < groupRef.current.position.z - 1220)
        {
            groupRef.current.position.z -= 2560;
            iterations.current += 1;
            
            if(iterations.current >= 1)
            {
                iterations.current = 0;
            }
            
        }
    })

    return(
        <group {...props} ref = {groupRef}>
            {condLight}
            <instancedMesh 
                frustumCulled = {false}
                args = {[null, null, PositionMap.complexPositions.length / 3]}
                ref = {refComplex}
                material = {props.cache.complexBuildingWindows}
                geometry = {props.cache.boxGeo} 
                />

            <instancedMesh 
                frustumCulled = {false}
                args = {[null, null, PositionMap.complexPositionsM.length / 3]}
                ref = {refComplexM}
                material = {props.cache.complexBuildingWindowsM}
                geometry = {props.cache.boxGeo} 
                />

            <instancedMesh 
                frustumCulled = {false}
                args = {[null, null, PositionMap.complexPositionsL.length / 3]}
                ref = {refComplexL}
                material = {props.cache.complexBuildingWindowsL}
                geometry = {props.cache.boxGeo} 
                />

            <instancedMesh 
                frustumCulled = {false}
                args = {[null, null, PositionMap.complexPositions2.length / 3]}
                ref = {refComplex2}
                material = {props.cache.complexBuildingWindows2}
                geometry = {props.cache.boxGeo} 
                />

            <instancedMesh 
                frustumCulled = {false}
                args = {[null, null, PositionMap.complexPositions2M.length / 3]}
                ref = {refComplex2M}
                material = {props.cache.complexBuildingWindows2M}
                geometry = {props.cache.boxGeo} 
                />

                <instancedMesh 
                    frustumCulled = {false}
                    args = {[null, null, PositionMap.complexPositions2L.length / 3]}
                    ref = {refComplex2L}
                    material = {props.cache.complexBuildingWindows2L}
                    geometry = {props.cache.boxGeo} 
                    />
                <instancedMesh 
                frustumCulled = {false}
                args = {[null, null, PositionMap.complexPositions3.length / 3]}
                ref = {refComplex3}
                material = {props.cache.complexBuildingWindows3}
                geometry = {props.cache.boxGeo} 
                />

                <instancedMesh 
                    frustumCulled = {false}
                    args = {[null, null, PositionMap.complexPositions3M.length / 3]}
                    ref = {refComplex3M}
                    material = {props.cache.complexBuildingWindows3M}
                    geometry = {props.cache.boxGeo} 
                />

                <instancedMesh 
                    frustumCulled = {false}
                    args = {[null, null, PositionMap.complexPositions3L.length / 3]}
                    ref = {refComplex3L}
                    material = {props.cache.complexBuildingWindows3L}
                    geometry = {props.cache.boxGeo} 
                    />

                    <instancedMesh 
                    frustumCulled = {false}
                    scale = {40}
                    args = {[null, null, PositionMap.streetlightPositions.length / 3]}
                    ref = {refStreetlight}
                    material = {props.cache.streetlightMaterial}
                    geometry = {props.cache.boxGeo} 
                    />

                    <instancedMesh 
                    frustumCulled = {false}
                    args = {[null, null, PositionMap.bridgePositions.length / 3]}
                    ref = {refBridge}
                    material = {props.cache.bridgeMaterial}
                    geometry = {props.cache.boxGeo} 
                    />
                    
                    <instancedMesh 
                    frustumCulled = {false}
                    args = {[null, null, PositionMap.sideWalkPositions.length / 3]}
                    ref = {sideWalkRef}
                    material = {props.cache.sidewalkMaterial}
                    geometry = {props.cache.boxGeo} 
                    />

            <instancedMesh 
                frustumCulled = {false}
                args = {[null, null, PositionMap.bcThinPositions.length / 3]}
                ref = {bcThinRef}
                material = {props.cache.bcThinMat}
                geometry = {props.cache.boxGeo} 
            />
                
            <instancedMesh 
                frustumCulled = {false}
                args = {[null, null, PositionMap.wTowerPositions.length / 3]}
                ref = {refWTower}
                material = {props.cache.wTowerMaterial}
                geometry = {props.cache.boxGeo} 
                />
            
            <instancedMesh
                frustumCulled = {false}
                args = {[null, null, PositionMap.segmentedWindowPositions.length / 3]}
                ref = {refSegmentedWindow}
                material = {props.cache.segmentedBuildingWindow}
                geometry = {props.cache.boxGeo}
            />

            <instancedMesh 
                frustumCulled = {false}
                args = {[null, null, PositionMap.segmentedBasePositions.length / 3]}
                ref = {refSegmentedBase}
                material = {props.cache.segmentedBuildingBase}
                geometry = {props.cache.boxGeo}
            />

            <instancedMesh
                frustumCulled = {false}
                args = {[null, null, PositionMap.segmentedTrianglePositions.length /3]}
                ref = {refSegmentedPyramid}
                material = {props.cache.segmentedBuildingBase}
                geometry = {props.cache.coneGeo}
            />

            <instancedMesh
                frustumCulled = {false}
                args = {[null, null, PositionMap.roadPositions.length / 3]}
                ref = {roadRef}
                material = {props.cache.roadMaterial}
                geometry = {props.cache.planeGeo}
            />

                <instancedMesh
                frustumCulled = {false}
                args = {[null, null, PositionMap.bigPositions.length / 3]}
                ref = {refChungusBuilding}
                material = {props.cache.chungusMaterial}
                geometry = {props.cache.boxGeo}
            />

        </group>
    )
}
