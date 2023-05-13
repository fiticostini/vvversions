import React, { useState, useContext } from 'react';
import addimage from "../../img/addimage.png";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ProjectInput = () => {
  const [projects, setProjects] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const {store,actions} = useContext(Context);
 


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addProject = () => {
    if (inputValue.trim() !== '') {
      //setProjects([...projects, inputValue]);
      actions.createProject({title:inputValue})
      setInputValue('');
    }
  };
  // const removeProject = (index) => {
  //   setProjects(projects.filter((_, i) => i !== index));
  // };

  const handleClick = (id) => {
    navigate (`/revisions/${id}`);
  };

  const navigate = useNavigate()

  return (
    <div className='text-center p-5'>


      <input
        type="text"
        placeholder="    name"
        value={inputValue}
        onChange={handleInputChange}
        className='placeholder bg-white me-2'
      />
      <button className='btn btn-outline-dark version' onClick={addProject}>add a project</button>
      {store.projects.map((project, index) => (
        <div className='container d-flex projectcontainer border my-3 col-8 justify-content-between'>
          <div className='d-flex'>
            <div> <img src={addimage} className="projectimage ms-2" ></img> </div>
            <div >
              <div className="text-start"><h2 className='projectname'>{project.title} </h2></div>
              <div>
                <div className='text-start titlesong'>title song </div>
              </div>
              <div className='mt-1 text-start'>
                <div className=''><button type="button" className='btn btn-outline-dark newversion'>new version</button></div>
              </div>
            </div>
          </div>
          <div className='text-end mt-2 me-4'>
            <div className='mt-1 text-end date'> <p1>date DD/MM/YY </p1> </div>
            <div className='version'><p1>version {project.version} </p1></div>
            <div className="">

              <Link to={`/addsong/${project.id}`}>  <div className='mt-1'><button type="button" className='addfiles btn btn-outline-dark'>add files</button></div> </Link>
              <div className='mt-1 text-end'><button type="button" className='btn btn-outline-dark openbutton' onClick={() => handleClick(project.id)} >open</button></div>
              <button className="fas fa-trash border border-0 bg-transparent text-center" onClick={() => actions.deleteProject(project.id)}></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


