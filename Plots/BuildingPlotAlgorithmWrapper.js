import { BuildingPlotAlgorithm2 } from "./BuildingPlotAlgorithm2";
import GatherMaterials from "../Materials/GatherMaterials";
import { useEffect, useState } from "react";

export default function BuildingPlotAlgorithmWrapper()
{
    const [cache, setCache] = useState(0);

    const loader = async() =>
    {
        setCache(await GatherMaterials());
    }    
    
    useEffect(() =>
    {
        if(cache === 0) loader();
    }, [cache])

    
    if(cache != 0)
    {
        return(
            <>
                <BuildingPlotAlgorithm2 cache = {cache} position = {[160, 0, 0]} roadCount = {12}/>
                <BuildingPlotAlgorithm2 cache = {cache} position = {[160, 0, -1280]} roadCount = {12}/>
            </>
        )
    }

    return null;
}