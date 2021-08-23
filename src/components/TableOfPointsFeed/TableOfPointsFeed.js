import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import "./TableOfPointsFeed.css";

const TableOfPointsFeed = ({ position, handleEdit, handleDelete }) => {
  const [editToggled, setEditToggled] = useState(false);
  const [cancelEditToggled, setCancelEditToggled] = useState(false);
  return (
    <div className="points-box">
      <div className="row shadow-sm p-1 rounded" key={position.id}>
        <span className="col-3">{position.position}</span>
        <span className="col-4">{position.points}</span>

        <div className="d-flex-row text-center col-5">
          <span
            onMouseOver={() => setEditToggled(true)}
            onMouseOut={() => setEditToggled(false)}
          >
            <button
              className="mx-1"
              type="button"
              onClick={(event) => handleEdit(event, position)}
            >
              <MdModeEdit className="text-secondary " />
            </button>
            {editToggled && (
              <div className="edit-position-button-text">EDIT POSITION</div>
            )}
          </span>

          <span
            onMouseOver={() => setCancelEditToggled(true)}
            onMouseOut={() => setCancelEditToggled(false)}
          >
            <button
              className="mx-1"
              type="button"
              onClick={() => handleDelete(position.id)}
            >
              <FaRegTrashAlt className="text-secondary " />
            </button>

            {cancelEditToggled && (
              <div className="edit-position-button-text">CANCEL EDIT</div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TableOfPointsFeed;
