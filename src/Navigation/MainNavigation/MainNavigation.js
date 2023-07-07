import  React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import MainHeader from "../MainHeader/MainHeader";  
import './MainNavigation.css'
import NewToDoListForm from "../../Components/NewToDoListForm/NewToDoListForm";
import { AuthContext } from "../../shared/context/AuthContext";

const MainNavigation = props=> {

    const [showNewToDoListModal,setNewToDoListModal] =useState(false)
    const openNewToDoListModal = () =>setNewToDoListModal(true)
    const closeNewToDoListModal = () =>setNewToDoListModal(false)
    const auth = useContext(AuthContext)

    return (
        <React.Fragment>
           
        <NewToDoListForm show={showNewToDoListModal} closeNewToDoListModal={closeNewToDoListModal}/>
        <MainHeader >
            <button className="main-navigation__menu-btn">
                <span/>
                <span/>
                <span/>
            </button>
            <h1 className="main-navigation__title">
                <Link to="/">To Do List </Link>
            </h1>
            <h5 style={{alignContent:"center"}}>userId: {auth.userId?.slice(0, 3)} token: {auth.token?.slice(0, 3)}</h5>

            <nav>
                ...
            </nav>
            {auth.isLoggedIn && <button onClick={openNewToDoListModal} className="main-navigation__new-btn">
                New          
            </button>}
        </MainHeader>
        </React.Fragment>
    )


}

export default MainNavigation