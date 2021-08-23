import React, { useEffect, useState } from "react";
import CircuitFeed from "../CircuitFeed";
import { useHistory, Link } from "react-router-dom";
import api from "../../apis";

function CircuitCreate() {
  const history = useHistory();
  const [circuits, setCircuits] = useState();
  const [state] = useState({
    name: "",
    city: "",
  });
  

  async function handleSubmit(values) {
    console.log(values);
    try {
      await api.post("/circuit", values);

      history.push("/add-race");
    } catch (err) {
      console.error("This is Circuit Post ERROR", err);
      alert("Circuit name already exists!");
    }
  }

  useEffect(() => {
    const fetchCircuits = async () => {
      try {
        const fetchedCircuits = await api.get("/circuits");
        setCircuits(fetchedCircuits.data);
        console.log(fetchedCircuits.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCircuits();
  }, []);

  return (
    <div>
      <CircuitFeed handleSubmit={handleSubmit} state={state} />

      <div className="container my-5">
        <div className="row bg-secondary h5 py-1">
          <div className="col-5 justify-content-center ">CIRCUIT NAME</div>
          <div className="col-4 ">CIRCUIT CITY</div>
        </div>
        {circuits &&
          circuits.map((loopedCircuit) => (
            <div className="h6 row py-1 bg-light " key={loopedCircuit.id}>
              <Link
                to={`/pilot/${loopedCircuit.id}`}
                className="link-unstyled text-decoration-none text-dark col-5"
              >
                <div className="mx-1">{loopedCircuit.name}</div>
              </Link>
              <div className=" col-4">{loopedCircuit.city}</div>

              <Link
                className="btn btn-primary col-2"
                style={{ height: "2rem" }}
                to={`/circuit/edit/${loopedCircuit.id}`}
              >
                EDIT
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CircuitCreate;
