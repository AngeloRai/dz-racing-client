import React, { useEffect, useState } from "react";
import api from "../../apis";
import UserEditFeed from './UserEditFeed'

function Users() {
  const [users, setUsers] = useState([]);
  
  const fetchUsers = async () => {
    const fetchedUsers = await api.get("/users");
    setUsers(fetchedUsers.data.sort((a, b) => a.email.localeCompare(b.email)))
    console.log(fetchedUsers.data);
  };
  
  useEffect(() => {
    fetchUsers();
  }, [setUsers]);


  const handleDelete = async (id) => {
    try {
      await api.delete(`/user-delete/${id}`)
      fetchUsers()
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdate = async (id, values) => {
    await api.put(`/user-update/${id}`, values)
    fetchUsers()
  }


console.log(users);

  return (
    <div className="row container">
      {users &&
        users.map((user) => (
          <div className=" col-12 col-sm-12	col-md-4 shadow-sm m-2 p-3 border">
           <UserEditFeed
            user={user}
            handleSubmit={handleUpdate}
          />
            <div>
              
              <button className="btn btn-danger my-2" onClick={() =>{ handleDelete(user.id)}}>DELETE USER</button>
            </div>
          </div>
        ))}

        
    </div>
  );
}

export default Users;
