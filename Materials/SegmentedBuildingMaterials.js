import { Vector2 } from "three";
import window from '../../../../assets/buildingwindows12.png'
import windowe from '../../../../assets/buildingwindows12e.png'
import { NearestFilter, RepeatWrapping, MeshLambertMaterial, MeshPhongMaterial } from "three";

export const BaseMaterial = () =>
{
    let mat = new MeshPhongMaterial({color: "#252525", shininess: 100});
    return mat;
}

export const WindowMaterial = (Loader) =>
{
    const segmentedTexture = Loader.load(window);
    segmentedTexture.minFilter = NearestFilter;
    segmentedTexture.magFilter = NearestFilter;
    segmentedTexture.wrapS = RepeatWrapping;
    segmentedTexture.wrapT = RepeatWrapping;

    const segmentedTexturee = Loader.load(windowe);
    segmentedTexturee.minFilter = NearestFilter;
    segmentedTexturee.magFilter = NearestFilter;
    segmentedTexturee.wrapS = RepeatWrapping;
    segmentedTexturee.wrapT = RepeatWrapping;

    let mat1 = new MeshPhongMaterial({map: segmentedTexture, shininess: 100, emissiveMap: segmentedTexturee, emissive: "#ffbb73"});
    let mat2 = new MeshPhongMaterial({color: "#252525"});

    return( [mat1, mat1,mat2,mat1,mat1,mat1] );

}