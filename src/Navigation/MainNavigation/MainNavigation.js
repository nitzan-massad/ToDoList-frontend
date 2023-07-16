import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'

import MainHeader from '../MainHeader/MainHeader'
import './MainNavigation.css'
import NewToDoListForm from '../../Components/NewToDoListForm/NewToDoListForm'
import NavLinksSideDrwar from '../NavLinksSideDrawer/NavLinksSideDrawer'

import { AuthContext } from '../../shared/context/AuthContext'

const MainNavigation = props => {
  const [showNewToDoListModal, setNewToDoListModal] = useState(false)
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const auth = useContext(AuthContext)
  const openNewToDoListModal = () => setNewToDoListModal(true)
  const closeNewToDoListModal = () => setNewToDoListModal(false)

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setDrawerIsOpen(open)
  }

  return (
    <React.Fragment>
      <NewToDoListForm
        show={showNewToDoListModal}
        closeNewToDoListModal={closeNewToDoListModal}
      />
      <Drawer open={drawerIsOpen} onClose={() => setDrawerIsOpen(false)}>
        <NavLinksSideDrwar toggleDrawer={toggleDrawer} />
      </Drawer>
      <MainHeader>
        <button
          className='main-navigation__menu-btn'
          onClick={() => setDrawerIsOpen(true)}
        >
          <MenuIcon fontSize='large' />
        </button>
        <h1 className='main-navigation__title'>
          <Link to='/'>To Do List </Link>
        </h1>
        {auth.isLoggedIn && (
          <button
            onClick={openNewToDoListModal}
            className='main-navigation__new-btn'
          >
            New
          </button>
        )}
      </MainHeader>
    </React.Fragment>
  )
}

export default MainNavigation
