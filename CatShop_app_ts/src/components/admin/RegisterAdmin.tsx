import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { IRegister, IRole } from "../../Interface/IAuth";

const RegisterAdmin: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [role, setRole] = useState<IRole[]>([]);
  const [form, setForm] = useState<IRegister>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    birthdate: "",
    phone: "",
    address: "",
    password: "",
    gender: "",
    RoleList: [],
  });

  const [selectedRoles, setSelectedRoles] = useState<IRole[]>([]);

  useEffect(() => {
    const getRole = async () => {
      try {
        const response = await axios.get("https://localhost:7092/api/Roles");
        if (response.status === 200) {
          console.log(response);
          setRole(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRole();
  }, []);

  const onSubmit = async () => {
    try {
      const formData = {
        ...form,
        RoleList: selectedRoles,
      };
      console.log("user", formData);
      const response = await axios.post(
        "https://localhost:7092/api/Users/CreateUser",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data === "Create Success") {
        navigate("/userAdmin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    const roleId = event.target.value;
    const selectedRole = role.find((r) => r.roleid === roleId);

    if (selectedRole && !selectedRoles.some((r) => r.roleid === roleId)) {
      setSelectedRoles((prev) => [...prev, selectedRole]);
    }
  };

  const removeRole = (item: IRole) => {
    setSelectedRoles(selectedRoles.filter((r) => r.roleid !== item.roleid));
  };

  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold">Register Admin</h2>
      <div className="card">
        <div className="card bg-white p-4">
          <div className="m-4">
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Username</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  placeholder="Enter Your Username"
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Enter Your Password"
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Name</label>
              <div className="col-md-5 mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={form.firstname}
                  onChange={(e) =>
                    setForm({ ...form, firstname: e.target.value })
                  }
                  placeholder="Enter Your Firstname"
                />
              </div>

              <div className="col-md-5 mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={form.lastname}
                  onChange={(e) =>
                    setForm({ ...form, lastname: e.target.value })
                  }
                  placeholder="Enter Your Lastname"
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Birthdate</label>
              <div className="col-md-10 mb-3">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  value={form.birthdate}
                  onChange={(e) =>
                    setForm({ ...form, birthdate: e.target.value })
                  }
                  placeholder="birthdate"
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Gender</label>
              <div className="col-md-10 mb-3">
                <input
                  type="radio"
                  value={"0"}
                  checked={form.gender === "0"}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                />
                <label className="px-2">Male</label>

                <input
                  type="radio"
                  value={"1"}
                  checked={form.gender === "1"}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                />
                <label className="px-2">Female</label>
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Email</label>
              <div className="col-md-10 mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter Your Email Address"
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Phone</label>
              <div className="col-md-10 mb-3">
                <input
                  type="tel"
                  className="form-control form-control-lg"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Enter Your Phone"
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Address</label>
              <div className="col-md-10 mb-3">
                <textarea
                  className="form-control form-control-lg"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  placeholder="Enter Your Address"
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Position</label>
              <div className="col-md-6 mb-3">
                <div className="dropdown">
                  <select
                    className="form-control dropdown-toggle"
                    style={{ width: "auto" }}
                    onChange={(e) => addRole(e)}
                  >
                    <option className="dropdown-item">
                      ---Select Position---
                    </option>

                    {role.map((item, index) => (
                      <option
                        key={index}
                        className="dropdown-item"
                        value={item.roleid}
                      >
                        {item.rolename}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-3">
                  <table>
                    <tbody>
                      {selectedRoles.map((item, index) => (
                        <tr key={index}>
                          <td>{item.rolename}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => removeRole(item)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn btn-dark btn-lg rounded-1"
                onClick={onSubmit}
              >
                Register it now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdmin;
