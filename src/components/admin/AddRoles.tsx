import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IRole } from "../../Interface/IAuth";
import axios from "axios";
import Store from "../store/Store";


const AddRoles: React.FC = () => {
  const navigate = useNavigate();
  const {token} = Store();
  const [role, setRole] = useState<IRole>({
    rolename: "",
    roleId:""
  });

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7092/api/Roles/CreateRole",
        role,
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

  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold">Add Position</h2>
      <div className="card">
        <div className="card bg-white p-4">
          <div className="m-4">
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Position</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={role.rolename}
                  onChange={(e) =>
                    setRole({ ...role, rolename: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="text-end">
                <button
                  className="btn btn-success me-2"
                  type="button"
                  onClick={() => {
                    onSubmit();
                  }}
                >
                  Save
                </button>
                <a href="/breeds" className="btn btn-danger">
                  Cancle
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoles;
