import "./NewGame.scss";
import { useState, FormEvent } from "react";
import { NewGameForm } from "../DataTypes/DataTypes";

/**
 * This component is a basic MVP of part one of the quickstart. It handles registering your agent and receives a token
 * which you will need to use in subsequent calls. Therefore, you might want to refactor or replace this as you move forward.
 */

type NewGameProps = {
  resp: string | undefined;
  token: string;
  registerAgent: () => void;
  handleSetForm: (event: FormEvent<HTMLInputElement>, key: string) => void;
  form: NewGameForm;
  signUpError: boolean
};

function NewGame({
  token,
  resp,
  registerAgent,
  handleSetForm,
  signUpError,
  form,
}: NewGameProps) {
  return (
    <div className="newGame">
      <h1 className="newGame__title">Create a new game!</h1>
      <div className="newGame__inputs">
        <p>Your name:</p>
        <input
          className="newGame__inputs--entry"
          name="symbol"
          value={form.symbol}
          onChange={(event) => handleSetForm(event, "symbol")}
        />
        <p>Your faction:</p>
        <input
          className="newGame__inputs--entry"
          name="faction"
          value={form.faction}
          onChange={(event) => handleSetForm(event, "faction")}
        />
      </div>
      <input
        className="newGame__button"
        type="submit"
        onClick={registerAgent}
      />
      {/* <pre>API token: {token}</pre> */}
      {signUpError && <p  className="newGame__error"> {resp}</p>}
      
    </div>
  );
}

export default NewGame;
