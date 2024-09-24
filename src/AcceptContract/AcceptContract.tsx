import { useState } from "react";
import "./AcceptContract.scss";
import { AgentContract } from "../DataTypes/DataTypes";
import { useNavigate } from "react-router-dom";

type AcceptContractProps = {
  agentContract: AgentContract | undefined;
  token: string;
  findAShipyard: () => void;
};

const AcceptContract = ({
  agentContract,
  token,
  findAShipyard,
}: AcceptContractProps) => {
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();
  const [passedDeadline, setPassedDeadline] = useState<boolean>(false);
  const navigate = useNavigate();
  const itemToCollect = agentContract
    ? agentContract.terms.deliver[0].tradeSymbol.replace("_", " ")
    : "";

  const validateAcceptance = () => {
    const refactoredAgentContractAcceptanceDeadline = agentContract
      ? agentContract.terms.deadline.slice(0, 10).split("-").join("")
      : "";
    let todayDateToUse = String(todayDate);
    let todayMonthToUse = String(todayMonth);

    console.log(todayMonth);
    if (todayDate < 10) {
      todayDateToUse = String("0" + todayDate);
    }

    if (todayMonth < 10) {
      todayMonthToUse = String("0" + todayMonth);
      console.log(todayMonthToUse);
    }

    const refactoredCurrentDate = todayYear + todayMonthToUse + todayDateToUse;

    if (
      Number(refactoredAgentContractAcceptanceDeadline) >
      Number(refactoredCurrentDate)
    ) {
      console.log("yay");
      setPassedDeadline(false);
      acceptAgentsContract();
    } else {
      setPassedDeadline(true);
    }
  };

  const acceptAgentsContract = async () => {
    console.log(agentContract?.id);
    console.log(token);
    if (agentContract != undefined) {
      const resp = await fetch(
        `https://api.spacetraders.io/v2/my/contracts/${agentContract.id}/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resp.ok) {
        navigate("/buyaship");
        findAShipyard();
      }
    }
  };

  const navigateToHomePage = () => {
    navigate("/")
  }

  return (
    <div className="acceptcontract">
      <div className="acceptcontract__form">
        <h1 className="form__heading">
          Agent, would you like to accept this contract?
        </h1>
        <p className="form__details">
          <span className="form__details--bold">Type of contract:</span>{" "}
          {agentContract
            ? agentContract.type[0] +
              agentContract.type.slice(1).toLocaleLowerCase()
            : ""}
        </p>
        <p className="form__details">
          Your task is to collect{" "}
          {agentContract ? agentContract.terms.deliver[0].unitsRequired : 0}{" "}
          units of <span className="form__details--bold">{itemToCollect} </span>
          before{" "}
          <span className="form__details--bold">
            {agentContract ? agentContract.terms.deadline.slice(0, 10) : ""}
          </span>
        </p>
        <p className="form__details">
          Please accent this contract by{" "}
          <span className="form__details--bold">
            {agentContract ? agentContract.deadlineToAccept.slice(0, 10) : ""}{" "}
          </span>
        </p>
        <div className="acceptcontract__response">
          <button
            className="acceptcontract__response--button"
            onClick={validateAcceptance}
          >
            Yes
          </button>
          <button onClick={navigateToHomePage}className="acceptcontract__response--button">No</button>
        </div>
        {passedDeadline && (
          <p>Sorry, the deadline to accept this contract has passed</p>
        )}
      </div>
    </div>
  );
};

export default AcceptContract;
