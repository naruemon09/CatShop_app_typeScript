import React, { useEffect, useState } from "react";
import axios from "axios";
import type { IDistrict, IPage, IProvince, IRegister, IRole, ISubdistrict } from "../../Interface/IAuth";

const Register: React.FC <IPage> = ({ setPage }) => {

  const [form, setForm] = useState<IRegister>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    birthdate: "",
    phone: "",
    address: "",
    provinceId: 0,
    districtId: 0,
    subdistrictId: 0,
    zipcode: 0,
    password: "",
    gender: "",
    userStatus: "",
    roleList: [],
  });

  const [role, setRole] = useState<IRole[]>([]);
  const [province, setProvince] = useState<IProvince[]>([]);
  const [distric, setDistric] = useState<IDistrict[]>([]);
  const [subdistrict, setSubdistrict] = useState<ISubdistrict[]>([]);

  useEffect(() => {
    const getRole = async () => {
      try {
        const response = await axios.get<IRole[]>("https://localhost:7092/api/Roles");
        if (response.status === 200) {
          const clientRoles = response.data.filter(
            (r) => r.rolename === "Client"
          );
          setRole(clientRoles);
        }
        const provinces = await axios.get(
          "https://localhost:7092/api/Address/GetProvince"
        );
        if (provinces.status === 200) {
          setProvince(provinces.data);
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
        RoleList: role,
      };
      console.log("formData",formData);
      const response = await axios.post(
        "https://localhost:7092/api/Users/CreateUser",
        formData
      );
      console.log(response);
      if (response.data.isSuceess === true) {
        setPage?.(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectProvince = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const item = event.target.value;
    setForm({ ...form, provinceId: Number(item) });
    const districs = await axios.get<IDistrict[]>(
      "https://localhost:7092/api/Address/GetDistrict"
    );
    const findDistrics = districs.data.filter(
      (r) => r.provinceId === Number(item)
    );
    setDistric(findDistrics);
  };

  const selectDistric = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const item = event.target.value;
    setForm({ ...form, districtId: Number(item)});
    const subdistricts = await axios.get<ISubdistrict[]>(
      "https://localhost:7092/api/Address/GetSubdistrict"
    );
    const findSubdistrict = subdistricts.data.filter(
      (r) => r.districtId === Number(item)
    );
    setSubdistrict(findSubdistrict);
  };

  const selectSubdistrict = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const item = event.target.value;
    const findZipcode = subdistrict.find((r) => r.id === Number(item))!;
    setForm({
      ...form,
      subdistrictId: findZipcode.id,
      zipcode: findZipcode.zipCode,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="form-input col-lg-12 my-4">
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Enter Your Username"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter Your Password"
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
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

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                value={form.lastname}
                onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                placeholder="Enter Your Lastname"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
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

            <div className="col-md-6 mt-2">
              <label className="form-control-lg">Gender :</label>
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

          <div className="mb-3">
            <input
              type="email"
              className="form-control form-control-lg"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter Your Email Address"
            />
          </div>

          <div className="mb-3 mt-3">
            <input
              type="tel"
              className="form-control form-control-lg"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Enter Your Phone"
            />
          </div>

          <textarea
            className="form-control form-control-lg"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Enter Your Address"
          />

          <div className="mb-3">
            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="col-sm-2 col-form-label">Provinces</label>
                <select
                  className="form-control dropdown-toggle"
                  onChange={(e) => selectProvince(e)}
                >
                  <option className="dropdown-item">Select Province</option>

                  {province.map((item, index) => (
                    <option
                      key={index}
                      className="dropdown-item"
                      value={item.id}
                    >
                      {item.nameInEnglish}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label className="col-sm-2 col-form-label">Distric</label>
                <select
                  className="form-control dropdown-toggle"
                  onChange={(e) => selectDistric(e)}
                >
                  <option className="dropdown-item">Select Distric</option>

                  {distric.map((item, index) => (
                    <option
                      key={index}
                      className="dropdown-item"
                      value={item.id}
                    >
                      {item.nameInEnglish}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label className="col-sm-2 col-form-label">Subdistrict</label>
                <select
                  className="form-control dropdown-toggle"
                  onChange={(e) => selectSubdistrict(e)}
                >
                  <option className="dropdown-item">Select Subdistrict</option>
                  {subdistrict.map((item, index) => (
                    <option
                      key={index}
                      className="dropdown-item"
                      value={item.id}
                    >
                      {item.nameInEnglish}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label className="col-sm-2 col-form-label">Zipcode</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.zipcode}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-dark btn-lg rounded-1"
              onClick={() => {
                onSubmit();
              }}
            >
              Register it now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
