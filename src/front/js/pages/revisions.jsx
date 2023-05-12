import React, { useState } from 'react';
import addimage from "../../img/addimage.png";
import { useNavigate, Link } from "react-router-dom";

export function Revisions() {
    const [divs, setDivs] = useState([]);

    const handleClick = () => {
        const newDiv = <div key={divs.length}> revision 1.{divs.length + 1}</div>;
        setDivs([...divs, newDiv]);
    };

    const navigate = useNavigate()

    return (
        <div>
            <h1 className='text-center'>revisions</h1>
            <button onClick={handleClick} className='ms-5 btn btn-outline-dark version'>Add Revision </button>
            <div>
                {divs.map((div) => (
                    <div>
                        <div className='container d-flex projectcontainer border my-2 col-8 justify-content-between'>
                            <div> <img src={addimage} className="projectimage ms-2" ></img>
                            </div>
                            <div className="text-start"><h2 className='projectname'> name{} </h2></div>
                            <div>
                                <div className='text-end'>{div}</div></div>
                                <div className="">

                            <Link to="/addsong">  <div className='mt-1'><button type="button" className='addfiles btn btn-outline-dark'>add files</button></div> </Link>
                            <div className='mt-1 text-end'><button type="button" className='btn btn-outline-dark openbutton' onClick={handleClick} >open</button></div>
                            <button className="fas fa-trash border border-0 bg-transparent text-center" onClick={() => removeProject(index)}></button>
                        </div>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}


