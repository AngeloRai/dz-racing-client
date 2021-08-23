import React, { useState } from "react";
import { RiSave2Fill } from "react-icons/ri";
import { FcCancel } from "react-icons/fc";
import "./TableOfPointsEdit.css";

function TableOfPointsEdit({ editFormData, handleEditChange, handleCancel }) {
 const [updateToggle, setUpdateToggle] = useState(false)
 const [cancelUpdateToggle, setCancelUpdateToggle] = useState(false)
 
  return (
    <div className="edit-box row">
      <div className="form-position col-3">
        <input
          className=" m-1 form-control p-0 text-center"
          type="number"
          required="required"
          placeholder="Enter position..."
          name="position"
          min={0}
          value={editFormData.position}
          onChange={handleEditChange}
        ></input>
      </div>
      <div className="form-position col-4">
        <input
          className=" m-1 form-control p-0 text-center"
          type="number"
          required="required"
          placeholder="Enter points..."
          name="points"
          min={0}
          value={editFormData.points}
          onChange={handleEditChange}
        ></input>
      </div>
      <div className="col-5">
        <span
          onMouseOver={() => setUpdateToggle(true)}
          onMouseOut={() => setUpdateToggle(false)}
        >
          <button className="mx-1 text-secondary" type="submit">
            <RiSave2Fill />
          </button>

          {updateToggle && (
            <div className="save-update-button-text">UPDATE</div>
          )}
        </span>
        <span
          onMouseOver={() => setCancelUpdateToggle(true)}
          onMouseOut={() => setCancelUpdateToggle(false)}
        >
          <button className="mx-1" type="button" onClick={handleCancel}>
            <FcCancel />
          </button>
          {cancelUpdateToggle && (
            <div className="save-update-button-text">CANCEL</div>
          )}
        </span>
      </div>
    </div>
  );
}

export default TableOfPointsEdit;
