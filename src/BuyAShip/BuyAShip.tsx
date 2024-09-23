import { ShipyardLocations } from '../DataTypes/DataTypes';
import ShipCard from '../ShipCard/ShipCard';
import './BuyAShip.scss';

type BuyAShipProps = {
    shipYardLocations: ShipyardLocations[] | undefined;
    token: string;
    system: string | undefined;
}

const BuyAShip = ({shipYardLocations, token, system}: BuyAShipProps) => {
    console.log(shipYardLocations)
  return (
    <div>
       {shipYardLocations?.map((location) => <ShipCard system={system} token={token} location={location}/>)}
    </div>
  )
}

export default BuyAShip