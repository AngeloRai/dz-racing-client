import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../../apis";
import PilotCreate from '../PilotCreate/PilotCreate'
import { BsCheckCircle, BsDashCircle } from "react-icons/bs";
import { AuthContext } from "../../contexts/authContext";
import "./ListPilots.css";

import ferrari from "../../images/scuderia-ferrari-laferrari-removebg.png";
import redBull from "../../images/red-bull.png";
import mercedes from "../../images/Mercedes.png";
import williams from "../../images/williams-removebg-preview.png";
import alpine from "../../images/Alpine_logo.png";
import astonMartin from "../../images/aston_martin.png";
import mclaren from "../../images/mclaren-fd1-team-logo.png";

function ListPilots() {
  const [pilots, setPilots] = useState();
  const [isOrderedFirst, setIsOrderedFirst] = useState(true);
  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPilots = async () => {
      const fetchedPilots = await api.get("/pilots");

      const sortedByTeam = fetchedPilots.data.sort((a, b) =>
        a.teams.name.localeCompare(b.teams.name)
      );
      console.log(sortedByTeam);
      setPilots(fetchedPilots.data);
    };
    fetchPilots();
  }, []);

  const handleSorting = (value) => {
    if (value === "status") {
      sortByStatus();
    } else if (value === "name") {
      sortByName();
    } else if (value === "team") {
      sortByTeam();
    }
  };

  const sortByStatus = () => {
    const pilotsCopy = [...pilots];
    let newPilotsCopy = [...pilotsCopy];
    if (isOrderedFirst) {
      newPilotsCopy = pilotsCopy.sort((a, b) => a.isActive - b.isActive);
    } else {
      newPilotsCopy = pilotsCopy.sort((a, b) => b.isActive - a.isActive);
    }
    setIsOrderedFirst(!isOrderedFirst);
    setPilots(newPilotsCopy);
    console.log(newPilotsCopy);
  };

  const sortByName = () => {
    const pilotsCopy = [...pilots];
    let newPilotsCopy = [...pilotsCopy];
    if (isOrderedFirst) {
      newPilotsCopy = pilotsCopy.sort((a, b) =>
        a.firstName.localeCompare(b.firstName)
      );
    } else {
      newPilotsCopy = pilotsCopy.sort((a, b) =>
        b.firstName.localeCompare(a.firstName)
      );
    }
    setIsOrderedFirst(!isOrderedFirst);
    setPilots(newPilotsCopy);
    console.log(newPilotsCopy);
  };

  const sortByTeam = () => {
    const pilotsCopy = [...pilots];
    let newPilotsCopy = [...pilotsCopy];
    if (isOrderedFirst) {
      newPilotsCopy = pilotsCopy.sort((a, b) => a.teamId - b.teamId);
    } else {
      newPilotsCopy = pilotsCopy.sort((a, b) => b.teamId - a.teamId);
    }
    setIsOrderedFirst(!isOrderedFirst);
    setPilots(newPilotsCopy);
    console.log(newPilotsCopy);
  };

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
    <div className="main-pilots-container">
      <div className="sort row list-pilots-header py-1">
        <div onClick={() => handleSorting("name")} className=" col-4">
          PILOT
        </div>
        <div onClick={() => handleSorting("status")} className=" col-2 p-0">
          STATUS
        </div>
        <div
          onClick={() => handleSorting("team")}
          className="team-title  col-3 p-0"
        >
          TEAM
        </div>
      </div>
      {pilots &&
        pilots.map((loopedPilot) => (
          <div
            className="pilots-container row bg-light border-bottom"
            key={loopedPilot.id}
          >
            <Link
              to={`/pilot/${loopedPilot.id}`}
              className="link-unstyled text-decoration-none text-dark col-4"
            >
              <div className="mx-1">{loopedPilot.fullName}</div>
            </Link>
            <div className="col-2 d-flex align-items-center ">
              {loopedPilot.isActive === true ? (
                <BsCheckCircle className="text-success h5 m-0" />
              ) : (
                <BsDashCircle className="text-danger h6" />
              )}
            </div>
            <div className="col-4 team-logo-img-box">
              <img src={logos[loopedPilot.teams.name]}  alt="team logo" />
            </div>
            
            {loggedInUser.user.role === "ADMIN" && <div className="col-2 d-flex justify-content-center">
              <Link
                className="edit-button link-unstyled text-decoration-none text-dark "
                to={`/pilot/edit/${loopedPilot.id}`}
              >
                EDIT
              </Link>
            </div>}
          </div>
        ))}
        {loggedInUser.user.role === "ADMIN" && <PilotCreate/>}
    </div>
  );
}

export default ListPilots;
