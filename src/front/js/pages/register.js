import React from "react";




const Register = () => {
    return(
        
    <div className="container"> 
    <h1 className="text-center">Register</h1>   
    <form>
    <div className="mb-3">
    <label for="exampleInputFullname" className="form-label">Full Name</label>
    <input type="text" className="form-control" id="exampleInputFullname" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label for="exampleInputArtist" className="form-label">Artist Name</label>
    <input type="text" className="form-control" id="exampleInputArtist" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label for="exampleInputUsername" className="form-label">User Name</label>
    <input type="text" className="form-control" id="exampleInputUsername" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" />
  </div>
  

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>


    )
}




export default Register;