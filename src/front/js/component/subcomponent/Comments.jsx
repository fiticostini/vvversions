import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/CommentStyles.css";
import { useParams } from "react-router-dom";

// const dummyComments = [];

const Comments = () => {
  // const [comments, setComments] = useState(dummyComments); // In our real application, dummyComments will be coming from our API
  const [commentBody, setCommentBody] = useState("");
  const { store, actions } = useContext(Context);
  const [error, setError] = useState("");

  const params = useParams();
  console.log(params);

  const handleCommentChange = (event) => {
    setCommentBody(event.target.value);
  };

  const onComment = (event) => {



    if (commentBody !== "") {
      actions.addComments(
        {
          content: commentBody,
          start_date: "10/5/2023",
        },
        params.songid,
      );
      // const newComments = [...comments, newComment];
      // setComments(newComments); // en vez de llamar al set comments, llamar a la funcion en el flux para nadir el comentario
      setCommentBody(""); // Este dejarlo
      setError("");
    } else {
      setError("No puedes comentar vacio")
    }
  };

  console.log(store.username)

const deleteComment= () => {
  
};

  useEffect(() => {
    actions.getComments(params.songid);
  }, []);

  // const [song, setSong] = useState();
  // //const song = store.song.find(element => element.id == params.id)

  // useEffect(() => {
  //   if (store.song.length == 0) return
  //   const project = store.projects.find((project) => params.projectid == project.id)
  //   const currentSong = project.songs.find((song) => params.songid == song.id)
  //   setSong(currentSong)
  //   console.log(currentSong);

  // }, [store.song])

  return (

    <div className="container">
     <div className="p-3"> <i>add your comment</i></div>
      <div>{error !=="" && <span>Llene el comentario</span>}</div>
      <div className="comment-form-row">
        <input
          value={commentBody}
          onChange={(event) => handleCommentChange(event)}
          className="message-input"
          placeholder="   what do you think of this song?"
        ></input>
        <button onClick={(event) => onComment(event)} className="btn">
          Comment
        </button>
      </div>
      <div>
        {store.comments.length > 0 ? store.comments.map((comment) => (
          <div key={comment.id} className="comment container bg-white text-start my-1">
            <div className="header mt-1 ms-2">
            <span >{comment.name}</span>
              <span className="date">{comment.start_date}</span>
              
            </div>
            <div className="message mb-2">{comment.content}</div>

          </div>
        ))
        :<div className="text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>}
      </div>

      <p className="mt-1 bg-white"></p>
      
     
        <div className="header bg-white">
          
          <span className="date bg-white"></span>
        </div>
        <div className="message">
        </div>
        <div className="footer">
        
        </div>
      
    </div>
  );
};

export default Comments;
