import { useState } from "react";
import "./AcceptContract.scss";
import { AgentContract, AgentDetails } from "../DataTypes/DataTypes";
import { useNavigate } from "react-router-dom";

type AcceptContractProps = {
  agentContract: AgentContract | undefined;
  token: string;
  system: string | undefined;
  agentDetails: AgentDetails | undefined;
 };

const AcceptContract = ({
  agentContract,
  token,
}: AcceptContractProps) => {
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();
  const [passedDeadline, setPassedDeadline] = useState<boolean>(false);
  const navigate = useNavigate();
  const itemToCollect: string = agentContract
    ? agentContract.terms.deliver[0].tradeSymbol.replace("_", " ")
    : "";

  const validateAcceptance = () => {
    const refactoredAgentContractAcceptanceDeadline = agentContract
      ? agentContract.terms.deadline.slice(0, 10).split("-").join("")
      : "";
    let todayDateToUse: string = String(todayDate);
    let todayMonthToUse: string = String(todayMonth);

    if (todayDate < 10) {
      todayDateToUse = String("0" + todayDate);
    }

    if (todayMonth < 10) {
      todayMonthToUse = String("0" + todayMonth);
    }

    const refactoredCurrentDate: string = todayYear + todayMonthToUse + todayDateToUse;

    if (
      Number(refactoredAgentContractAcceptanceDeadline) >
      Number(refactoredCurrentDate)
    ) {
      setPassedDeadline(false);
      acceptAgentsContract();
    } else {
      setPassedDeadline(true);
    }
  };

  const acceptAgentsContract = async () => {
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
          <p className="acceptcontract__response--error">Sorry, the deadline to accept this contract has passed</p>
        )}
      </div>
    </div>
  );
};

export default AcceptContract;
