import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../apis/index";
import "./PilotStandings.css";

import ferrari from "../../images/scuderia-ferrari-laferrari-removebg.png";
import redBull from "../../images/red-bull.png";
import mercedes from "../../images/Mercedes.png";
import williams from "../../images/williams-removebg-preview.png";
import alpine from "../../images/Alpine_logo.png";
import astonMartin from "../../images/aston_martin.png";
import mclaren from "../../images/mclaren-fd1-team-logo.png";

function PilotStandings() {
  const [pilots, setPilots] = useState([]);
  const [positions, setPositions] = useState([]);
  const [pilotPositions, setPilotPositions] = useState([]);

  useEffect(() => {
    async function fetchPilotsPoints() {
      try {
        const fetchedRaceResults = await api.get("/race-results");
        const fetchedPoints = await api.get("/positions");

        setPilots(fetchedRaceResults.data.filter(pilot => pilot.pilot.isActive === true));
        console.log(fetchedRaceResults.data);
        let treatedPositions = {};
        fetchedPoints.data.forEach((pos) => {
          treatedPositions[pos.position] = pos.points;
        });

        setPositions(treatedPositions);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchPilotsPoints();
  }, []);

  useEffect(() => {
    let pilotResults = [];
    pilots.reduce((res, value) => {
      if (!res[value.pilotId]) {
        res[value.pilotId] = {
          pilotId: value.pilot.id,
          pilot: value.pilot.firstName + " " + value.pilot.lastName[0] + ".",
          team: value.pilot.teams.name,
          points: 0,
          fastLaps: 0,
        };
        pilotResults.push(res[value.pilotId]);
      }
      if (value.position in positions) {
        res[value.pilotId].points += positions[value.position];
        res[value.pilotId].points += value.fastestLapPoint;
        res[value.pilotId].fastLaps += value.fastestLapPoint;
      }
      return res;
    }, {});

    const sortedPilots = pilotResults.sort((a, b) => b.points - a.points);

    setPilotPositions(sortedPilots);
  }, [pilots, positions]);

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
    <div className="main-standings-container">
      <div className="inner-standings-container">
        <h3 className="standings-title ">Driver Standings</h3>
        <div className="row standings-header">
          <div className="col-1 text-center">P</div>
          <div className="col-4 ">PILOT </div>
          <div className="col-2 text-center">TEAM</div>
          <div className="col-2 col-md-3"></div>
          <div className="col-2 text-center ">PTS</div>
        </div>

        {pilotPositions.map((pilot, i) => (
          <div key={i} className="pilot-standing-row row">
            <strong className="col-1 text-center ">{i + 1}</strong>
            <div className="col-4">
              <Link to={`/pilot/${pilot.pilotId}`} className="pilot-link ">
                <strong className="">{pilot.pilot}</strong>
              </Link>
            </div>
            <div className="col-3 col-md-2 text-center">
              <img
                src={logos[pilot.team]}
                className="pilot-team-img"
                alt="team"
              />
            </div>
            <div className="col-1 col-md-3"></div>
            <strong className=" col-2 text-center">{pilot.points}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PilotStandings;
