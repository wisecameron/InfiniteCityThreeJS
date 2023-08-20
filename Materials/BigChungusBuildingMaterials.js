import windowTexture2 from '../../../../assets/buildingwindowsbc.png';
import windowTexture2e from '../../../../assets/buildingwindowsbce.png';
import windowTexture3 from '../../../../assets/buildingwindows3v2.png';
import emi from '../../../../assets/emissive.png';

import { sRGBEncoding, MeshLambertMaterial, NearestFilter, RepeatWrapping, MeshPhongMaterial } from 'three';

export const BigChungusMaterial = (Loader) =>
{
    const loaded = Loader.load(windowTexture2);
    loaded.minFilter = NearestFilter;
    loaded.magFilter = NearestFilter;
    loaded.wrapS = RepeatWrapping;
    loaded.wrapT = RepeatWrapping;
    loaded.encoding = sRGBEncoding;

    const loadede = Loader.load(windowTexture2e);
    loadede.minFilter = NearestFilter;
    loadede.magFilter = NearestFilter;
    loadede.wrapS = RepeatWrapping;
    loadede.wrapT = RepeatWrapping;
    loadede.encoding = sRGBEncoding;

    const mat1 = new MeshPhongMaterial({map: loaded, shininess: 100, emissiveMap: loadede, emissive: "white"});
    const mat2 = new MeshPhongMaterial({color: "black", shininess: 100})


    return( [mat1, mat1,mat2,mat1,mat1,mat1] );
}

export const BCThinMat = (Loader) =>
{
    const loaded = Loader.load(windowTexture3);
    loaded.minFilter = NearestFilter;
    loaded.magFilter = NearestFilter;
    loaded.wrapS = RepeatWrapping;
    loaded.wrapT = RepeatWrapping;
    loaded.encoding = sRGBEncoding;

    const loaded2 = Loader.load(emi);
    loaded2.minFilter = NearestFilter;
    loaded2.magFilter = NearestFilter;
    loaded2.wrapS = RepeatWrapping;
    loaded2.wrapT = RepeatWrapping;
    loaded2.encoding = sRGBEncoding;

    const mat1 = new MeshPhongMaterial({map: loaded, shininess: 100, emissiveMap: loaded2, emissive: "white"});
    const mat2 = new MeshPhongMaterial({color: "black", shininess: 100})


    return( [mat1, mat1,mat2,mat1,mat1,mat1] );
}
