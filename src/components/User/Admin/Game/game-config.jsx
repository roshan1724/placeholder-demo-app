import "./admin-game.scss";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { UiActions } from "../../../../store/ui-slice";
import { API_PATHS } from "../../../../utilities/constants";
import { Card, Form } from "react-bootstrap";

function AdminConfigGame() {
  const dispatch = useDispatch();
  const { gameId } = useParams();
  const [gameInfo, setGameInfo] = useState(null);
  const [scenarioFile, setScenarioFile] = useState([]);
  const [nlpDataFile, setNlpDataFile] = useState([]);
  const [gameDifficultyLevel, setGameDifficultyLevel] = useState(10);
  const [isDifficultyLevelEnabled, setIsDifficultyLevelEnabled] =
    useState(false);

  useEffect(() => {
    dispatch(UiActions.setShowLoader(true));
    // API call to get game list
    setTimeout(() => {
      fetch(API_PATHS.GAME_LIST_DATA)
        .then((response) => response.json())
        .then((response) => {
          setGameInfo(response.data.find((data) => data.game_id === gameId));
          dispatch(UiActions.setShowLoader(false));
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);
  }, [dispatch, gameId]);

  useEffect(() => {
    console.log("updated scenario file is: ", scenarioFile[0]?.name);
  }, [scenarioFile]);

  useEffect(() => {
    console.log("updated nlp data file is: ", nlpDataFile[0]?.name);
  }, [nlpDataFile]);

  return (
    <Fragment>
      <section className="admin-game-config">
        <h1 className="title">
          Configurations for Game <code>{gameInfo?.game_id}</code>:
        </h1>

        <div className="page-content-wrapper">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="row section-game-data">
                <div className="col-12 section-title">Game Data</div>
                <div className="col-12 col-md-6">
                  <Card>
                    <div className="card-img-top config-icon-wrapper flex-center">
                      <span className="icon-wrapper">
                        <i className="fa-solid fa-file-excel"></i>
                      </span>
                    </div>
                    <Card.Body>
                      <Card.Title>Scenario Data</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Import Excel Data
                      </Card.Subtitle>
                      <Card.Text>
                        <strong>Note:</strong> Importing from file will replace
                        any existing data for this scenario and abort any test
                        in progress!
                      </Card.Text>
                      <Form.Group className="position-relative mb-3">
                        <Form.Label>
                          Select an Excel file (.xlsx) containing scenario data.
                        </Form.Label>
                        <Form.Control
                          type="file"
                          required
                          name="scenario_file"
                          onChange={(e) => setScenarioFile(e.target.files)}
                        />
                      </Form.Group>
                    </Card.Body>
                    <hr />
                    <Card.Body>
                      <Card.Title>Scenario Information</Card.Title>
                      <Card.Text>Innformation about the senarion</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-12 col-md-6">
                  <Card>
                    <div className="card-img-top config-icon-wrapper flex-center">
                      <span className="icon-wrapper">
                        <i className="fa-solid fa-snowflake"></i>
                      </span>
                    </div>
                    <Card.Body>
                      <Card.Title>Model Data</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Import NLP Data
                      </Card.Subtitle>
                      <Card.Text>
                        <strong>Note:</strong> Importing the same model (folder
                        name) will replace any existing data!
                      </Card.Text>
                      <Form.Group className="position-relative mb-3">
                        <Form.Label>
                          Select a zip file (.zip) containing the model folder.
                        </Form.Label>
                        <Form.Control
                          type="file"
                          required
                          name="scenario_file"
                          onChange={(e) => setNlpDataFile(e.target.files)}
                        />
                      </Form.Group>
                    </Card.Body>
                    <hr />
                    <Card.Body>
                      <Card.Title>Installed NLP Models</Card.Title>
                      <Card.Text>
                        Information about the installed models
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="row section-game-config">
                <div className="col-12 section-title">Game Configurations</div>
                <div className="col-12">
                  <div className="configuration-wrapper">
                    <div className="config-content">
                      <span className="icon-wrapper me-2">
                        <i className="fa-solid fa-hand-point-right"></i>
                      </span>
                      <div className="config-label">Difficulty</div>
                      <div className="config-form-action">
                        <Form.Group className="mb-3">
                          <Form.Select id="difficultySelect">
                            <option>Easy</option>
                            <option>Normal</option>
                            <option>Hard</option>
                          </Form.Select>
                          <Form.Label htmlFor="difficultySelect">
                            NLP Action Selection Enabled
                          </Form.Label>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="config-content">
                      <span className="icon-wrapper me-2">
                        <i className="fa-solid fa-hand-point-right"></i>
                      </span>
                      <div className="config-label">Difficulty Options</div>
                      <div className="config-form-action">
                        <Form.Group className="mb-3">
                          <Form.Check
                            type="checkbox"
                            id={`default-checkbox`}
                            value={isDifficultyLevelEnabled}
                            onChange={(e) =>
                              setIsDifficultyLevelEnabled(e.target.checked)
                            }
                            label={`Revert difficulty to Easy after ${gameDifficultyLevel} Empty Action Searches`}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Range
                            id={`difficulty-range`}
                            min={1}
                            max={10}
                            disabled={!isDifficultyLevelEnabled && "disabled"}
                            defaultValue={gameDifficultyLevel}
                            onInput={(e) =>
                              setGameDifficultyLevel(e.target.value)
                            }
                          />
                        </Form.Group>
                      </div>
                    </div>

                    <div className="config-content">
                      <span className="icon-wrapper me-2">
                        <i className="fa-solid fa-hand-point-right"></i>
                      </span>
                      <div className="config-label">NLP Model</div>
                      <div className="config-form-action">
                        <Form.Group className="mb-3">
                          <Form.Select id="nlpModelSelect">
                            <option>
                              paraphrase-mpnet-base-v2-custom_20230131_2059
                            </option>
                            <option>
                              paraphrase-mpnet-base-v1-custom_20221220_2012
                            </option>
                            <option>
                              paraphrase-mpnet-base-v0-custom_20221125_1943
                            </option>
                          </Form.Select>
                        </Form.Group>
                      </div>
                    </div>

                    <div className="config-content">
                      <span className="icon-wrapper me-2">
                        <i className="fa-solid fa-hand-point-right"></i>
                      </span>
                      <div className="config-label">NLP Model Options</div>
                      <div className="config-form-action">
                        <Form.Group className="mb-3">
                          <Form.Range
                            id={`nlp-options-range`}
                            defaultValue={0.45 * 100}
                            max={100}
                            min={0}
                            onInput={(e) =>
                              (document.getElementById(
                                "nlp-options-range-value"
                              ).value = parseFloat(
                                e.target.value / 100
                              ).toFixed(2))
                            }
                          />
                          <Form.Label htmlFor={`nlp-options-range`}>
                            Match Threshold Score:{" "}
                            <output id={`nlp-options-range-value`}>0.45</output>
                          </Form.Label>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default AdminConfigGame;
