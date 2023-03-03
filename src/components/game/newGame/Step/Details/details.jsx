import './details.scss';
import { useContext } from 'react';
import NewGameContext from '../../../../../context/game/new-game-context';
import GameDetailForm from '../../../../../forms/game-detail-form';

function GameDetails () {

  const { activeStepIndex, setActiveStepIndex } = useContext(NewGameContext);

  const formOptionsData = {
    start_time: {
      hours: Array.from({length: 24}, (v, k) => k + 1),
      minutes: Array.from({length: 60}, (v, k) => k + 1),
      meredian: ['AM', 'PM']
    },
    time_zome: ['UTC', 'IST', 'CST']
  }

  const handleDateChange = (e) => {
    gameDetailForm.values.start_date = e.target.value;
  }

  const handleBackClick = () => {
    setActiveStepIndex(activeStepIndex - 1);
  }

  const handleNextClick = () => {
    setActiveStepIndex(activeStepIndex + 1);
  }

  const handleDateIconClick = () => {
    const element = document.getElementById('date-copy');
    console.log('Selected Element =>', element)
    element.showPicker();
  }

  const gameDetailForm = GameDetailForm(formOptionsData);

  return (
    <section className="section-game-scenario">
      <div className="detail-form-wrapper">
        <form className="game-detail-form">
          <div className="field-group-wrapper">
            <p className="field-label">Schedule the game start date and time</p>
            <div className="field-group-content">
              <div className="custom-form-block">
                <label htmlFor="game-detail-date" className="form-label">
                  Date
                </label>
                <div className="input-group date-field has-validation">
                  <input type="date" name="test" id="date-copy" onChange={handleDateChange} />
                  <input
                    type="text" 
                    name="start_date"
                    id='game-detail-date'
                    className={`form-control ${(gameDetailForm.touched.start_date && gameDetailForm.errors.start_date) ? 'is-invalid' : ''}`}
                    placeholder='Select Date'
                    onChange={gameDetailForm.handleChange}
                    onBlur={gameDetailForm.handleBlur}
                    value={gameDetailForm.values.start_date}/>
                  <span className="icon-wrapper input-field-icon" onClick={handleDateIconClick}>
                    <i className="fa-solid fa-calendar-days"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="page-action-wrapper flex-center">
        <button className="btn btn-primary" onClick={handleBackClick}>
          <span className="icon-wrapper me-2">
            <i className="fa-solid fa-arrow-left"></i>
          </span>
          Back
        </button>
        <button
          className="btn btn-primary btn-filled"
          disabled={!gameDetailForm.isValid ? 'disabled' : null}
          onClick={handleNextClick}>
          Next
          <span className="icon-wrapper ms-2">
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </button>
      </div>
    </section>
  )
}

export default GameDetails;