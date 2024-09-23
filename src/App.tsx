import { B } from "vitest/dist/types-ad1c3f45.js";
import AcceptContract from "./AcceptContract/AcceptContract";
import "./App.scss";
import BuyAShip from "./BuyAShip/BuyAShip";
import {
  AgentAndShipDetails,
  AgentContract,
  AgentDetails,
  AgentWaypointLocation,
  AvailableShips,
  Response,
  ShipyardLocations,
} from "./DataTypes/DataTypes";
import NewGame from "./NewGame/NewGame";
import { FormEvent, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [token, setToken] = useState<string>(
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiR0FNRUFDQ09VTlQiLCJ2ZXJzaW9uIjoidjIuMi4wIiwicmVzZXRfZGF0ZSI6IjIwMjQtMDktMDEiLCJpYXQiOjE3MjcxMDkwNTQsInN1YiI6ImFnZW50LXRva2VuIn0.naQVVUvVLf5JzcOHFa6JojAUimB5x0edyDnf2MhV5bp5fr5NIenA1uUAyTJFXmOzET53nf4ZFqH6WsuTm0Ob-OVo_pXMG7bvu_tglsUSUe2TBLVIO0r8c2tHQW3xagKaJVCaRwiYOqP465F2d_CLvVE5wof5EPLkEofgNgUlvBCZOPvHinsrDjAm1TLPfNxI4bT3NMnTwXNWrs4KWb9kYsGN-86RJK_ZF0Yu7-rCC9OTNqDxUesU00dXgn-WILK3jcWJOlo73u1p1TbeM_DSxgWfSyvOPRRzSYrVgdkvNpHx9CXILoXq77r8xc3hOzZobV122d_WACfufsyo4dxlSw"
  );
  const [resp, setResp] = useState<string>("");
  // const [errResp, setErrResp] = useState<Response>();
  const [form, setForm] = useState({ symbol: "", faction: "COSMIC" });
  const [agentDetails, setAgentDetails] = useState<AgentDetails>();
  const [startingWaypoint, setStartingWaypoint] =
    useState<AgentWaypointLocation>();
  const [agentContract, setAgentContract] = useState<AgentContract>();
  const [system, setSystem] = useState<string>();
  const [shipYardLocations, setShipYardLocations] =
    useState<ShipyardLocations[]>();
  const [availableShipsToBuy, setAvailableShipsToBuy] =
    useState<AvailableShips>();
  const [chosenShipYaardLocation, setChosenShipYaardLocation] =
    useState<AvailableShips>();
  const [agentAndShipDetails, setAgentAndShipDetails] =
    useState<AgentAndShipDetails>();
  const [signUpError, setSignUpError] = useState<boolean>(false);
  const navigate = useNavigate();

  // Creating user and setting contract
  const registerAgent = async () => {
    const resp = await fetch("https://api.spacetraders.io/v2/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symbol: form.symbol,
        faction: form.faction,
      }),
    });

    const json = await resp.json();
    
    console.log(json)

    if (resp.ok) {
      console.log("success")
      setToken(json.data.token);
      setSignUpError(false);
      navigate('/acceptcontract')
      
    } else {
      const errorMessage = String(json.error.message)
      setResp(errorMessage);
      setSignUpError(true);
      console.log(resp);
    }

    console.log(resp);
  };

  const handleSetForm = (event: FormEvent<HTMLInputElement>, key: string) => {
    setForm({ ...form, [key]: event.currentTarget.value });
  };

  const getAgentDetails = async () => {
    const resp = await fetch("https://api.spacetraders.io/v2/my/agent", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const agentData = await resp.json();

    if (resp.ok) {
      setAgentDetails(agentData.data);
    }

    console.log("agent details", agentDetails);
  };

  const getStartingWaypoint = async () => {
    if (agentDetails != undefined) {
      const splitHQ = agentDetails.headquarters.split("-");
      // const system = splitHQ[0] + "-" + splitHQ[1];
      setSystem(splitHQ[0] + "-" + splitHQ[1]);

      const resp = await fetch(
        `https://api.spacetraders.io/v2/systems/${system}/waypoints/${agentDetails.headquarters}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const startingWaypointData = await resp.json();

      if (resp.ok) {
        setStartingWaypoint(startingWaypointData);
      }
    }
    console.log("starting waypoint:", startingWaypoint);
  };

  const getAgentContract = async () => {
    const resp = await fetch("https://api.spacetraders.io/v2/my/contracts", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const agentContractData = await resp.json();
    console.log("agent contract data: ", agentContractData);

    if (resp.ok) {
      setAgentContract(agentContractData.data[0]);
    }
    console.log("agent contract: ", agentContract);
  };

  // Buying a ship

  const findAShipyard = async () => {
    console.log(system);
    const resp = await fetch(
      `https://api.spacetraders.io/v2/systems/${system}/waypoints?traits=SHIPYARD`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const shipyardData = await resp.json();
    console.log("shipyard: ", shipyardData);

    if (resp.ok) {
      setShipYardLocations(shipyardData.data);
    }
    console.log("shipyard locations: ", shipYardLocations);
  };

  console.log(agentAndShipDetails);

  useEffect(() => {
    getAgentDetails();
  }, []);

  useEffect(() => {
    getStartingWaypoint();
    getAgentContract();
    findAShipyard();
  }, [agentDetails]);

  return (
    <>
      <h1 className="game-name">Jagex 520</h1>
      <Routes>
        <Route
          path="/"
          element={
            <NewGame
              resp={resp}
              form={form}
              token={token}
              registerAgent={registerAgent}
              handleSetForm={handleSetForm}
              signUpError={signUpError}
            />
          }
        />
        <Route
          path="/acceptcontract"
          element={
            <AcceptContract
              token={token}
              agentContract={agentContract ? agentContract : undefined}
              findAShipyard={findAShipyard}
            />
          }
        />
        <Route
          path="/buyaship"
          element={
            <BuyAShip
              setAgentAndShipDetails={setAgentAndShipDetails}
              token={token}
              system={system}
              shipYardLocations={shipYardLocations}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
