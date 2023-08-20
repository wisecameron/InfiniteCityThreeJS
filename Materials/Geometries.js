import { CylinderBufferGeometry, PlaneBufferGeometry, BoxBufferGeometry, ConeBufferGeometry } from "three";

export const CylinderGeo8 = () =>
{
    return(new CylinderBufferGeometry(1,1,1,8,1));
}

export const CylinderGeo14 = () =>
{
    return(new CylinderBufferGeometry(1,1,1,14,1));
}

export const PlaneGeo = () =>
{
    return new PlaneBufferGeometry(1,1);
}

export const boxGeometry = () =>
{
    let geo = new BoxBufferGeometry(1,1,1)
    return geo;
}

export const Cone = () =>
{
    const cone = new ConeBufferGeometry(1,1,4,1);
    return cone;
}