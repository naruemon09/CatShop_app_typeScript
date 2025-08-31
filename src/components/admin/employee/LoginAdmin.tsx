import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import type { ILogin } from '../../../Interface/IAuth';
import axios from 'axios';
import Store from '../../store/Store';

const LoginAdmin: React.FC = () => {

  const {setToken , setUsername} = Store();
  const navigate = useNavigate()

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
      console.log(response);
      if (response.data.isSuceess === true && response.data.rolename !== 'ลูกค้า') {
        setToken(response.data.token)
        setUsername(response.data.userName)
        navigate('/dashboard')
      } else {
        swal("Oops...", "Something went wrong!", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{ background: 'url("./src/images/background-img.png")' }}
    >
      <div className="container">
        <div className="row">
          <div className="offset-md-3 col-md-6 my-5">
            <h2 className="display-3 fw-normal text-center">
              เข้าสู่ระบบ<span className="text-primary"> พนักงาน</span>
            </h2>
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
              <button type="submit" className="btn btn-dark btn-lg rounded-1" onClick={() => { onSubmit() }}>
                เข้าสู่ระบบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginAdmin