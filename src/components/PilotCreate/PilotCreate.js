import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from "../../apis/index";
import './PilotCreate.css'
import PilotFeed from "../PilotFeed/PilotFeed";

function PilotCreate() {
  const history = useHistory();
  const [teams, setTeams] = useState();
  const [state] = useState({
    firstName: " ",
    lastName: "",
    teamId: 0,
    isActive: true,
    teamName: "",
  });

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await api.get("/teams");
        const sortedTeams = fetchedTeams.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setTeams(sortedTeams);
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchTeams();
  }, []);

  async function handleSubmit(values) {
    
    try {
      await api.post("/pilot", values);
      history.push("/");
      history.push("/pilots");
    } catch (err) {
      console.error(err);
      alert("Pilot name already exists!");
    }
    
  }
  
  return (
    <div className="container">
      <h3 className="mt-4">ADD A PILOT TO THE CHAMPIONSHIP</h3>
      <hr />
      <PilotFeed teams={teams} handleSubmit={handleSubmit}  state={state} />
    </div>
  );
}

export default PilotCreate;
