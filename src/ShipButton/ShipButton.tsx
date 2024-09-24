import { Dispatch, SetStateAction } from "react";
import { AgentAndShipDetails, ShipyardLocations } from "../DataTypes/DataTypes";
import "./ShipButton.scss";

type ShipButtonProps = {
  ship: { type: string };
  location: ShipyardLocations | undefined;
  token: string;
  setShipInThisLocation: Dispatch<SetStateAction<boolean>>
  setSuccessfullyBoughtShip: Dispatch<SetStateAction<boolean>>
  setAgentAndShipDetails: Dispatch<SetStateAction<AgentAndShipDetails | undefined>>

};
const ShipButton = ({ setSuccessfullyBoughtShip, ship, location, token, setShipInThisLocation, setAgentAndShipDetails }: ShipButtonProps) => {
  const splitShipType = ship.type.split("_");
  const connectedShipName = splitShipType.join(" ");

  const selectChosenShip = async() => {

    if (location != undefined) {
        const resp = await fetch("https://api.spacetraders.io/v2/my/ships", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            shipType: ship.type,
            waypointSymbol: location.symbol,
          }),
        });
  
        const selectedShipData = await resp.json();

        if (resp.ok) {
          setAgentAndShipDetails(selectedShipData)
          setSuccessfullyBoughtShip(true)
          setShipInThisLocation(true)
        } else {
            setShipInThisLocation(false)
        }
      }
      
  };
  
  return (
    <div className="ship-selection-button">
      <button className="ship-selection-button__option"onClick={selectChosenShip}>{connectedShipName}</button>
    </div>
  );
};

export default ShipButton;
