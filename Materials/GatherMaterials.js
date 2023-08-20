import { BaseMaterial, WindowMaterial } from "./SegmentedBuildingMaterials"
import { BoxBuildingComplexWindows1, BoxBuildingComplexWindows2, BoxBuildingComplexWindows3, 
    BoxBuildingComplexWindows2M, BoxBuildingComplexWindows2L, BoxBuildingComplexWindows1M, BoxBuildingComplexWindows1L, BoxBuildingComplexWindows3M, BoxBuildingComplexWindows3L } from "./BoxBuildingComplexMaterials";
import { useState } from "react"
import { TextureLoader } from "three";
import { BridgeMaterial, RoadMaterial, SideWalkMaterial, StreetLightMaterial} from "./RoadMaterial";
import { CylinderGeo14, CylinderGeo8, PlaneGeo, boxGeometry, Cone } from "./Geometries";
import { WTowerMaterial } from "./WTowerMaterials";
import { BigChungusMaterial, BCThinMat } from "./BigChungusBuildingMaterials";

export default async function GatherMaterials()
{
    const materials = {
        segmentedBuildingWindow: 0,
        segmentedBuildingBase: 0,

        complexBuildingWindows: 0,
        complexBuildingWindowsM: 0,
        complexBuildingWindowsL: 0,

        complexBuildingWindows2: 0,
        complexBuildingWindows2M: 0,
        complexBuildingWindows2L: 0,

        complexBuildingWindows3: 0,
        complexBuildingWindows3M: 0,
        complexBuildingWindows3L: 0,

        wTowerMaterial: 0,
        roadMaterial: 0,
        sidewalkMaterial: 0,
        streetlightMaterial: 0,
        bridgeMaterial: 0,
        chungusMaterial: 0,
        bcThinMat: 0,

        boxGeo: 0,
        coneGeo: 0,
        planeGeo: 0,
    }

    const Loader = new TextureLoader();


    const Setup = async() =>
    {

    /*segmented */
    let segmentedWindow = WindowMaterial(Loader);
    let segmentedBase = BaseMaterial();
    let segmentedBoxGeo = boxGeometry();
    let segmentedConeGeo = Cone();

    materials.segmentedBuildingBase = segmentedBase;
    materials.segmentedBuildingWindow = segmentedWindow;
    materials.boxGeo = segmentedBoxGeo;
    materials.coneGeo = segmentedConeGeo;
    /*****************/

    /*Complex building*/
    let complexWindow = BoxBuildingComplexWindows1(Loader);
    materials.complexBuildingWindows = complexWindow;

    complexWindow = BoxBuildingComplexWindows1M(Loader);
    materials.complexBuildingWindowsM = complexWindow;

    complexWindow = BoxBuildingComplexWindows1L(Loader);
    materials.complexBuildingWindowsL = complexWindow;

    complexWindow = BoxBuildingComplexWindows2(Loader);
    materials.complexBuildingWindows2 = complexWindow;
    
    complexWindow = BoxBuildingComplexWindows2M(Loader);
    materials.complexBuildingWindows2M = complexWindow;

    complexWindow = BoxBuildingComplexWindows2L(Loader);
    materials.complexBuildingWindows2L = complexWindow;

    complexWindow = BoxBuildingComplexWindows3(Loader);
    materials.complexBuildingWindows3 = complexWindow;

    complexWindow = BoxBuildingComplexWindows3M(Loader);
    materials.complexBuildingWindows3M = complexWindow;

    complexWindow = BoxBuildingComplexWindows3L(Loader);
    materials.complexBuildingWindows3L = complexWindow;


    //Road
    let plane = PlaneGeo()
    let roadMat = RoadMaterial()

    materials.streetlightMaterial = StreetLightMaterial(Loader);

    materials.planeGeo = plane;
    materials.roadMaterial = roadMat;

    roadMat = SideWalkMaterial();
    materials.sidewalkMaterial = roadMat;

    //wTower
    let wTowerMat = WTowerMaterial(Loader);
    materials.wTowerMaterial = wTowerMat;

    //Chungus
    let chungMat = BigChungusMaterial(Loader);
    materials.chungusMaterial = chungMat;

    //bc thin 2x1
    chungMat = BCThinMat(Loader);
    materials.bcThinMat = chungMat;

    //bridge
    chungMat = BridgeMaterial();
    materials.bridgeMaterial = chungMat;
    }


    const Load = async() =>
    {
        await Setup();
    }

    Load();

    return materials
}