import {
  Dispatch,
  EventHandler,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import {
  AgentAndShipDetails,
  AvailableShips,
  ShipyardLocations,
} from "../DataTypes/DataTypes";
import "./ShipCard.scss";
import ShipButton from "../ShipButton/ShipButton";

type ShipCardProps = {
  location: ShipyardLocations | undefined;
  token: string;
  system: string | undefined;
  setAgentAndShipDetails: Dispatch<
    SetStateAction<AgentAndShipDetails | undefined>
  >;
};

const ShipCard = ({
  location,
  token,
  system,
  setAgentAndShipDetails,
}: ShipCardProps) => {
  const [viewShipButton, setViewShipButton] = useState<boolean>(true);
  const [availableShips, setAvailableShips] = useState<AvailableShips>();
  const [shipInThisLocation, setShipInThisLocation] = useState<boolean>(true);

  const viewAvailableShips = () => {
    setViewShipButton(false);
    console.log(location?.symbol);
    findAllAvailableShips();
  };

  const findAllAvailableShips = async () => {
    console.log(system);
    if (location != undefined) {
      const resp = await fetch(
        `https://api.spacetraders.io/v2/systems/${system}/waypoints/${location.symbol}/shipyard`,
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
        setAvailableShips(availableShipsData.data);
        console.log("avail ships: ", availableShips?.shipTypes);
      }
      console.log("avail ships: ", availableShips?.shipTypes);
    }
  };

  const goBack = () => {
    setViewShipButton(true);
    setShipInThisLocation(true);
  };

  console.log(location);

  return (
    <div className="shipyard-card">
      <p className="shipyard-card__type">
        {location ? location.type : undefined}
      </p>
      <div className="shipyard-card__traits">
        {viewShipButton && <p className="shipyard-card__traits--heading">Traits:</p>}
        {!viewShipButton && <p className="shipyard-card__traits--heading">Select which ship you would like to buy:</p>}
        {viewShipButton &&
          location?.traits.map((trait) => (
            <p className="traits__trait">
              <span className="traits__trait--bold">{trait.name}:</span>{" "}
              {trait.description}
            </p>
          ))}
      </div>
      {viewShipButton && (
        <button className="shipyard-card__button" onClick={viewAvailableShips}>View Available Ships</button>
      )}
      {!viewShipButton &&
        availableShips?.shipTypes.map((ship) => (
          <ShipButton
            setAgentAndShipDetails={setAgentAndShipDetails}
            setShipInThisLocation={setShipInThisLocation}
            token={token}
            location={location}
            ship={ship}
          />
        ))}
      {!viewShipButton && <button className="shipyard-card__button" onClick={goBack}>Return</button>}
      {!shipInThisLocation && (
        <p>
          Sorry, you must have another ship present at this location to purchase
          this ship
        </p>
      )}
    </div>
  );
};

export default ShipCard;
