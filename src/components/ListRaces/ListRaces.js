import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaStopwatch } from "react-icons/fa";
import ConfirmationModal from "../ConfirmationModal";
import "./ListRaces.css";
import api from "../../apis";
import ferrari from "../../images/scuderia-ferrari-laferrari-removebg.png";
import redBull from "../../images/red-bull.png";
import mercedes from "../../images/Mercedes.png";
import williams from "../../images/williams-removebg-preview.png";
import alpine from "../../images/Alpine_logo.png";
import astonMartin from "../../images/aston_martin.png";
import mclaren from "../../images/mclaren-fd1-team-logo.png";
import { AuthContext } from "../../contexts/authContext";
function ListRaces() {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [races, setRaces] = useState();
  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetcedRaces = await api.get(`/races`);
        setRaces(fetcedRaces.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const videoLink = {
    "Itália Kart": "https://www.youtube.com/embed/yU2kIUGU2Fw",
    "Kartódromo de Itú": "https://www.youtube.com/embed/GHIuwr2dp5M",
    "Kartódromo Granja Viana": "https://www.youtube.com/embed/ze0yxDsdRMI",
    "San Marino": "https://www.youtube.com/embed/JUj3CKv34ME"
  }

  const logos = {
    "Aston Martin": astonMartin,
    "Red Bull": redBull,
    Ferrari: ferrari,
    Mercedes: mercedes,
    Alpine: alpine,
    Williams: williams,
    McLaren: mclaren,
  };

  return (
    <div className="races-main-container">
      {races && (
        <Tabs defaultIndex={races.length}>
          <TabList>
            <section className="card">
              {races.map((race, i) =>
                race.raceResults.length ? (
                  <Tab key={i}>
                    <div className="race-name card--content">
                      <strong>{race.name}</strong>
                    </div>
                  </Tab>
                ) : null
              )}
            </section>
          </TabList>
          {/* for these tabs to work, there must be an equivalent number of Tabs and TabPanels */}
          {races &&
            races.map((raceInfo, i) =>
              raceInfo.raceResults.length ? (
                <div key={raceInfo.date} className="panel-container">
                  <TabPanel key={i}>
                    <small className="race-details-box">
                      <span className="race-details">{raceInfo.date}</span>{" "}
                      <span className="race-details">
                        {raceInfo.circuit.city}{" "}
                      </span>
                      
                        <span className="race-details">
                          {raceInfo.circuit.name}
                        </span>
                     
                    </small>
                    {raceInfo.raceResults
                      .sort(
                        (a, b) =>
                          (a.position || Number.MAX_VALUE) -
                          (b.position || Number.MAX_VALUE)
                      )
                      .map((raceRes) => (
                        <div className="race-result-row" key={i}>
                          <Link
                            to={`/pilot/${raceRes.pilot.id}`}
                            className="race-link"
                          >
                            <div className="race-info row" key={i}>
                              {/* check if pilot position is zero, if so, display 'out' instead of position */}
                              <div className="col-2 col-md-1 race-position-box">
                                {raceRes.position !== 0 ? (
                                  <strong className="race-pilots-position">
                                    {raceRes.position}
                                  </strong>
                                ) : (
                                  <strong className="absent-pilots-position">
                                    out
                                  </strong>
                                )}
                              </div>
                              {/* check if pilot position is zero, if so, diplsay without strong font */}
                              <div className="col-6 col-md-5 race-pilot-name-box">
                                {raceRes.position !== 0 ? (
                                  <strong className="pilot-name">
                                    {raceRes.pilot.firstName}{" "}
                                    {raceRes.pilot.lastName[0]}.
                                  </strong>
                                ) : (
                                  <span className="pilot-name">
                                    {raceRes.pilot.firstName}{" "}
                                    {raceRes.pilot.lastName[0]}.
                                  </span>
                                )}
                                {raceRes.fastestLapPoint === 1 ? (
                                  <span>
                                    <FaStopwatch className="fast-lap-icon" />
                                  </span>
                                ) : null}
                              </div>
                              <div className="team-box col-4 col-md-5 align-items">
                                <div className="img-box">
                                  <img
                                    src={logos[raceRes.pilot.teams.name]}
                                    alt="team logo"
                                    className="team-logo-img"
                                  />
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                      <div id="video-tab" className="video my-4 ">
                        <iframe
                          src={videoLink[raceInfo.circuit.name]}
                          frameBorder="0"
                          allowFullScreen
                          title="kart tracks"
                          
                        ></iframe>
                      </div>
                    <div className="d-flex justify-content-center py-4">

                      {loggedInUser.user.role === "ADMIN" && <div>
                        <button
                          className="btn btn-danger "
                          onClick={() => setShowModal(true)}
                        >
                          DELETE RACE{" "}
                          <strong> {raceInfo.name.toUpperCase()}</strong>
                        </button>
                          
                        <Link to={`/edit-race/${raceInfo.id}`} className="btn btn-primary race-link text-white mx-2">
                          EDIT RACE
                        </Link>
                      </div>}
                      <ConfirmationModal
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                        handleConfirm={() =>
                          history.push(`/race/delete/${raceInfo.id}`)
                        }
                        title={`Are you sure you want to delete race ${raceInfo.name.toUpperCase()}?`}
                      >
                        <p>
                          This action is irreversible! Click on "Confirm" to
                          delete.
                        </p>
                      </ConfirmationModal>
                    </div>
                  </TabPanel>
                </div>
              ) : null
            )}
        </Tabs>
      )}
    </div>
  );
}

export default ListRaces;
