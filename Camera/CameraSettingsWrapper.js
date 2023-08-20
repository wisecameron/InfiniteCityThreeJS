import CameraSettings from "./CameraSettings";
import MovingCamera from "./MovingCamera";
import { CameraController } from "./OrbitContoller";

export default function CameraSettingsWrapper()
{
    return(
        <>
            <MovingCamera />
            <CameraSettings />
        </>
    )
}