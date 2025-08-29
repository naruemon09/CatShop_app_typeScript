import axios from "axios";
import React, { useEffect, useState } from "react";
import Store from "../../store/Store";
import type { IUser } from "../../../Interface/IAuth";

const Admin: React.FC = () => {
  const { token } = Store();
  const [user, setUser] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7092/api/Users/GetUserEmployee",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
        <h2 className="fw-bold">Admin Management</h2>
        <div>
          <a href="/addrole" className="btn btn-warning me-2">
            + Add New Position
          </a>
          <a href="/registerAdmin" className="btn btn-warning">
            + Add New User Admin
          </a>
        </div>
      </div>
      <div className="card bg-white p-4">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Position</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            {user.map((item, index) => (
              <tbody>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.gender === "0" ? "Male" : "Female"}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>
                    {item.roleList.map((r) => (
                      <div>{r.rolename}</div>
                    ))}
                  </td>

                  <td>
                    <span
                      className={`badge ms-2
                    ${
                      item.userStatus === "Active" ? "bg-success " : "bg-danger"
                    }`}
                      style={{
                        color:
                          item.userStatus === "Active" ? "#198754" : "#dc3545",
                      }}
                    >
                      {item.userStatus}
                    </span>
                  </td>
                  <td>
                    <a
                      href={`/admin/${item.userid}`}
                      className="btn btn-sm btn-success me-2"
                    >
                      View
                    </a>
                    <a
                      href={`/updateAdmin/${item.userid}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Edit
                    </a>
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
