import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import type { ILogin } from '../../Interface/IAuth';
import axios from 'axios';
import { useAuthStore } from '../store/Store';


const LoginAdmin: React.FC = () => {

  const {setToken} = useAuthStore();
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
      if (response.data.isSuceess === true) {
        setToken(response.data.token)
        navigate('/dashboard')
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
              Login<span className="text-primary"> Admin</span>
            </h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                name="username"
                value={user.username}
                placeholder="Enter Your Username"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control form-control-lg"
                name="password"
                value={user.password}
                placeholder="Enter Your Password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-dark btn-lg rounded-1" onClick={() => { onSubmit() }}>
                Login it now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginAdmin