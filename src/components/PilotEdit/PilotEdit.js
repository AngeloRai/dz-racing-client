import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import api from "../../apis/index";
import ConfirmationModal from "../ConfirmationModal";

import PilotFeed from "../PilotFeed/PilotFeed";

function PilotEdit() {
  const history = useHistory();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const isDeleteComponent = true;
  const [teams, setTeams] = useState();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    teamId: 0,
    isActive: true,
    teamName: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPilot = await api.get(`/pilot/${id}`);
        const fetchedTeams = await api.get("/teams");
        const sortedTeams = fetchedTeams.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setTeams(sortedTeams);
        setState({
          firstName: fetchedPilot.data.firstName,
          lastName: fetchedPilot.data.lastName,
          isActive: fetchedPilot.data.isActive,
          teamName: fetchedPilot.data.teams.name,
          teamId: fetchedPilot.data.teamId,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  async function handleSubmit(values) {
    try {
      await api.put(`/pilot/${id}`, values);
      console.log(values);
      history.push("/pilots");
      alert("Pilot updated successfully");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container">
      <h2 className="mt-3">EDIT PILOT </h2>
      <hr />
      <PilotFeed
        state={state}
        teams={teams}
        handleSubmit={handleSubmit}
        onClick={() => setShowModal(true)}
        isDeleteComponent={isDeleteComponent}
      />
      <div className="d-flex justify-content-center my-5">
        <ConfirmationModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleConfirm={() => history.push(`/pilot/delete/${id}`)}
          title={`Are you sure you want to delete pilot ?`}
        >
          <p>This action is irreversible! Click on "Confirm" to delete.</p>
        </ConfirmationModal>
      </div>
    </div>
  );
}

export default PilotEdit;
