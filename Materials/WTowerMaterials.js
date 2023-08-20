import em from '../../../../assets/cbl2e2.png';
import e from '../../../../assets/cbl2ee.png';

import { sRGBEncoding, MeshLambertMaterial, MeshPhongMaterial, NearestFilter, RepeatWrapping } from 'three';

export const WTowerMaterial = (Loader) =>
{
    const loaded = Loader.load(em);
    loaded.minFilter = NearestFilter;
    loaded.magFilter = NearestFilter;
    loaded.wrapS = RepeatWrapping;
    loaded.wrapT = RepeatWrapping;
    loaded.encoding = sRGBEncoding;

    const loaded2 = Loader.load(e);
    loaded2.minFilter = NearestFilter;
    loaded2.magFilter = NearestFilter;
    loaded2.wrapS = RepeatWrapping;
    loaded2.wrapT = RepeatWrapping;
    loaded2.encoding = sRGBEncoding;

    const mat1 = new MeshPhongMaterial({map: loaded, shininess: 100, emissive: "white", emissiveMap: loaded2});
    const mat2 = new MeshPhongMaterial({color: "black", shininess: 100});

    return( [mat1, mat1,mat2,mat1,mat1,mat1]  );
}