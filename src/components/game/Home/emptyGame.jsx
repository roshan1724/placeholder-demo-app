import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../../utilities/constants';
import './Home.scss';

function EmptyGame() {
  const navigate = useNavigate();

  const handleNewGameClick = () => {
    console.log('Button Clicked !');
    if (true) {
      navigate(ROUTE_PATHS.GAME_ADD_NEW);
    }
  }

  return (
    <section className="section-emptygame flex-center">
      <div className="game-wrapper">
        <div className='icon-wrapper'>
          <i className="fa-solid fa-chess-rook"></i>
        </div>
        <div className="page-title">No Games Here!</div>
        <div className="page-subtitle">
          You have not configured any games yet. Click the below button to add your first game.
        </div>
        <div className="action-wrapper">
          <button className="btn btn-primary btn-filled" onClick={handleNewGameClick}>
            <span className="me-2">
              <i className="fa-solid fa-plus"></i>
            </span>
            Add New Game
          </button>
        </div>
      </div>
    </section>
  );
}

export default EmptyGame;