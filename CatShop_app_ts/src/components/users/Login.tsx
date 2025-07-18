import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { ILogin } from "../../Interface/IAuth";

const Login: React.FC = () => {

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
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("username", response.data.userName)
        console.log(response)
        navigate('/')
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <section
    //   className="vh-100 d-flex justify-content-center align-items-center"
    //   style={{ background: 'url("./src/images/background-img.png")' }}
    // >
      <div className="container">
        <div className="row">
          <div className="form-input col-lg-12 my-4">
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
              <button type="button" className="btn btn-dark btn-lg rounded-1" onClick={() => { onSubmit() }}>
                Login it now
              </button>
            </div>
            {/* <div className="mt-4 text-center">
              <p className="mb-0 fw-normal">Don't have an account? 
                <a href="/register" className="fw-bold text-primary"> Sign Up</a>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    // </section>
  );
};

export default Login;
