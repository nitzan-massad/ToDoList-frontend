import React,{useContext} from "react";

import "./Fotter.css"
import { AuthContext } from "../../shared/context/AuthContext";


const Fotter = props =>{

    const authContext = useContext(AuthContext)

    return(
        <div className="footer">
            {/* {authContext.isLoggedIn &&
            <button className="fotter-logout-btn" onClick={authContext.logout}>Logout</button>
            } */}
        </div>
    )
}

export default Fotter