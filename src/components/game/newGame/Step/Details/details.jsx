import './details.scss';
import { useContext } from 'react';
import NewGameContext from '../../../../../context/game/new-game-context';
import GameDetailForm from '../../../../../forms/game-detail-form';
// import { Fragment } from 'react';

function GameDetails () {

  const { activeStepIndex, setActiveStepIndex } = useContext(NewGameContext);

  const formOptionsData = {
    start_time: {
      hours: Array.from({length: 12}, (v, k) => k + 1),
      minutes: Array.from({length: 60}, (v, k) => k + 1),
      meredian: ['AM', 'PM']
    },
    time_zome: ['UTC', 'IST', 'CST'],
    cisco_jobTitle: ['Job Title 1', 'Job Title 2'],
    it_admin_jobTitle: ['Job Title 1', 'Job Title 2']
  }

  const handleDateChange = (e) => {
    console.log(e.target.value);
    gameDetailForm.setFieldValue('start_date', e.target.value);
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

  // const addSpectatorField = () => {
  //   gameDetailForm.setFieldValue('spectators', [
  //     ...gameDetailForm.values.spectators,
  //     getSpectatorFields()
  //   ]);
  // }

  // const deleteSpectatorField = (index) => {
  //   const newSpectatorFiels = gameDetailForm.values.spectators;
  //   newSpectatorFiels.splice(index, 1);
  //   gameDetailForm.setFieldValue('spectators', newSpectatorFiels);
  // }

  // const getSpectatorUI = () => {
  //   return (
  //     gameDetailForm.values.spectators.map((spectator, spectatorIndex) => (
  //       <Fragment>
  //         <div className="col-4">
  //           <div className="d-flex">
  //             <div className="spectator-index">{spectatorIndex + 1}.</div>
  //             <div className={`form-block-wrapper`}>
  //               <div className="custom-form-block w-100">
  //                 <label htmlFor={`game-detail-spectator-${spectatorIndex}-name`} className="form-label">Name*</label>
  //                 <div className="input-group has-validation">
  //                   <input
  //                     type="text" 
  //                     name={`spectators[${spectatorIndex}].spectator_name`}
  //                     id={`game-detail-spectator-${spectatorIndex}-name`}
  //                     className={`form-control ${gameDetailForm.touched.spectators[spectatorIndex]?.spectator_name && gameDetailForm.errors.spectators[spectatorIndex]?.spectator_name} ? 'is-invalid' : ''`}
  //                     placeholder={`Spectator's Name`}
  //                     onChange={gameDetailForm.handleChange}
  //                     onBlur={gameDetailForm.handleBlur}
  //                     value={gameDetailForm.values.spectators[spectatorIndex].spectator_name}
  //                   />
  //                   <div className="invalid-feedback">
  //                     {
  //                       gameDetailForm.errors.spectators[spectatorIndex]?.spectator_name && gameDetailForm.touched.spectators[spectatorIndex]?.spectator_name
  //                       ? gameDetailForm.errors.spectators[spectatorIndex].spectator_name
  //                       : ''
  //                     }
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="col-4"></div>

  //         <div className="col-4"></div>
  //       </Fragment>
  //     ))
  //   );
  // }

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
                <div className="custom-form-block w-100">
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
                <div className="custom-form-block w-100">
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
          </div>

          <div className="row field-group-wrapper">
            <div className="col-12">
              <p className="field-label">"Chief Information Security Officer (CISO)" details</p>
            </div>
            <div className="col-4">
              <div className="form-block-wrapper">
                <div className="custom-form-block w-100">
                  <label htmlFor="game-detail-cisco-name" className="form-label">Name *</label>
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      name='cisco_name'
                      id='game-detail-cisco-name'
                      className={`form-control ${gameDetailForm.errors.cisco_name && gameDetailForm.touched.cisco_name ? 'is-invalid' : ''}`}
                      placeholder={`CISCO's Name`}
                      onChange={gameDetailForm.handleChange}
                      onBlur={gameDetailForm.handleBlur}
                      value={gameDetailForm.values.cisco_name}
                    />
                    <div className="invalid-feedback">
                      {
                        gameDetailForm.errors.cisco_name && gameDetailForm.touched.cisco_name
                        ? gameDetailForm.errors.cisco_name
                        : ''
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="form-block-wrapper">
                <div className="custom-form-block w-100">
                  <label htmlFor="game-detail-cisco-email" className="form-label">Email *</label>
                  <div className="input-group has-validation">
                    <input 
                      type="text" 
                      name="cisco_email"
                      id="game-detail-cisco-email"
                      className={`form-control ${gameDetailForm.errors.cisco_email && gameDetailForm.touched.cisco_email ? 'is-invalid' : ''}`}
                      placeholder={`CISCO's Email`}
                      onChange={gameDetailForm.handleChange}
                      onBlur={gameDetailForm.handleBlur}
                      value={gameDetailForm.values.cisco_email}
                    />
                    <div className="invalid-feedback">
                      {
                        gameDetailForm.errors.cisco_email && gameDetailForm.touched.cisco_email
                        ? gameDetailForm.errors.cisco_email
                        : ''
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="form-block-wrapper">
                <div className="custom-form-block w-100">
                  <label htmlFor="game-detail-cisco-title" className="form-label">Job Title *</label>
                  <div className="input-group has-validation">
                    <select
                      name="cisco_title"
                      id="game-detail-cisco-title"
                      className={`form-select ${gameDetailForm.errors.cisco_title && gameDetailForm.touched.cisco_title ? 'is-invalid' : ''}`}
                      onChange={gameDetailForm.handleChange}
                      onBlur={gameDetailForm.handleBlur}
                      value={gameDetailForm.values.cisco_title}>
                      {
                        formOptionsData.cisco_jobTitle.map((title, titleIndex) => (
                          <option value={title} key={`cisco-jobtitle-${titleIndex}`}>{title}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="invalid-feedback">
                    {
                      gameDetailForm.errors.cisco_title && gameDetailForm.touched.cisco_title
                      ? gameDetailForm.errors.cisco_title
                      : ''
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row field-group-wrapper">
            <div className="col-12">
              <p className="field-label">"I.T. Admin" details</p>
            </div>
            <div className="col-4">
              <div className="form-block-wrapper">
                <div className="custom-form-block w-100">
                  <label htmlFor="game-detail-it-admin-name" className="form-label">Name *</label>
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      name='it_admin_name'
                      id='game-detail-it-admin-name'
                      className={`form-control ${gameDetailForm.errors.it_admin_name && gameDetailForm.touched.it_admin_name ? 'is-invalid' : ''}`}
                      placeholder={`I.T. Admin's Name`}
                      onChange={gameDetailForm.handleChange}
                      onBlur={gameDetailForm.handleBlur}
                      value={gameDetailForm.values.it_admin_name}
                    />
                    <div className="invalid-feedback">
                      {
                        gameDetailForm.errors.it_admin_name && gameDetailForm.touched.it_admin_name
                        ? gameDetailForm.errors.it_admin_name
                        : ''
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="form-block-wrapper">
                <div className="custom-form-block w-100">
                  <label htmlFor="game-detail-it-admin-email" className="form-label">Email *</label>
                  <div className="input-group has-validation">
                    <input 
                      type="text" 
                      name="it_admin_email"
                      id="game-detail-it-admin-email"
                      className={`form-control ${gameDetailForm.errors.it_admin_email && gameDetailForm.touched.it_admin_email ? 'is-invalid' : ''}`}
                      placeholder={`I.T. Admin's Email`}
                      onChange={gameDetailForm.handleChange}
                      onBlur={gameDetailForm.handleBlur}
                      value={gameDetailForm.values.it_admin_email}
                    />
                    <div className="invalid-feedback">
                      {
                        gameDetailForm.errors.it_admin_email && gameDetailForm.touched.it_admin_email
                        ? gameDetailForm.errors.it_admin_email
                        : ''
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="form-block-wrapper">
                <div className="custom-form-block w-100">
                  <label htmlFor="game-detail-it-admin-title" className="form-label">Job Title *</label>
                  <div className="input-group has-validation">
                    <select
                      name="it_admin_title"
                      id="game-detail-it-admin-title"
                      className={`form-select ${gameDetailForm.errors.it_admin_title && gameDetailForm.touched.it_admin_title ? 'is-invalid' : ''}`}
                      onChange={gameDetailForm.handleChange}
                      onBlur={gameDetailForm.handleBlur}
                      value={gameDetailForm.values.it_admin_title}>
                      {
                        formOptionsData.it_admin_jobTitle.map((title, titleIndex) => (
                          <option value={title} key={`it-admin-jobtitle-${titleIndex}`}>{title}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="invalid-feedback">
                    {
                      gameDetailForm.errors.it_admin_title && gameDetailForm.touched.it_admin_title
                      ? gameDetailForm.errors.it_admin_title
                      : ''
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="row field-group-wrapper">
            <div className="col-12">
              <p className="field-label">Spectator(s) Details</p>
            </div>
            {
              getSpectatorUI()
            }
          </div> */}

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