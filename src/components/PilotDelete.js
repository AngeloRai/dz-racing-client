import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../apis";

function PilotDelete() {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const deletePilot = async () => {
      try {
        await api.delete(`/pilot/${id}`);
        alert("Pilot deleted successfully!")
        history.push("/pilots");
      } catch (err) {
        console.console.error(err);
      }
    };
    deletePilot()
  }, [id]);

  return <div>DELETING PILOT...</div>;
}

export default PilotDelete;
