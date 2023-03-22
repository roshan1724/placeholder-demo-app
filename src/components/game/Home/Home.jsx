import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "../../../store/ui-slice";
import EmptyGame from "./emptyGame";
import GameList from "./gameList";
import "./Home.scss";


function GameHome () {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.ui.showLoader);

  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    dispatch(UiActions.setShowLoader(true));
    // API call to get game list
    setTimeout(() => {
      fetch("/data/game-list.json")
        .then(response => response.json())
        .then(response => {
          setGameList(response.data);
          dispatch(UiActions.setShowLoader(false));
        })
        .catch(error => {
          console.error(error);
        });
    }, 1000);
  }, [dispatch]);

  return ( !loader &&
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