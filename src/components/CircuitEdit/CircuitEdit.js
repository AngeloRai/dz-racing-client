import React, { useEffect, useState } from "react";
import CircuitFeed from "../CircuitFeed";
import { useHistory, useParams } from "react-router-dom";
import "./CircuitEdit.css";
import api from "../../apis";

function CircuitEdit() {
  const { id } = useParams();
  const history = useHistory();
  const [state, setState] = useState({
    name: null,
    city: "",
  });
  
  async function handleSubmit(values) {
    console.log(values);
    try {
      await api.put(`/circuit/${id}`, values);

      history.push("/add-race");
    } catch (err) {
      console.error("This is a Circuit Post ERROR", err);
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/circuit/${id}`);
      console.log(`Circuit ${state.name} deleted successfully!`);
      alert(`Circuit ${state.name} deleted successfully!`);
      history.push("/add-circuit");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchCircuit = async () => {
      try {
        const fetchedCircuit = await api.get(`/circuit/${id}`);
        setState({
          name: fetchedCircuit.data.name,
          city: fetchedCircuit.data.city,
        });
        console.log(fetchedCircuit);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCircuit();
  }, [id]);

  console.log(state);
  return (
    <div>
      <CircuitFeed
        handleSubmit={handleSubmit}
        state={state}
        handleDelete={handleDelete}
        
      />
    </div>
  );
}

export default CircuitEdit;
