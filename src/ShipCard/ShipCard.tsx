import { EventHandler, MouseEventHandler, useState } from "react";
import { ShipyardLocations } from "../DataTypes/DataTypes";
import "./ShipCard.scss";

type ShipCardProps = {
  location: ShipyardLocations | undefined;
  token: string;
  system: string | undefined;
};

const ShipCard = ({ location, token, system }: ShipCardProps) => {
  const viewAvailableShips = () => {
    console.log(location);
    findAllAvailableShips();
  };
  const findAllAvailableShips = async () => {
    console.log(system);
    const resp = await fetch(
      `https://api.spacetraders.io/v2/systems/${system}/waypoints//`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const availableShipsData = await resp.json();
    console.log("shipyard: ", availableShipsData);

    if (resp.ok) {
    //   setShipYardLocations(shipyardData.data);
    }
    console.log("shipyard locations: ");
  };
  console.log(location);
  return (
    <div className="shipcard">
      <p>{location ? location.type : undefined}</p>
      <p className="shipcard__traits">Traits:</p>
      {location?.traits.map((trait) => (
        <p>
          {trait.name}: {trait.description}
        </p>
      ))}
      <button onClick={viewAvailableShips}>Buy Available Ship</button>
      {/* {!viewShips &&} */}
    </div>
  );
};

export default ShipCard;
