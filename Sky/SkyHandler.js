import Rain from "./Rain"

export default function SkyHandler()
{
    /*
            <color attach = "background" args = {["#353535"]} />
            <fog attach = "fog" color = "#353535" near={100} far = {1100}/>
    */
    return(
        <>
            <color attach = "background" args = {["#213346"]} />
            <fog attach = "fog" color = "#213346" near={0} far = {1100}/>
            <Rain total = {6000} position = {[-1000,0,0]}/>
        </>
    )
}