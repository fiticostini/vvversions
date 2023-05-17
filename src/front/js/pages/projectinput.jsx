import React, { useState, useContext } from "react";
import addimage from "../../img/addimage.png";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import VVVERSIONSLOGONEGROMOBILE from "../../img/VVVERSIONSLOGONEGROMOBILE.png";

export const ProjectInput = () => {
  const [projects, setProjects] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    const response = actions.logout();
    if (response) navigate("/");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addProject = () => {
    if (inputValue.trim() !== "") {
      //setProjects([...projects, inputValue]);
      actions.createProject({ title: inputValue });
      setInputValue("");
    }
  };
  // const removeProject = (index) => {
  //   setProjects(projects.filter((_, i) => i !== index));
  // };

  const handleClick = (id) => {
    navigate(`/revisions/${id}`);
  };

  return (
    <div>
      <div className="mt-4 d-flex justify-content-between">
        <div>
          <div className="">
            <Link to="/">
              <img src={VVVERSIONSLOGONEGROMOBILE} className="back2 p-2"></img>
            </Link>
          </div>
        </div>

        <div className="d-flex">
          <span className="text-end artistheader text-black me-5 mt-2 fs-2">
            {store.artistName}
          </span>
          <button
            onClick={handleLogout}
            className="border border-0 bg-black botonlogout  text-danger "
          >
            Log out
          </button>
        </div>
      </div>
      <div className=" p-5 text-center">
        <input
          type="text"
          placeholder="    name"
          value={inputValue}
          onChange={handleInputChange}
          className="placeholder2 me-2"
        />
        <button className="btn version" onClick={addProject}>
          add a project
        </button>
        {store.projects.map((project, index) => (
          <div className="container d-flex projectcontainer my-3 col-8 justify-content-between">
            <div className="d-flex">
              <div>
                {" "}
                <img
                  src={
                    project.songs.length > 0
                      ? project.songs[project.songs.length - 1].cover_url
                      : addimage
                  }
                  className="projectimage ms-2"
                ></img>
              </div>
              <div>
                <div className="text-start">
                  <h2 className="projectname">{project.title} </h2>
                </div>
                <div>
                  <div className="text-start titlesong">title song </div>
                </div>
                <div className="">
                  <div className="">
                    <button onClick={() => actions.createVersion(project.id)} type="button" className="newversion p-2 text-white">
                      new version
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-end me-4">
              <div className="text-end date">
                {" "}
                <p>{project.version_date}</p>{" "}
              </div>
              <div className="version">
                <p>version {project.version} </p>
              </div>
              <div>
                {project.songs.length == 0 ? (
                  <Link to={`/addsong/${project.id}`}>
                    {" "}
                    <div className="mt-1">
                      <button
                        type="button"
                        className="addfiles btn btn-outline-dark"
                      >
                        add files
                      </button>
                    </div>{" "}
                  </Link>
                ) : (
                  <div className="mt-1 text-end">
                    <button
                      type="button"
                      className="btn btn-outline-dark openbutton"
                      onClick={() => handleClick(project.id)}
                    >
                      open revisions
                    </button>
                  </div>
                )}

                <button
                  className="deleteproject text-danger"
                  onClick={() => actions.deleteProject(project.id)}
                >
                  delete project
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
