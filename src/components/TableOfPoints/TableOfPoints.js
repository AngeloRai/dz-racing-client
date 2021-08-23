import React, { useEffect, useState } from "react";
import api from "../../apis";
import "./TableOfPoints.css";
import { IoAdd } from "react-icons/io5";
import TableOfPointsFeed from "../TableOfPointsFeed/TableOfPointsFeed";
import TableOfPointsEdit from "../TableOfPointsEdit/TableOfPointsEdit";

function TableOfPoints() {
  const [pointsTable, setPointsTable] = useState([]);
  const [addFormData, setAddFormData] = useState({
    position: 0,
    points: 0,
  });
  const [editFormData, setEditFormData] = useState({
    position: 1,
    points: 1,
  });
  const [editPositiontId, setEditPositionId] = useState(null);
  const [toggled, setToggled] = useState(false);

  const fetchPointsTable = async () => {
    try {
      const fetchedPointsTable = await api.get("/positions");
      const sortedTable = fetchedPointsTable.data.sort(
        (a, b) => a.position - b.position
      );
      setPointsTable(sortedTable);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPointsTable();
  }, [setPointsTable, editPositiontId]);

  function handleAddChange(e) {
    setAddFormData({ ...addFormData, [e.target.name]: e.target.value });
  }

  function handleEditChange(e) {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  }

  const handleAddSubmit = async () => {
    try {
      await api.post("/position", addFormData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    console.log(editPositiontId);
    console.log(editFormData);
    await api.put("/position", {
      id: editPositiontId,
      position: editFormData.position,
      points: editFormData.points,
    });
    setEditPositionId(null);
  };

  const handleEdit = (event, position) => {
    event.preventDefault();
    setEditPositionId(position.id);
    const formValues = {
      position: position.position,
      points: position.points,
    };
    setEditFormData(formValues);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/position/${id}`);
      fetchPointsTable();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setEditPositionId(null);
  };
  
  return (
    <div className="text-center">
      <div className="form-box">
        <form
          className="main-form-box form-group"
          onSubmit={handleEditSubmit}
        >
          <div className="row table-header ">
            <div className=" col-3 p-1">Position</div>
            <div className="col-4 p-1">Points</div>
            <div className="col-5"></div>
          </div>
  
          {pointsTable.map((position) => (
            <div className="loop-box" key={position.id}>
              {editPositiontId === position.id ? (
                <TableOfPointsEdit
                  editFormData={editFormData}
                  handleEditChange={handleEditChange}
                  handleCancel={handleCancel}
                />
              ) : (
                <TableOfPointsFeed
                  position={position}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          ))}
        </form>
      </div>
      
        <form className="form-group" onSubmit={handleAddSubmit}>
          <div className="row">
           <div className="col-5">
              <input
                className="my-2 form-control text-center"
                type="number"
                name="position"
                min={0}
                required="required"
                placeholder="Enter position..."
                onChange={handleAddChange}
              />
           </div>
            <div className="col-5">
              <input
                className="my-2 form-control text-center"
                type="number"
                name="points"
                min={0}
                required="required"
                placeholder="Enter points..."
                onChange={handleAddChange}
              />
            </div>
  
            <div
              className="col-2 d-flex-column text-start"
              onMouseOver={() => setToggled(true)}
              onMouseOut={() => setToggled(false)}
            ><button className="my-3" type="submit">
              <IoAdd />
            </button>
              {toggled && (
                <div className="add-position-button-text">ADD POSITION</div>
              )}
            </div>
            
          </div>
        </form>
      
    </div>
  );
}

export default TableOfPoints;
