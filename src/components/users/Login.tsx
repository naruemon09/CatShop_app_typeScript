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
      if (response.data.isSuceess === true) {
        setToken(response.data.token)
        setUsername(response.data.userName)
        navigate(-1)
      } else {
        swal("Oops...", response.data.userName, "error");
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
          </div>
        </div>
      </div>
  );
};

export default Login;
