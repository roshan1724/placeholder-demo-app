import './details.scss';
import { useContext } from 'react';
import NewGameContext from '../../../../../context/game/new-game-context';
import GameDetailForm from '../../../../../forms/game-detail-form';

function GameDetails () {

  const { activeStepIndex, setActiveStepIndex } = useContext(NewGameContext);

  const formOptionsData = {
    start_time: {
      hours: Array.from({length: 12}, (v, k) => k + 1),
      minutes: Array.from({length: 60}, (v, k) => k + 1),
      meredian: ['AM', 'PM']
    },
    time_zome: ['UTC', 'IST', 'CST']
  }

  const handleDateChange = (e) => {
    console.log(e.target.value);
    // const dateElement = document.getElementById('game-detail-date');
    // dateElement.value = e.target.value;
    gameDetailForm.setFieldValue('start_date', e.target.value);
    // gameDetailForm.handleChange(e);

    // console.log(gameDetailForm.values);
    // gameDetailForm.values.start_date = e.target.value;
  }

  const handleBackClick = () => {
    setActiveStepIndex(activeStepIndex - 1);
  }

  const handleNextClick = () => {
    setActiveStepIndex(activeStepIndex + 1);
  }

  const handleDateIconClick = () => {
    const element = document.getElementById('date-copy');
    element.showPicker();
  }

  const gameDetailForm = GameDetailForm(formOptionsData);
  console.log(gameDetailForm.values);

  return (
    <section className="section-game-scenario">
      <div className="detail-form-wrapper">
        <form className="game-detail-form">
          <div className="row field-group-wrapper">
            <div className="col-12">
              <p className="field-label">Schedule the game start date and time</p>
            </div>
            <div className="col-4">
              <div className="form-block-wrapper">
                <div className="custom-form-block">
                  <label htmlFor="game-detail-date" className="form-label">
                    Date
                  </label>
                  <div className="input-group date-field has-validation">
                    <input type="date" name='start_date' id="date-copy" className='hide-input' onChange={handleDateChange} />
                    <input
                      type="text" 
                      name="start_date"
                      id='game-detail-date'
                      className={`form-control ${(gameDetailForm.touched.start_date && gameDetailForm.errors.start_date) ? 'is-invalid' : ''}`}
                      placeholder='Select Date'
                      onChange={gameDetailForm.handleChange}
                      onBlur={gameDetailForm.handleBlur}
                      value={gameDetailForm.values.start_date}
                      readOnly/>
                    <span className="icon-wrapper input-field-icon" onClick={handleDateIconClick}>
                      <i className="fa-solid fa-calendar-days"></i>
                    </span>
                  </div>
                  <div className="invalid-feedback">
                    {
                      gameDetailForm.errors.start_date && gameDetailForm.touched.start_date
                      ? gameDetailForm.errors.start_date
                      : null
                    }
                  </div>
                </div>

                <div className="custom-form-block">
                  <label htmlFor="game-detail-time" className='form-label'>
                    Time
                  </label>
                  <div className="input-group has-validation time-fields">
                    <select
                      name="start_time.hours"
                      id="game-detail-time-hours"
                      className={`form-select ${gameDetailForm.errors.start_time && gameDetailForm.touched.start_time ? 'is-invalid' : ''}`}
                      onChange={gameDetailForm.handleChange}
                      onBlur={gameDetailForm.handleBlur}
                      value={gameDetailForm.values.start_time.hours}>
                      <option value="" selected disabled>Hours</option>
                      {
                        formOptionsData.start_time.hours.map((hr, hourIndex) => (
                          <option value={hr} key={`hour-key-${hourIndex}`}>{hr}</option>
                        ))
                      }
                    </select>

                    <select
                      name="start_time.minutes"
                      id="game-detail-time-minutes"
                      className={`form-select ${gameDetailForm.errors.start_time && gameDetailForm.touched.start_time ? 'is-invalid' : ''}`}
                      onChange={gameDetailForm.handleChange}
                      onBlur={gameDetailForm.handleBlur}
                      value={gameDetailForm.values.start_time.minutes}>
                      <option value="" selected disabled>Min</option>
                      {
                        formOptionsData.start_time.minutes.map((min, minuteIndex) => (
                          <option value={min} key={`minute-key-${minuteIndex}`}>{min}</option>
                        ))
                      }
                    </select>

                    <select
                      name="start_time.meredian"
                      id="game-detail-time-meredian"
                      className={`form-select ${gameDetailForm.errors.start_time && gameDetailForm.touched.start_time ? 'is-invalid' : ''}`}
                      onChange={gameDetailForm.handleChange}
                      onBlur={gameDetailForm.handleBlur}
                      value={gameDetailForm.values.start_time.meredian}>
                    {
                      formOptionsData.start_time.meredian.map((mrd, meredianIndex) => (
                        <option value={mrd} key={`meredian-key-${meredianIndex}`}>{mrd}</option>
                      ))
                    }
                    </select>
                  </div>
                  <div className="invalid-feedback">
                    {
                      (gameDetailForm.errors.start_time && (gameDetailForm.touched.start_time))
                      ? gameDetailForm.errors.start_time
                      : null
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="form-block-wrapper">
                <div className="custom-form-block time-zone-field">
                  <label htmlFor="game-detail-time-zone" className="form-label">
                    Time Zone
                  </label>
                  <div className="input-group has-validation">
                    <select
                      name="time_zone"
                      id="game-detail-time-zone"
                      className="form-select"
                      onChange={gameDetailForm.handleChange}
                      onBlur={gameDetailForm.handleBlur}
                      value={gameDetailForm.values.time_zone}>
                    {
                      formOptionsData.time_zome.map((zone, zoneIndex) => (
                        <option value={zone} key={`time_zone-${zoneIndex}`}>{zone}</option>
                      )) 
                    }
                    </select>
                  </div>
                  <div className="invalid-feedback">
                    {
                      gameDetailForm.errors.time_zone && gameDetailForm.touched.time_zone
                      ? gameDetailForm.errors.time_zone
                      : null
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row field-group-wrapper">
            <div className="col-12">
              <p className="field-label">"End User" details</p>
            </div>
            <div className="col-4">
              <div className="form-block-wrapper">
                <div className="custom-form-block">
                  <label htmlFor="game-detail-user-name" className="form-label">Name *</label>
                  <div className="input-group has-validation">
                    <input 
                      type="text"
                      name="user_name"
                      id="game-detail-user-name" 
                      className={`form-control ${gameDetailForm.errors.user_name && gameDetailForm.touched.user_name ? 'is-invalid' : ''}`}
                      placeholder={`End User's name`}
                      onChange={gameDetailForm.handleChange}
                      onBlur={gameDetailForm.handleBlur}
                      value={gameDetailForm.values.user_name}
                    />
                    <div className="invalid-feedback">
                      {
                        gameDetailForm.errors.user_name && gameDetailForm.touched.user_name
                        ? gameDetailForm.errors.user_name
                        : ''
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="form-block-wrapper">
                <div className="custom-form-block">
                  <label htmlFor="game-detail-user-email" className="form-label">Email *</label>
                  <div className="input-group has-validation">
                    <input 
                      type="text"
                      name="user_email"
                      id="game-detail-user-email" 
                      className={`form-control ${gameDetailForm.errors.user_email && gameDetailForm.touched.user_email ? 'is-invalid' : ''}`}
                      placeholder={`End User's Email`}
                      onChange={gameDetailForm.handleChange}
                      onBlur={gameDetailForm.handleBlur}
                      value={gameDetailForm.values.user_email}
                    />
                    <div className="invalid-feedback">
                      {
                        gameDetailForm.errors.user_email && gameDetailForm.touched.user_email
                        ? gameDetailForm.errors.user_email
                        : ''
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4"></div>
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