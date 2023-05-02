import React, {useContext} from "react";
import { Context } from "../store/appContext";



export const Main = () => {
    const {store} = useContext(Context)
return (
    <div> 

        <h1>{store.artistName}</h1>
        <div className="container sticky-top">
<<<<<<< HEAD
        <div className="col-8 bg-warning"> hola</div>
=======
        

        <div className="col-8 bg-warning"> hola
        </div>
>>>>>>> 6a228f2a79c6f359882bfba1a55060e7615e875e
        <div className="col-8 bg-dark">hola2</div>
        <div className="col-8 bg-danger">hola3</div>
        <div className="col-8 bg-success">hola3</div>
        </div>
        

        
    </div>
    
)

} 