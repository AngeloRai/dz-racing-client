import React, { useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";

import api from '../apis'


function RaceDelete() {
  const { id } = useParams();
  const histoy = useHistory()
  useEffect(() => {
    const deleteRace = async () => {
      try {
        await api.delete(`/race/${id}`);
        alert("Race deleted successfully!")
        histoy.push('/races')
      } catch (err) {
        console.console.error(err);
      }
    };
    deleteRace()
  }, [id]);

  return <div>DELETING RACE...</div>;
}

export default RaceDelete
