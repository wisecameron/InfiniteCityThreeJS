import windowTexture1 from '../../../../assets/windowTexture1.png';
import windowTexture1e from '../../../../assets/windowTexture1e.png';

import windowTexture1M from '../../../../assets/windowTexture1M.png';
import windowTexture1Me from '../../../../assets/windowTexture1Me.png';

import windowTexture1L from '../../../../assets/windowTexture1L.png';
import windowTexture1Le from '../../../../assets/windowTexture1Le.png';

import windowTexture2 from '../../../../assets/windowTexture2.png';
import windowTexture2e from '../../../../assets/windowTexture2e.png';

import windowTexture2M from '../../../../assets/windowTexture2M.png';
import windowTexture2Me from '../../../../assets/windowTexture2Me.png';

import windowTexture2L from '../../../../assets/windowTexture2L.png';
import windowTexture2Le from '../../../../assets/windowTexture2Le.png';

import windowTexture2ef from '../../../../assets/buildingwindows4testf.png'

import windowTexture3e from '../../../../assets/buildingwindows3e.png'
import windowTexture3 from '../../../../assets/buildingwindows3.png'
import windowTexture3m from '../../../../assets/windowTexture3M.png';
import windowTexture3me from '../../../../assets/windowTexture3Me.png';
import windowTexture3L from '../../../../assets/windowTexture3L.png';
import windowTexture3Le from '../../../../assets/windowTexture3Le.png';

import wt3em from '../../../../assets/cbl2e2.png';
import wt3emem from '../../../../assets/cbl2ee.png';

//7,4,9 complex
//5, 12 is good for spire

import { sRGBEncoding, NearestFilter, RepeatWrapping, MeshPhongMaterial } from 'three';

export const BoxBuildingComplexWindows1 = (Loader) =>
{
    let mat2 = new MeshPhongMaterial({color: "black", shininess: 100})
    //windowTexture12
    const loaded2 = Loader.load(windowTexture1);
    loaded2.minFilter = NearestFilter;
    loaded2.magFilter = NearestFilter;
    loaded2.wrapS = RepeatWrapping;
    loaded2.wrapT = RepeatWrapping;
    loaded2.encoding = sRGBEncoding;
    
    //windowTexture12
    const loaded24 = Loader.load(windowTexture1e);
    loaded24.minFilter = NearestFilter;
    loaded24.magFilter = NearestFilter;
    loaded24.wrapS = RepeatWrapping;
    loaded24.wrapT = RepeatWrapping;
    loaded24.encoding = sRGBEncoding;

    let mat1 = new MeshPhongMaterial({map: loaded2, emissiveMap: loaded24, emissive: "white", shininess: 100, emissiveIntensity: 1.5});

    mat1.needsUpdate = true;

    return( [mat1, mat1,mat2,mat1,mat1,mat1] );
}
export const BoxBuildingComplexWindows1M = (Loader) =>
{
    let mat2 = new MeshPhongMaterial({color: "black", shininess: 100})

    const loaded2 = Loader.load(windowTexture1M);
    loaded2.minFilter = NearestFilter;
    loaded2.magFilter = NearestFilter;
    loaded2.wrapS = RepeatWrapping;
    loaded2.wrapT = RepeatWrapping;

    const loaded24 = Loader.load(windowTexture1Me);
    loaded24.minFilter = NearestFilter;
    loaded24.magFilter = NearestFilter;
    loaded24.wrapS = RepeatWrapping;
    loaded24.wrapT = RepeatWrapping;
    loaded24.encoding = sRGBEncoding;

    let mat1 = new MeshPhongMaterial({map:loaded2, shininess: 100, emissiveMap: loaded24, emissive: "white"});
    mat1.needsUpdate = true;

    return( [mat1, mat1,mat2,mat1,mat1,mat1] );
}

export const BoxBuildingComplexWindows1L = (Loader) =>
{
    let mat2 = new MeshPhongMaterial({color: "black", shininess: 100})

    const loaded2 = Loader.load(windowTexture1L);
    loaded2.minFilter = NearestFilter;
    loaded2.magFilter = NearestFilter;
    loaded2.wrapS = RepeatWrapping;
    loaded2.wrapT = RepeatWrapping;


    const loaded24 = Loader.load(windowTexture1Le);
    loaded24.minFilter = NearestFilter;
    loaded24.magFilter = NearestFilter;
    loaded24.wrapS = RepeatWrapping;
    loaded24.wrapT = RepeatWrapping;
    loaded24.encoding = sRGBEncoding;

    let mat1 = new MeshPhongMaterial({map:loaded2, shininess: 100, emissiveMap: loaded24, emissive: "white"});
    mat1.needsUpdate = true;

    return( [mat1, mat1,mat2,mat1,mat1,mat1] );
}


export const BoxBuildingComplexWindows2 = (Loader) =>
{
    let loaded2 = Loader.load(windowTexture2);
    loaded2.minFilter = NearestFilter;
    loaded2.magFilter = NearestFilter;
    loaded2.wrapS = RepeatWrapping;
    loaded2.wrapT = RepeatWrapping;
    loaded2.encoding = sRGBEncoding;

    let loaded21 = Loader.load(windowTexture2e);
    loaded2.minFilter = NearestFilter;
    loaded2.magFilter = NearestFilter;
    loaded2.wrapS = RepeatWrapping;
    loaded2.wrapT = RepeatWrapping;
    loaded2.encoding = sRGBEncoding;

    const mat1 = new MeshPhongMaterial({shininess: 100, map: loaded2, emissiveMap: loaded21, emissiveIntensity: 1, emissive: "white"});
    const mat2 = new MeshPhongMaterial({color: "black", shininess: 100})
    mat1.needsUpdate = true;

    return( [mat1, mat1,mat2,mat1,mat1,mat1] );
}

