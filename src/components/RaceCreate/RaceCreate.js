/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
import RaceCreateForm from "../RaceCreateForm/RaceCreateForm";
import "./RaceCreate.css";
import api from "../../apis/index";

function RaceCreate() {
  const history = useHistory();
  const [state, setState] = useState({
    name: "",
    date: "",
    circuitId: 0,
    pilotId: 0,
  });
  const [circuitNames, setCircuitNames] = useState([]);
  const [listOfPilots, setListOfPilots] = useState([]);
  const [pilotPositions, setPilotPositions] = useState([]);

  const columnsFromBackend = {
    1: {
      name: "Pilots Competing",
      pilots: [],
    },
    2: {
      name: "Championship Pilots",
      pilots: listOfPilots,
    },
  };

  const [columns, setColumns] = useState(columnsFromBackend);

  useEffect(() => {
    const fetchPilots = async () => {
      try {
        //recieves pilot data with active status and ordered alphabetically by first name set in backend ("/acitve-pilots")
        const fetchedListPilots = await api.get("/active-pilots");
        setListOfPilots(fetchedListPilots.data); //initial list of pilots for the right draggable column
        const listCircuits = await api.get("/circuits");
        setCircuitNames(listCircuits.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    if (!listOfPilots.length) {
      fetchPilots();
    }
    setColumns(columnsFromBackend);
  }, [listOfPilots]);

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    const handleRacePositions = () => {
      //Generates list of Pilots which competed with necessary data for backend
      const newListOfPilots = columns[1].pilots.map((pilot, index) => {
        let extraPoint = 0;
        if (Number(pilot.id) === Number(state.pilotId)) {
          extraPoint = 1;
        }
        return {
          raceId: 0,
          pilotId: pilot.id,
          position: index + 1,
          fastestLapPoint: extraPoint,
        };
      });
      //Filters list of Pilots which did NOT compete
      const absentPilots = listOfPilots.filter(
        (pilot) => !newListOfPilots.map((x) => x.pilotId).includes(pilot.id)
      );
      //Generates list of absent pilots with necessary data for backend
      const outOfRacePilots = absentPilots.map((pilot) => {
        return {
          raceId: 0,
          pilotId: pilot.id,
          position: 0,
          fastestLapPoint: 0,
        };
      });
      setPilotPositions([...newListOfPilots, ...outOfRacePilots]);
    };
    handleRacePositions();
  }, [columns[1].pilots, state]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!state.circuitId) {
      alert("Please inform a Circuit");
    } else if (!state.name) {
      alert("A 'Race Name' must be informed");
    } else if (!state.date) {
      alert("Please inform a date.");
    } else if (!state.pilotId) {
      alert("Please inform a Pilot for the Fastest Lap");
    } else {
      try {
        //First create a Race and then send the race result
        //chamar post race passando
        const raceCreated = await api.post("/race", state);
        let raceResult = "";
        if (raceCreated.status === 200) {
          for (let i = 0; i < pilotPositions.length; i++) {
            pilotPositions[i].raceId = raceCreated.data.id;

            raceResult = await api.post("/race-result", pilotPositions[i]);
          }
        }
        if (raceResult.status === 200) {
          alert("Race created succesfully");
          history.push("/races");
        }
      } catch (err) {
        console.error("this is the error message", err);
        alert("This race name already exists", err);
      }
    }
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourcePilots = [...sourceColumn.pilots];
      const destPilots = [...destColumn.pilots];
      const [removed] = sourcePilots.splice(source.index, 1);
      destPilots.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          pilots: sourcePilots,
        },
        [destination.droppableId]: {
          ...destColumn,
          pilots: destPilots,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedPilots = [...column.pilots];
      const [removed] = copiedPilots.splice(source.index, 1);
      copiedPilots.splice(destination.index, 0, removed);
      console.log(copiedPilots);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          pilots: copiedPilots,
        },
      });
    }
  };
  
  return (
    <div className="row outer-div">
      <RaceCreateForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        state={state}
        circuitNames={circuitNames}
        fastLapPilots={listOfPilots}
      />
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], i) => {
          return (
            <div className="col-4 main-div" key={i}>
              <h2 className="title">{column.name}</h2>
              <div>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="column"
                        style={{
                          background: snapshot.isDraggingOver
                            ? "darkgrey"
                            : "lightgrey",
                        }}
                      >
                        {column.pilots.map((pilot, index) => {
                          return (
                            <Draggable
                              key={String(pilot.id)}
                              draggableId={String(pilot.id)}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div>
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="pilot"
                                      style={{
                                        userSelect: "none",
                                        backgroundColor: snapshot.isDragging
                                          ? "#633f42"
                                          : "#9e6267",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <div className="p-0">
                                        {i === 0 && (
                                          <strong>{index + 1}</strong>
                                        )}{" "}
                                        <strong>
                                          {pilot.firstName} {pilot.lastName[0]}.
                                        </strong>{" "}
                                        <small> {pilot.teams.name}</small>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
      <button className="btn btn-secondary mb-5 w-50" onClick={handleSubmit}>
        Create Race
      </button>
    </div>
  );
}

export default RaceCreate;
