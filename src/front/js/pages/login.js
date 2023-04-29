import React, {useState, useContext} from "react";
import { Context } from "../store/appContext"; 
import { useNavigate } from "react-router-dom";



const Login = () => {
    const navigate = useNavigate();
    const{store, actions} = useContext(Context)
    const [loginData, setLoginData] = useState({"email":"", "password":""});
    const handleChange = (event) => {
        setLoginData({...loginData, [event.target.name]:event.target.value});
    };

    const redirectToMainPages = () => {
      console.log("redireccionamos al main");
      navigate("/");
    };
    const handleSubmit = (event) => {
      event.preventDefault()
      console.log("me diste click");
      actions.loginFirst(loginData.email, loginData.password);
      
    };
  return (

    <div className="container">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input 
          name="email"
          value={loginData.email}
          onChange = {(event) => handleChange(event)}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
          name="password"
          value={loginData.password}
          onChange = {(event) => handleChange(event)}
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          />
        </div>

        <button  type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
