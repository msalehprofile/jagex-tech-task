import { Dispatch, SetStateAction } from 'react';
import { AgentAndShipDetails, ShipyardLocations } from '../DataTypes/DataTypes';
import ShipCard from '../ShipCard/ShipCard';
import './BuyAShip.scss';

type BuyAShipProps = {
    shipYardLocations: ShipyardLocations[] | undefined;
    token: string;
    system: string | undefined;
    setAgentAndShipDetails: Dispatch<SetStateAction<AgentAndShipDetails | undefined>>
}

const BuyAShip = ({shipYardLocations, token, system, setAgentAndShipDetails}: BuyAShipProps) => {
    console.log(shipYardLocations)
  return (
    <div>
       {shipYardLocations?.map((location, i) => <ShipCard key={i} setAgentAndShipDetails={setAgentAndShipDetails} system={system} token={token} location={location}/>)}
    </div>
  )
}

export default BuyAShip