import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../shared/context/AuthContext'
import './NavLinks.css'

const NavLinks = props => {
  const auth = useContext(AuthContext)

  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' exact>
          All Lists
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>Logout</button>
        </li>
      )}
    </ul>
  )
}

export default NavLinks
