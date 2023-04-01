import React from "react";
import OptionState from "../../../context/options/option-state";
import UserState from "../../../context/user/user-state";
import useQueryParams from "../../../hooks/useQueryParams";
import { GAME_MODES } from "../../../utilities/constants";
import Container from "./Container/Container";

function Playboard() {
  const query = useQueryParams();
  const gameMode =
    query.get(GAME_MODES.VIEW_ONLY) === "1"
      ? GAME_MODES.VIEW_ONLY
      : GAME_MODES.GAME_PLAY;
  console.log("Game Mode ==> ", gameMode);
  return (
    <UserState>
      <OptionState>
        <Container gameMode={gameMode} />
      </OptionState>
    </UserState>
  );
}

export default Playboard;
