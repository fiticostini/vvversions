import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import ProyectRevision from "../component/ProyectRevision.jsx";
import VVVERSIONSLOGONEGRO from "../../img/VVVERSIONSLOGONEGRO.png";
import { Link, useParams } from "react-router-dom";


export const SongRevision = () => {
  const { store } = useContext(Context);
  const {projectid, songid} = useParams();
  const [song, setSong] = useState({});
  useEffect(()=> {
    const getSongById = async(song_id) => {
      const response = await fetch(`${process.env.BACKEND_URL}/api/song-byid/${song_id}`, {
        headers: {
          "Authorization": `Bearer ${store.token}`,
        }
      })
      if (response.ok) {
        const body = await response.json()
        setSong(body.result)
      }
    }
    getSongById(songid)
  },[])

  return (
    <div className="p-5 text-end">
      <h3>{store.artistName}</h3>
      <h3>{song.title}</h3>
      
      <ProyectRevision />


      <div className="text-center">
        <img src={VVVERSIONSLOGONEGRO} className="col-2"></img>
        <div className="">
          <Link to={`/revisions/${projectid}`}>
            <p className="back2 p-2">BACK</p>
          </Link>
        </div>  
      </div>
    </div>
  );
};