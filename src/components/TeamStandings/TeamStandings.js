import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../apis/index";
import "./TeamStandings.css";

import ferrari from "../../images/scuderia-ferrari-laferrari-removebg.png";
import redBull from "../../images/red-bull.png";
import mercedes from "../../images/Mercedes.png";
import williams from "../../images/williams-removebg-preview.png";
import alpine from "../../images/Alpine_logo.png";
import astonMartin from "../../images/aston_martin.png";
import mclaren from "../../images/mclaren-fd1-team-logo.png";

function TeamStandings() {
  const [pilots, setPilots] = useState([]);
  const [teamStandings, setTeamStandings] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    async function fetchPilots() {
      try {
        const response = await api.get("/race-results");
        const fetchedPoints = await api.get("/positions");

        setPilots(response.data);

        let treatedPositions = {};
        fetchedPoints.data.forEach((pos) => {
          treatedPositions[pos.position] = pos.points;
        });

        setPositions(treatedPositions);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchPilots();
  }, []);

  useEffect(() => {
    let teamResults = [];
    pilots.reduce((res, value) => {
      if (!res[value.pilot.teamId]) {
        res[value.pilot.teamId] = {
          teamId: value.pilot.teams.id,
          team: value.pilot.teams.name,
          points: 0,
        };
        teamResults.push(res[value.pilot.teamId]);
      }
      if (value.position in positions) {
        res[value.pilot.teamId].points += positions[value.position];
        res[value.pilot.teamId].points += value.fastestLapPoint;
      }
      return res;
    }, {});
    const sortedTeams = teamResults.sort((a, b) => b.points - a.points);
    setTeamStandings(sortedTeams);
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
    <div className="team-standings-container">
      <div className="inner-team-container">
        <h3 className="team-standings-title ">Team Standings</h3>
        <div className="row team-standings-header">
          <div className="col-1 text-center">P</div>
          <div className="col-3 col-md-1 ">TEAM</div>
          <div className="col-5 col-md-8"></div>
          <div className="col-2  text-center">PTS</div>
        </div>

        {teamStandings.map((loopedTeam, i) => (
          <div key={i} className="team-standing-row row">
            <strong className="col-1 text-center">{i + 1}</strong>
            <div className="col-3 col-md-1 text-center">
              <Link to={`/pilot/${loopedTeam.teamId}`} className="team-link">
                <img
                  src={logos[loopedTeam.team]}
                  alt="team"
                  className="team-logo"
                />
              </Link>
            </div>
            <small className="col-5 col-md-8">
              <Link to={`/pilot/${loopedTeam.teamId}`} className="team-link">
                {loopedTeam.team}
              </Link>
            </small>
            <strong className=" col-2 text-center">
              {loopedTeam.points}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamStandings;
