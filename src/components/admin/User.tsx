import React, { useEffect, useState } from 'react'
import Store from '../store/Store';
import axios from 'axios';

const User: React.FC = () => {

  const {token} = Store();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("https://localhost:7092/api/Users/GetUserClient", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log(response);
          setUser(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Users Management</h2>
      </div>
      <div className="card bg-white p-4">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            {user.map((item, index) => (
              <tbody>
                <tr key={item}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.firstname} {item.lastname}</td>
                  <td>{item.gender === '0' ? 'Male' : 'Female'}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  )
}

export default User