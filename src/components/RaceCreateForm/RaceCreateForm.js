import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import "./RaceCreateForm.css";

function RaceCreateSideForm(props) {
  const [toggled, setToggled] = useState(false);
  
  return (
    <div className="col-12 mt-5">
      <div className="row">
        <div className="col-6 col-lg-3 d-flex align-items-center">
          <div className="w-100">
            <label htmlFor="dzFormTeamName">Circuit Name</label>
            <select
              type="text"
              className="form-control mb-2 no-border"
              id="dzRacingFormCircuit"
              name="circuitId"
              onChange={props.handleChange}
              value={props.state.circuitId}
            >
              <option value=""></option>
              {props.circuitNames.map((circuit) => (
                <option key={circuit.id} value={circuit.id}>
                  {circuit.name}
                </option>
              ))}
            </select>
          </div>
            <div className="d-flex-column" onMouseOver={() => setToggled(true)} onMouseOut={() => setToggled(false)}>
              <Link to="/add-circuit">
                <IoAdd className="text-secondary plus-icon h4" />
              </Link>
              {toggled && (
                <div className="add-circuit-button-text">ADD A CIRCUIT</div>
              )}
            </div>
        </div>

        <div className="col-6 col-lg-3">
          <label htmlFor="dzFormTeamName">Race Name</label>
          <input
            type="text"
            className="form-control mb-2 no-border"
            id="name"
            name="name"
            onChange={props.handleChange}
            value={props.state.name}
          />
        </div>

        <div className="col-6 col-lg-3">
          <label htmlFor="dzFormTeamName">Race Date</label>
          <input
            type="date"
            className="form-control mb-2 no-border"
            id="date"
            name="date"
            onChange={props.handleChange}
            value={props.state.date}
          />
        </div>

        <div className="col-6 col-lg-3">
          <label htmlFor="dzFormTeamName">Fastest Lap Pilot</label>
          <select
            type="text"
            className="form-control mb-2 no-border"
            id="dzRacingFormname"
            name="pilotId"
            onChange={props.handleChange}
            value={props.state.pilotId}
          >
            <option value=""></option>
            {props.fastLapPilots.map((pilot) => (
              <option key={pilot.id} value={pilot.id}>
                {pilot.fullName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default RaceCreateSideForm;
