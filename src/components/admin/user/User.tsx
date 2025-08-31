import React, { useEffect, useState } from "react";
import Store from "../../store/Store";
import axios from "axios";
import type { IUser } from "../../../Interface/IAuth";

const User: React.FC = () => {
  const { token } = Store();
  const [user, setUser] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7092/api/Users/GetUserClient",
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
        <h2 className="fw-bold">การจัดการลูกค้า</h2>
      </div>
      <div className="card bg-white p-4">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>ชื่อผู้ใช้</th>
                <th>ชื่อ - นามสกุล</th>
                <th>เพศ</th>
                <th>อีเมล</th>
                <th>ที่อยู่</th>
                <th>สถานะ</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
            {user.map((item, index) => (
              <tbody>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>
                    {item.firstname} {item.lastname}
                  </td>
                  <td>{item.gender === "0" ? "Male" : "Female"}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>
                    <span
                      className={`badge ms-2
                    ${
                      item.userStatus === "ใช้งานอยู่" ? "bg-success " : "bg-danger"
                    }`}
                      style={{
                        color:
                          item.userStatus === "ใช้งานอยู่" ? "#198754" : "#dc3545",
                      }}
                    >
                      {item.userStatus}
                    </span>
                  </td>
                  <td>
                    <a
                      href={`/users/${item.userid}`}
                      className="btn btn-sm btn-success me-2"
                    >
                      ดูข้อมูล
                    </a>
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

export default User;
