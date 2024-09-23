import "./App.css";
import {
  AgentContract,
  AgentDetails,
  AgentWaypointLocation,
} from "./DataTypes/DataTypes";
import NewGame from "./NewGame/NewGame";
import { FormEvent, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  const [token, setToken] = useState<string>(
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiTU9MTFlURVNUIiwidmVyc2lvbiI6InYyLjIuMCIsInJlc2V0X2RhdGUiOiIyMDI0LTA5LTAxIiwiaWF0IjoxNzI3MDc5MjQxLCJzdWIiOiJhZ2VudC10b2tlbiJ9.naY6mPAdQUsoek3Swh6fdNnLu5OKMORTSbvxUXc3ktNkNfVmVha-5b6tI-_6zxkXX-0mV5ae14juhmiKXM4vFjfjLA_oFbGr2D0W7Ia-TSpF7r1AdZEjO6dywh8omL5TDKq67EkhvOFukOTC0jbE6yY6YVA7svoOy3fBvlq3DMddjNBCwA56hRkXFI9lkB_C6chgJGE49LJbkdwqH0YaVgvX04H0QM1EGo7HHKhyttYUSBYMGTC05dQoMO4etUwlb3Uh5WA91RgX7R-mFVVF4f3038_BU-l6p_MO16flcifYx9YVGy6AXYacRday0w8T7p15BMvyQtVGOBFd5r-ZyA"
  );
  const [resp, setResp] = useState("");
  const [form, setForm] = useState({ symbol: "", faction: "COSMIC" });
  const [agentDetails, setAgentDetails] = useState<AgentDetails>();
  const [startingWaypoint, setStartingWaypoint] =
    useState<AgentWaypointLocation>();
  const [agentContract, setAgentContract] = useState<AgentContract>();

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

    if (resp.ok) {
      setToken(json.data.token);
    }

    setResp(JSON.stringify(json, null, 2));
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
      const system = splitHQ[0] + "-" + splitHQ[1];

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

  const viewContract = async () => {
    const resp = await fetch("https://api.spacetraders.io/v2/my/contracts", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const agentContractData = await resp.json();

    if (resp.ok) {
      setAgentContract(agentContractData);
    }
    console.log("agent contract: ", agentContract);
  };

  useEffect(() => {
    getAgentDetails();
  }, []);

  useEffect(() => {
    getStartingWaypoint();
    viewContract();
  }, [agentDetails]);

  return (
    <>
      
        <h1>STQS</h1>
        <Routes>
          <Route path="/"
            element =
            {
              <NewGame
                resp={resp}
                form={form}
                token={token}
                registerAgent={registerAgent}
                handleSetForm={handleSetForm}
              />
            }
          />
        </Routes>
    </>
  );
}

export default App;
