import React, { useState, useContext, useEffect } from 'react';
import addimage from "../../img/addimage.png";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Context } from '../store/appContext';

export function Revisions() {
    const [divs, setDivs] = useState([]);
    const [project, setProject] = useState ()
    const {store, actions} = useContext(Context)
    const params = useParams()
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/addsong/${params.id}`)
    };
    const goToSong = (songId) => {
        navigate(`/songrevision/${params.id}/${songId}`)
    }
    useEffect (() => {
        if (store.projects.length == 0) return
        const project = store.projects.find((project) => params.id == project.id)
        console.log(project);
        setProject(project)
    },[store.projects])
    return (
        <div>
            <h1 className='text-center mt-4'>Revisions of {project && project.title}</h1>
            <button onClick={handleClick} className='ms-5 btn btn-outline-dark version text-end'>Add Revision </button>
            <div>
                {project && project.songs.map((song) => (
                    <div className='container d-flex projectcontainer my-3 col-8 justify-content-between'>
                    <div className='d-flex'>
                      <div> <img src={song.cover_url} className="projectimage ms-2" ></img> </div>
                      <div >
                        <div className="text-start"><h2 className='projectname'>{project.title} </h2></div>
                        <div>
                          <div className='text-start titlesong'>title song </div>
                        </div>
                        <div className=''>
                          
                        </div>
                      </div>
                    </div>
                    <div className='text-end me-4'>
                      <div className='text-end date'> <p>date DD/MM/YY </p> </div>
                      <div className='version'><p>version {project.version} </p></div>
                      <div className="">
          
                        
                        <div className='mt-1 text-end'><button type="button" className='btn btn-outline-dark openbutton' onClick={() => goToSong(song.id)}  >open song</button></div>
                        <button className="deleteproject text-danger" onClick={() => actions.deleteSong(song.id)}>delete song</button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className=""><Link to="/projectinput"><p className="back2 p-2">BACK</p></Link></div>
        </div>
    );
}


