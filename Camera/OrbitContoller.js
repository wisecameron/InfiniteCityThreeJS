import {useThree} from '@react-three/fiber'
import { useEffect } from 'react';
import { Vector3 } from 'three';
import { OrbitControls } from 'three-stdlib';

export const CameraController = () => {
    const { camera, gl } = useThree();
    useEffect(
      () => {
        const controls = new OrbitControls(camera, gl.domElement);
  
        controls.minDistance = 250;
        controls.maxDistance = 10000;
        controls.far = 4000;
        controls.enableDamping = false;
        controls.saveState()
        return () => {
          controls.dispose();
        };
      },
      [camera, gl]
    );
    return null;
  };