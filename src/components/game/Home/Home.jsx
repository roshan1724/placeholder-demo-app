import { useEffect, useState } from "react";
import EmptyGame from "./emptyGame";
import GameList from "./gameList";
import "./Home.scss";


function GameHome () {

  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    // API call to get game list
    fetch("/data/game-list.json")
      .then(response => response.json())
      .then(response => {
        setGameList(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="game-home">
      {
        gameList && gameList.length > 0
        ? <GameList gameListData={gameList} />
        : <EmptyGame />
      }
    </div>
  )
}

export default GameHome;