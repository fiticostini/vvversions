import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const redirectToMainPages = () => {
    console.log("redireccionamos al main");
    navigate("/");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("me diste click");
    if (loginData.email !== "" || loginData.password != "") {
      const response = await actions.loginFirst(loginData.email, loginData.password);
      console.log(response);
      if (response)  {
        navigate("/main");
      } else {
        alert("Credenciales invalidas");
      }
    }
  };

  useEffect(() => {
    if (store.token && store.token !== null ) navigate("/main")
  }, [store.token])
  return (
    <div className="container col-6 border bg-light border-black p-5 mt-5">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            name="email"
            value={loginData.email}
            onChange={(event) => handleChange(event)}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            value={loginData.password}
            onChange={(event) => handleChange(event)}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        
          <button type="submit" className="btn btn-primary">
        
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
