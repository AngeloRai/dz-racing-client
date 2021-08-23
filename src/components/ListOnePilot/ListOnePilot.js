import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../apis/index";
import { FaStopwatch } from 'react-icons/fa'
import { AuthContext } from "../../contexts/authContext";


function ListOnePilot() {
  const { id } = useParams();
  const [pilot, setPilot] = useState();
  const [races, setRaces] = useState();
  const [positions, setPositions] = useState([]);
  const { loggedInUser } = useContext(AuthContext);

  const points_position = {
    0: 0,
    1: 35,
    2: 30,
    3: 27,
    4: 24,
    5: 22,
    6: 20,
    7: 18,
    8: 16,
    9: 14,
    10: 12,
    11: 11,
    12: 10,
    13: 9,
    14: 8,
    15: 7,
    16: 6,
    17: 5,
    18: 4,
    19: 3,
    20: 1,
  };

  //Get one pilot by id

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/pilot/${id}`);
        const fetchedPoints = await api.get("/positions");
        let treatedPositions = {};
        fetchedPoints.data.forEach((pos) => {
          treatedPositions[pos.position] = pos.points;
        });
        
        setPilot(response.data);
        setRaces(response.data.raceResults)
                setPositions(treatedPositions);


      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
    console.log(pilot);
  },[]);

  
 

  const logos = {
    "Aston Martin": "lightgreen",
    "Red Bull": "darkblue",
    Ferrari: "red",
    Mercedes: "darkgrey",
    Alpine: "blue",
    Williams: "white",
  };
  

  return (
    <div>
      <div className="container mt-5">
        <div className="row bg-danger h5 py-1 justify-content-between">
          <div className="col-4 col-lg-3 justify-content-center">PILOT</div>
          <div className="col-4 col-lg-8">TEAM</div>
          <div
            className="col-2 col-lg-1 justify-content-center"
            style={{ display: "flex" }}
          >
            PTS
          </div>
        </div>

        {pilot && (
          <div>
            <div className="h6 row py-1 bg-secondary justify-content-between">
              <div className="col-4 col-lg col-lg-3">
                {pilot.fullName.toUpperCase()}
              </div>
              <div
                className="font-weight-bold  col-4 col-lg col-lg-8"
                style={{ color: `${logos[pilot.teams.name]}` }}
              >
                {pilot.teams.name}
              </div>
              <td
                className="col-2 col-lg-1 justify-content-center"
                style={{ display: "flex" }}
              >
                {pilot.raceResults.reduce(
                  (a, b) => a + positions[b.position],
                  0
                )}
              </td>
  
            </div>
        {loggedInUser.user.role === "ADMIN" && <Link className="btn btn-primary col-1" to={`/pilot/edit/${pilot.id}`}>EDIT</Link>}
          </div>
        )}
      </div>
     
      <div className="container mt-5">
        <div className="row bg-danger h5 py-1 justify-content-between">
          <div className="col-3">RACES </div>
          <div className="col-4">DATE</div>
          <div className="col-3"></div>
          <div
            className="col-2 justify-content-center"
            style={{ display: "flex" }}
          >
            POS
          </div>
        </div>

        {races &&
          races.map((loopedRace, i) => (
            <div className="h6 row py-1 bg-light border-bottom justify-content-between">
              <div className="col-3">{loopedRace.race.name}</div> 
              <small className="font-weight-bold  col-4 ">
                {loopedRace.race.date}
              </small>
              {loopedRace.fastestLapPoint === 1 ? <FaStopwatch className="col-3 text-secondary"/> : <div className="col-3"></div>}
              <td
                className="col-2 justify-content-center"
                style={{ display: "flex" }}
              >
                {loopedRace.position === 0 ? "absent" : loopedRace.position}
              </td>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ListOnePilot;
