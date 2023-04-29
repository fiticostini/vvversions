import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    artistname: "",
    password: "",
    role: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
  }


  function handleChange(evt) {
    const { target } = evt;
    const { name, value } = target;
    console.log(handleChange);

    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);
  }
  

  return (
    <div className="d-flex">
      <div className="form">
        <div className="ms-23">
        <form onSubmit={handleSubmit}>
          {" "}
          <h2 className="text-center p-3 registerlogo">REGISTER</h2>
          <label htmlFor="email"></label>
          <input
            id="username"
            name="username"
            type="text"
            value={values.username}
            onChange={handleChange}
            placeholder="Username"
            className="username"
          />
          <label htmlFor="password"></label>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Set Password"
            className="password"
          />
          <label htmlFor="email"></label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            className="email"
          />
          <input
            id="artistname"
            name="artistname"
            type="text"
            value={values.artistname}
            onChange={handleChange}
            placeholder="Name Of Band/Soloist/Artist Collective"
            className="nameofband"
          />
          <select name="role" onChange={handleChange} className="form-select select" aria-label="Default select example">
            <option defaultValue selected>Role</option>
            <option value="1">Musician/Producer</option>
            <option value="2">Manager/Representative/Other</option>
            
          </select>
          <div className="d-flex justify-content-center">
            <button type="submit" className="submit text-white">
              Submit
            </button>
          </div>
        </form>
        </div>
      </div>
      <div className="publicity"> </div>
    </div>
  );
};
