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
  }, [user]);

  const handleDelete = async (userid: string) => {
    try {
      const response = await axios.put(
        `https://localhost:7092/api/Users/UpdateUserStatusById/${userid}`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">การจัดการพนักงาน</h2>
        <div>
          <a href="/addrole" className="btn btn-warning me-2">
            + เพิ่มตำแหน่งงาน
          </a>
          <a href="/registerAdmin" className="btn btn-warning">
            + เพิ่มผู้ใช้ใหม่ (พนักงาน)
          </a>
        </div>
      </div>
      <div className="card bg-white p-4">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>ชื่อผู้ใช้</th>
                <th>เพศ</th>
                <th>อีเมล</th>
                <th>โทรศัพท์</th>
                <th>ที่อยู่</th>
                <th>ตำแหน่งงาน</th>
                <th>สถานะ</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
            {user.map((item, index) => (
              <tbody>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.gender === "0" ? "ชาย" : "หญิง"}</td>
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
                      item.userStatus === "ใช้งานอยู่"
                        ? "bg-success "
                        : "bg-danger"
                    }`}
                      style={{
                        color:
                          item.userStatus === "ใช้งานอยู่"
                            ? "#198754"
                            : "#dc3545",
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
                      ดูข้อมูล
                    </a>
                    <a
                      href={`/updateAdmin/${item.userid}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      แก้ไข
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.userid)}
                      className="btn btn-sm btn-danger"
                    >
                      ลบ
                    </button>
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
