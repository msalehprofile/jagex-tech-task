import { useState, FormEvent } from "react";
import { NewGameForm } from "../DataTypes/DataTypes";

/**
 * This component is a basic MVP of part one of the quickstart. It handles registering your agent and receives a token
 * which you will need to use in subsequent calls. Therefore, you might want to refactor or replace this as you move forward.
 */

type NewGameProps = {
  resp: string;
  token: string;
  registerAgent: () => void;
  handleSetForm: (event: FormEvent<HTMLInputElement>, key: string) => void;
  form: NewGameForm;
};

function NewGame({
  token,
  resp,
  registerAgent,
  handleSetForm,
  form,
}: NewGameProps) {
  return (
    <>
      <h1>New Game</h1>
      <input
        name="symbol"
        value={form.symbol}
        onChange={(event) => handleSetForm(event, "symbol")}
      />
      <input
        name="faction"
        value={form.faction}
        onChange={(event) => handleSetForm(event, "faction")}
      />
      <input type="submit" onClick={registerAgent} />
      <pre>API token: {token}</pre>
      <pre>Response: {resp}</pre>
    </>
  );
}

export default NewGame;