export const BoxBuildingComplexWindows2M = (Loader) =>
{
    let loaded = Loader.load(windowTexture2M);
    loaded.minFilter = NearestFilter;
    loaded.magFilter = NearestFilter;
    loaded.wrapS = RepeatWrapping;
    loaded.wrapT = RepeatWrapping;
    loaded.encoding = sRGBEncoding;

    let loadede = Loader.load(windowTexture2Me);
    loadede.minFilter = NearestFilter;
    loadede.magFilter = NearestFilter;
    loadede.wrapS = RepeatWrapping;
    loadede.wrapT = RepeatWrapping;
    loadede.encoding = sRGBEncoding;

    const mat1 = new MeshPhongMaterial({shininess: 100, map: loaded, emissiveMap: loadede, emissive: "#d4b942"});
    const mat2 = new MeshPhongMaterial({color: "black", shininess: 100})
    mat1.needsUpdate = true;

    return( [mat1, mat1,mat2,mat1,mat1,mat1] );
}

export const BoxBuildingComplexWindows2L = (Loader) =>
{
    let loaded = Loader.load(windowTexture2L);
    loaded.minFilter = NearestFilter;
    loaded.magFilter = NearestFilter;
    loaded.wrapS = RepeatWrapping;
    loaded.wrapT = RepeatWrapping;

    let loaded2 = Loader.load(windowTexture2Le);
    loaded2.minFilter = NearestFilter;
    loaded2.magFilter = NearestFilter;
    loaded2.wrapS = RepeatWrapping;
    loaded2.wrapT = RepeatWrapping;
    loaded2.encoding = sRGBEncoding;

    const mat1 = new MeshPhongMaterial({map: loaded, shininess: 100});
    const mat2 = new MeshPhongMaterial({color: "black", shininess: 100})
    mat1.needsUpdate = true;

    return( [mat1, mat1,mat2,mat1,mat1,mat1] );
}




export const BoxBuildingComplexWindows3 = (Loader) =>
{
    const loaded = Loader.load(windowTexture3e);
    loaded.minFilter = NearestFilter;
    loaded.magFilter = NearestFilter;
    loaded.wrapS = RepeatWrapping;
    loaded.wrapT = RepeatWrapping;
    loaded.encoding = sRGBEncoding;

    const loaded2 = Loader.load(windowTexture3);
    loaded.minFilter = NearestFilter;
    loaded.magFilter = NearestFilter;
    loaded.wrapS = RepeatWrapping;
    loaded.wrapT = RepeatWrapping;
    loaded.encoding = sRGBEncoding;

    const mat1 = new MeshPhongMaterial({map: loaded2, shininess: 100, emissiveMap: loaded, emissiveIntensity: 1, emissive: "white"});
    const mat2 = new MeshPhongMaterial({color: "black", shininess: 100})
    mat1.needsUpdate = true;

    return( [mat1, mat1,mat2,mat1,mat1,mat1] );
}

export const BoxBuildingComplexWindows3M = (Loader) =>
{

    const loaded2 = Loader.load(windowTexture3m);
    loaded2.minFilter = NearestFilter;
    loaded2.magFilter = NearestFilter;
    loaded2.wrapS = RepeatWrapping;
    loaded2.wrapT = RepeatWrapping;
    loaded2.encoding = sRGBEncoding;

    const loaded24 = Loader.load(windowTexture3me);
    loaded24.minFilter = NearestFilter;
    loaded24.magFilter = NearestFilter;
    loaded24.wrapS = RepeatWrapping;
    loaded24.wrapT = RepeatWrapping;
    loaded24.encoding = sRGBEncoding;

    let mat1 = new MeshPhongMaterial({map: loaded2, shininess: 10, emissiveMap: loaded24, emissive: "white", emissiveIntensity: 1});
    let mat2 = new MeshPhongMaterial({color: "black", shininess: 100});
    mat1.needsUpdate = true;

    return( [mat1, mat1,mat2,mat1,mat1,mat1] );
}

export const BoxBuildingComplexWindows3L = (Loader) =>
{
    let mat2 = new MeshPhongMaterial({color: "black", shininess: 100})

    const loaded2 = Loader.load(windowTexture3L);
    loaded2.minFilter = NearestFilter;
    loaded2.magFilter = NearestFilter;
    loaded2.wrapS = RepeatWrapping;
    loaded2.wrapT = RepeatWrapping;

    const loaded24 = Loader.load(windowTexture3Le);
    loaded24.minFilter = NearestFilter;
    loaded24.magFilter = NearestFilter;
    loaded24.wrapS = RepeatWrapping;
    loaded24.wrapT = RepeatWrapping;
    loaded24.encoding = sRGBEncoding;

    let mat1 = new MeshPhongMaterial({map:loaded2, shininess: 100, emissiveMap: loaded24, emissive: "white",});
    mat1.needsUpdate = true;

    return( [mat1, mat1,mat2,mat1,mat1,mat1] );
}