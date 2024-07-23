import React from 'react'
import { useNavigate, Link } from "react-router-dom";

function SubMenu() {
  return (
    <div className='submenu'>
        <Link to="/kindList/1">HEELS</Link>
        <Link to="/kindList/2">BOOTS</Link>
        <Link to="/kindList/3">SENDALS</Link>
        <Link to="/kindList/4">SNEAKERS</Link>
        <Link to="/kindList/5">SLEEPERS</Link>
    </div>
  )
}

export default SubMenu