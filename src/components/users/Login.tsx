import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { ILogin } from "../../Interface/IAuth";
import Store from "../store/Store";
import swal from 'sweetalert';

const Login: React.FC = () => {

  const {setToken , setUsername} = Store();
  const navigate = useNavigate();

  const [user, setUser] = useState<ILogin>({
    username: "",
    password: ""
  })

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        'https://localhost:7092/api/Logins/LoginUser',
        user
      );
      console.log(response)
      if (response.data.isSuceess === true && response.data.roleName == "ลูกค้า") {
        setToken(response.data.token)
        setUsername(response.data.userName)
        navigate("/")
      } else {
        swal("เกิดข้อผิกพลาด", response.data.message, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className="container">
        <div className="row">
          <div className="form-input col-lg-12 my-4">
            <div className="mb-3">
              <label>ชื่อผู้ใช้</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={user.username}
                placeholder="กรอกชื่อผู้ใช้"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label>รหัสผ่าน</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={user.password}
                placeholder="กรอกรหัสผ่าน"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="d-grid gap-2">
              <button type="button" className="btn btn-dark btn-lg rounded-1" onClick={() => { onSubmit() }}>
                เข้าสู่ระบบ
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
