import React from 'react'
import { useNavigate, Link } from "react-router-dom";

function SubMenu() {
  return (
    <div className='submenu'>
        <Link to="/cartList">장바구니</Link>
        <Link to="/mypage">진행중인 주문</Link>
        <Link to="/orderAll">총 주문</Link>
        <Link to="">회원정보수정</Link>
    </div>
  )
}

export default SubMenu