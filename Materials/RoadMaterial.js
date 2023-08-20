import { MeshPhongMaterial, MeshLambertMaterial, MeshBasicMaterial, PlaneGeometry, DoubleSide, NearestFilter, RepeatWrapping } from "three"
import corona from '../../../../assets/corona.png';

export const RoadMaterial = () =>
{
    return new MeshPhongMaterial({color: "#807E78", shininess: 100});
}

export const BridgeMaterial = () =>
{
    return new MeshPhongMaterial({color: "#8f8e8d", shininess: 20});
}

export const SideWalkMaterial = () =>
{
    return new MeshPhongMaterial({ color: "#d9d9d9", shininess: 20 })
}

export const StreetLightMaterial = ( Loader ) =>
{
    let mat = new MeshBasicMaterial({ transparent: true, side: DoubleSide, color: "white" })
    const loaded = Loader.load(corona);

    mat.alphaMap = loaded;
    mat.alphaMap.magFilter = NearestFilter;
    mat.alphaMap.wrapT = RepeatWrapping;
    mat.alphaMap.repeat.y = 1;

    return mat;
}