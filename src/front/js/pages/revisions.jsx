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
            <h1 className='text-center'>Revisions {project && project.title}</h1>
            <button onClick={handleClick} className='ms-5 btn btn-outline-dark version'>Add Revision </button>
            <div>
                {project && project.songs.map((song) => (
                    <div>
                        <div className='container d-flex projectcontainer border my-2 col-8 justify-content-between'>
                            <div> <img src={song.cover_url} className="projectimage ms-2" ></img>
                            </div>
                            <div className="text-start"><h2 className='projectname'> {song.title} </h2></div>
                            <div>
                                <div className='text-end'>{}</div></div>
                                <div className="">

                            <div className='mt-1 text-end'><button type="button" className='btn btn-outline-dark openbutton' onClick={() => goToSong(song.id)} >open</button></div>
                            <button className="fas fa-trash border border-0 bg-transparent text-center" onClick={() => actions.deleteSong(song.id)}></button>
                        </div>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}


