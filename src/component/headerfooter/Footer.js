import React from 'react'
import {Link} from "react-router-dom"

function Footer() {
  return (
    <div className='footer' style={{width:"100%", textAlign:"center", padding:"20px"}}>
      <hr></hr>
      <div id="copy">All contents Copyright 2021 HJKang.co Inc. all rights reserved</div><br></br>
      Contact mail : abc@abc.com Tel : +82 02 1234 1234 Fax : +82 02 1233 1233 &nbsp;
      <Link to="/admin">admin</Link>
    </div>
  )
}

export default Footer