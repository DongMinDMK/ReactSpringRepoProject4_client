import React from 'react'
import { useNavigate, Link } from "react-router-dom";

function SubMenu() {
  return (
    <div className='submenu'>
        <Link to="/login">LOGIN</Link>
        <Link to="/join">JOIN</Link>
        <Link to="">LOGOUT</Link>
    </div>
  )
}

export default SubMenu