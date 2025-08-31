import React, { useEffect, useState } from "react";
import axios from "axios";
import type { IDistrict, IPage, IProvince, IRegister, IRole, ISubdistrict } from "../../Interface/IAuth";

const Register: React.FC <IPage> = ({ setPage }) => {
  const today = new Date();
  const minAgeDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

  const [form, setForm] = useState<IRegister>({
    userName: "",
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

  const [role, setRole] = useState<IRole[]>([]);
  const [province, setProvince] = useState<IProvince[]>([]);
  const [distric, setDistric] = useState<IDistrict[]>([]);
  const [subdistrict, setSubdistrict] = useState<ISubdistrict[]>([]);
  const [massage, setMassage] = useState("")

  useEffect(() => {
    const getRole = async () => {
      try {
        const response = await axios.get<IRole[]>("https://localhost:7092/api/Roles");
        if (response.status === 200) {
          const clientRoles = response.data.filter(
            (r) => r.rolename === "ลูกค้า"
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
      } else {
        setMassage(response.data.message)
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
          {massage && <label style={{color:'#dc3545'}}>{massage}</label>}
          <div className="mb-3">
            <label>ชื่อผู้ใช้</label>
            <input
              type="text"
              className="form-control"
              value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
              placeholder="กรอก ชื่อผู้ใช้"
            />
          </div>

          <div className="mb-3">
            <label>รหัสผ่าน</label>
            <input
              type="password"
              className="form-control"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="กรอก รหัสผ่าน"
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label>ชื่อ</label>
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

            <div className="col-md-6 mb-3">
              <label>นามสกุล</label>
              <input
                type="text"
                className="form-control"
                value={form.lastname}
                onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                placeholder="กรอก นามสกุล"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label>วัน / เดือน / ปี เกิด</label>
              <input
                type="date"
                className="form-control"
                value={form.birthdate}
                max={minAgeDate}
                onChange={(e) =>
                  setForm({ ...form, birthdate: e.target.value })
                }
                placeholder="วัน/เดือน/ปี เกิด"
              />
              {!isBirthdateValid && form.birthdate && (
              <small style={{color:'#dc3545'}}>
                ผู้สมัครต้องมีอายุอย่างน้อย 18 ปี
              </small>
            )}
            </div>

            <div className="col-md-6 mt-2">
              <label>เพศ</label>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  value={"0"}
                  checked={form.gender === "0"}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                />
                <label className="px-2">ชาย</label>
              </div>

              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  value={"1"}
                  checked={form.gender === "1"}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                />
                <label className="px-2">หญิง</label>
              </div>
              
            </div>
          </div>

          <div className="mb-3">
            <label>อีเมล</label>
            <input
              type="email"
              className="form-control"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="กรอก อีเมล"
            />
            {!isEmailValid && form.email && (
              <small style={{color:'#dc3545'}}>
                ต้องเป็นอีเมล Gmail เท่านั้น
              </small>
            )}
          </div>

          <div className="mb-3 mt-3">
            <label>โทรศัพท์</label>
            <input
              type="tel"
              className="form-control"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="กรอก หมายเลขโทรศัพท์"
            />
            {!isPhoneValid && form.phone && (
              <small style={{color:'#dc3545'}}>
                หมายเลขโทรศัพท์ต้องขึ้นต้นด้วย 0 และมี 10 หลัก
              </small>
            )}
          </div>

          <label>ที่อยู่</label>
          <textarea
            className="form-control"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="กรอก บ้านเลขที่,ซอย,หมู่,ถนน"
          />

          <div className="mb-3 mt-3">
            <div className="row">
              <div className="col-md-3 mb-3">
                <label>จังหวัด</label>
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
              <div className="col-md-3 mb-3">
                <label>เขต/อำเภอ</label>
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
              <div className="col-md-3 mb-3">
                <label>แขวง/ตำบล</label>
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
              <div className="col-md-3 mb-3">
                <label>รหัสไปรษณีย์</label>
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
              สมัครสมาชิก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
