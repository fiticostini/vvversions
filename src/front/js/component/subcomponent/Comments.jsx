import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/CommentStyles.css";
import { useParams } from "react-router-dom";

const dummyComments = [];

const Comments = () => {
  const { store, actions } = useContext(Context);
  const [comments, setComments] = useState(dummyComments); // In our real application, dummyComments will be coming from our API
  const [commentBody, setCommentBody] = useState("");


  const params = useParams();
  console.log(params)

  const handleCommentChange = (event) => {
    setCommentBody(event.target.value);
  };

  const onComment = (event) => {
    if (commentBody.trim()) {
      const newComment = {
        content : commentBody,
      };

      const newComments = [...comments, newComment];
      setComments(newComments); // en vez de llamar al set comments, llamar a la funcion en el flux para nadir el comentario
      setCommentBody(""); // Este dejarlo
    }
  };

  useEffect( () =>{
    actions.getComments(params.id)

  }, [])

  return (
    <div className="container">
      <span>React Nested Comments</span>
      <div className="comment-form-row">
        <input
          value={commentBody}
          onChange={(event) => handleCommentChange(event)}
          className="message-input"
          placeholder="What are your thoughts?"
        ></input>
        <button onClick={(event) => onComment(event)} className="btn">
          Comment
        </button>
      </div>
      <div>
        {store.comments.map((comment) => (
          <div className="comment container">{comment.content}</div>
        ))}
      </div>

      <h3>MODELO DE COMENTARIO:</h3>
      <div className="comment container">
        <div className="header">
          <span className="name">{store.username}</span>
          <span className="date">5/9/2023</span>
        </div>
        <div className="message">Tremenda cancion</div>
        <div className="footer"></div>
      </div>
    </div>
  );
};

export default Comments;
