import BridgeVehiclesLeft from "./BridgeVehiclesLeft";
import VehiclesLeftSide from "./VehiclesLeftSide";
import VehiclesRightSide from "./VehiclesRightSide";
import PoliceVehicle from "./PoliceVehicle";
import Vehicles from "./Vehicle";

export default function VehicleWrapper()
{
    return(
        <>
            <BridgeVehiclesLeft position = {[0, 0, -1170]} totalVehicles = {1000}/>
            <VehiclesRightSide position = {[80, 0, -5000]} roads = {9} xOffset = {-240}/>
            <VehiclesLeftSide position = {[40, 0, 0]} roads = {9}  xOffset = {-240}/>
            <PoliceVehicle />
        </>
    )
}
