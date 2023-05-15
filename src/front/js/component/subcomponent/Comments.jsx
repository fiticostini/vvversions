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
        params.projectid
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
    actions.getComments(params.id);
    actions.getComments(params.projectid)
  }, []);

  return (

    <div className="container">
      <span>add your comment</span>
      <div>{error !=="" && <span>Llene el comentario</span>}</div>
      <div className="comment-form-row">
        <input
          value={commentBody}
          onChange={(event) => handleCommentChange(event)}
          className="message-input"
          placeholder="what do you think of this song?"
        ></input>
        <button onClick={(event) => onComment(event)} className="btn">
          Comment
        </button>
      </div>
      <div>
        {store.comments.length > 0 ? store.comments.map((comment) => (
          <div key={comment.id} className="comment container-comment">
            <div className="header">
              <span >{comment.name}</span>
              <span className="date">{comment.start_date}</span>
            </div>
            <div className="message">{comment.content}</div>

          </div>
        ))
        :<div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>}
      </div>

      <p>Comments</p>
      
      <div className="comment container bg-white">
        <div className="header">
          
          <span className="date"></span>
        </div>
        <div className="message">
        </div>
        <div className="footer">
        
        </div>
      </div>
    </div>
  );
};

export default Comments;
