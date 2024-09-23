import { useState } from "react";
import { AgentContract } from "../DataTypes/DataTypes";
import "./AcceptContract.scss";

type AcceptContractProps = {
  agentContract: AgentContract | undefined;
  token: string;
};

const AcceptContract = ({ agentContract, token }: AcceptContractProps) => {
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();
  const [passedDeadline, setPassedDeadline] = useState<boolean>(false)


  const validateAcceptance = () => {
    const refactoredAgentContractAcceptanceDeadline =  agentContract ? agentContract.terms.deadline.slice(0, 10).split("-").join(''): ""
    let todayDateToUse = String(todayDate);
    let todayMonthToUse = String(todayMonth);

    console.log(todayMonth)
    if(todayDate < 10) {
        todayDateToUse = String("0" + todayDate)
    }

    if(todayMonth < 10) {
        todayMonthToUse = String("0" + todayMonth);
        console.log(todayMonthToUse)
    }
    
    const refactoredCurrentDate = todayYear + todayMonthToUse + todayDateToUse

    if(Number(refactoredAgentContractAcceptanceDeadline) > Number(refactoredCurrentDate)) {
        console.log("yay")
        setPassedDeadline(false)
        acceptAgentsContract()
        
    } else {
        setPassedDeadline(true)
    }

  };

  const acceptAgentsContract = async () => {
    console.log(agentContract?.id)
    console.log(token)
    if ( agentContract != undefined) {
        const resp = await fetch(`https://api.spacetraders.io/v2/my/contracts/${agentContract.id}/accept`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const json = await resp.json();

          if (resp.ok) {
            console.log("data" , json)
          }
    }
   
  

    
  };


  return (
    <>
      <h1>Agent would you like to accept this contract?</h1>
      <p>Type of contract: {agentContract ? agentContract.type : ""}</p>
      <p>
        Your task is to collect{" "}
        {agentContract ? agentContract.terms.deliver[0].unitsRequired : 0} units
        of{" "}
        {agentContract
          ? agentContract.terms.deliver[0].tradeSymbol.split("-").join(" ")
          : ""}{" "}
        before {agentContract ? agentContract.terms.deadline.slice(0, 10) : ""}
      </p>
      <p>
        Please accent this contract by{" "}
        {agentContract ? agentContract.deadlineToAccept.slice(0, 10) : ""}{" "}
      </p>
      <button onClick={validateAcceptance}>Yes</button>
      <button>No</button>
      {passedDeadline && <p>Sorry, the deadline to accept this contract has passed</p>}
    </>
  );
};

export default AcceptContract;
