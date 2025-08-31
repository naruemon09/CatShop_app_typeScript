import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type {
  IDistrict,
  IProvince,
  IRegister,
  IRole,
  ISubdistrict,
} from "../../../Interface/IAuth";
import Store from "../../store/Store";

const RegisterAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { token } = Store();
  const [role, setRole] = useState<IRole[]>([]);
  const [province, setProvince] = useState<IProvince[]>([]);
  const [distric, setDistric] = useState<IDistrict[]>([]);
  const [subdistrict, setSubdistrict] = useState<ISubdistrict[]>([]);
  const today = new Date();
  const minAgeDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];
  const [form, setForm] = useState<IRegister>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    birthdate: minAgeDate,
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

  const [selectedRoles, setSelectedRoles] = useState<IRole[]>([]);
  const [massage, setMassage] = useState("");

  useEffect(() => {
    const getRole = async () => {
      try {
        const response = await axios.get("https://localhost:7092/api/Roles");
        if (response.status === 200) {
          setRole(response.data);
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

  const isPhoneValid = /^0[0-9]{9}$/.test(form.phone);
  const isEmailValid = /^[\w.+-]+@gmail\.com$/.test(form.email);
  const isBirthdateValid = (() => {
    if (!form.birthdate) return true;
    const birth = new Date(form.birthdate);
    const today = new Date();
    const age =
      today.getFullYear() -
      birth.getFullYear() -
      (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
        ? 1
        : 0);
    return age >= 18;
  })();

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
      if (response.data.isSuceess === true) {
        navigate("/userAdmin");
      } else {
        setMassage(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const roleId = event.target.value;
    const selectedRole = role.find((r: IRole) => r.roleid === roleId);

    if (selectedRole && !selectedRoles.some((r) => r.roleid === roleId)) {
      setSelectedRoles((prev) => [...prev, selectedRole]);
    }
  };

  const removeRole = (item: IRole) => {
    setSelectedRoles(selectedRoles.filter((r) => r.roleid !== item.roleid));
  };

  const selectProvince = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
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
    setForm({ ...form, districtId: Number(item) });
    const subdistricts = await axios.get<ISubdistrict[]>(
      "https://localhost:7092/api/Address/GetSubdistrict"
    );
    console.log(subdistricts);
    const findSubdistrict = subdistricts.data.filter(
      (r) => r.districtId === Number(item)
    );
    setSubdistrict(findSubdistrict);
  };

  const selectSubdistrict = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const item = event.target.value;
    const findZipcode = subdistrict.find((r) => r.id === Number(item))!;
    setForm({
      ...form,
      subdistrictId: findZipcode.id,
      zipcode: findZipcode.zipCode,
    });
  };

  return (
    <div
      className="container-fluid p-4 vh-100"
      style={{ height: "100%", overflow: "hidden", overflowY: "auto" }}
    >
      <h2 className="fw-bold">เพิ่มผู้ใช้ใหม่ (พนักงาน)</h2>
      <div className="card">
        <div className="card bg-white p-4">
          <div className="m-4">
            {massage && <label style={{ color: "#dc3545" }}>{massage}</label>}
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">ชื่อผู้ใช้</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  placeholder="กรอก ชื่อผู้ใช้"
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">รหัสผ่าน</label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="กรอก รหัสผ่าน"
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">ชื่อ</label>
              <div className="col-md-5 mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={form.firstname}
                  onChange={(e) =>
                    setForm({ ...form, firstname: e.target.value })
                  }
                  placeholder="กรอก ชื่อ"
                />
              </div>

              <div className="col-md-5 mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={form.lastname}
                  onChange={(e) =>
                    setForm({ ...form, lastname: e.target.value })
                  }
                  placeholder="กรอก นามสกุล"
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">
                วัน / เดือน / ปี เกิด
              </label>
              <div className="col-md-10 mb-3">
                <input
                  type="date"
                  className="form-control"
                  value={form.birthdate}
                  onChange={(e) =>
                    setForm({ ...form, birthdate: e.target.value })
                  }
                  placeholder="วัน/เดือน/ปี เกิด"
                />
                {!isBirthdateValid && form.birthdate && (
                  <small style={{ color: "#dc3545" }}>
                    ผู้สมัครต้องมีอายุอย่างน้อย 18 ปี
                  </small>
                )}
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">เพศ</label>
              <div className="col-md-10 mb-3">
                <input
                  type="radio"
                  value={"0"}
                  checked={form.gender === "0"}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                />
                <label className="px-2">ชาย</label>

                <input
                  type="radio"
                  value={"1"}
                  checked={form.gender === "1"}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                />
                <label className="px-2">หญิง</label>
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">อีเมล</label>
              <div className="col-md-10 mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="กรอก อีเมล"
                />
                {!isEmailValid && form.email && (
                  <small style={{ color: "#dc3545" }}>
                    ต้องเป็นอีเมล Gmail เท่านั้น
                  </small>
                )}
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">โทรศัพท์</label>
              <div className="col-md-10 mb-3">
                <input
                  type="tel"
                  className="form-control form-control-lg"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="กรอก หมายเลขโทรศัพท์"
                />
                {!isPhoneValid && form.phone && (
                  <small style={{ color: "#dc3545" }}>
                    หมายเลขโทรศัพท์ต้องขึ้นต้นด้วย 0 และมี 10 หลัก
                  </small>
                )}
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">ที่อยู่</label>
              <div className="col-md-10 mb-3">
                <textarea
                  className="form-control form-control-lg"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  placeholder="กรอก บ้านเลขที่,ซอย,หมู่,ถนน"
                />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col offset-md-2 mb-3">
                <select
                  className="form-control dropdown-toggle"
                  onChange={(e) => selectProvince(e)}
                >
                  <option className="dropdown-item">เลือก จังหวัด</option>

                  {province.map((item, index) => (
                    <option
                      key={index}
                      className="dropdown-item"
                      value={item.id}
                    >
                      {item.nameInThai}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col mb-3">
                <select
                  className="form-control dropdown-toggle"
                  onChange={(e) => selectDistric(e)}
                >
                  <option className="dropdown-item">เลือก เขต/อำเภอ</option>

                  {distric.map((item, index) => (
                    <option
                      key={index}
                      className="dropdown-item"
                      value={item.id}
                    >
                      {item.nameInThai}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col mb-3">
                <select
                  className="form-control dropdown-toggle"
                  onChange={(e) => selectSubdistrict(e)}
                >
                  <option className="dropdown-item">เลือก แขวง/ตำบล</option>
                  {subdistrict.map((item, index) => (
                    <option
                      key={index}
                      className="dropdown-item"
                      value={item.id}
                    >
                      {item.nameInThai}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={form.zipcode}
                  readOnly
                  placeholder="รหัสไปรษณีย์"
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
                      ---เลือกตำแหน่งงาน---
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

            <div className="row">
              <div className="text-end">
                <button
                  className="btn btn-success me-2"
                  type="button"
                  onClick={() => {
                    onSubmit();
                  }}
                >
                  บันทึก
                </button>
                <a href="/userAdmin" className="btn btn-danger">
                  ยกเลิก
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdmin;
