import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"
import "../../style/index.css"
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../store/useSlice';

function Heading() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginUser = useSelector(state => state.user);

    function onLogout(){
        axios.get("/api/members/logout")
        .then(()=>{
            dispatch(logoutAction());
            window.alert("정상적으로 로그아웃 되었습니다.");
            window.location.href="/login";
        })
        .catch((err)=>{
            console.error(err);
        })
    }

  return (
    <div className='header'>
      <div className='top_menu'>
        <div className='logo'>
            <img src="http://localhost:8070/images/logo.png" onClick={
                ()=>{navigate("/")}
                }></img> {/* 여기서 저장한 이미지는 서버에 static 폴더에 이미지 폴더로 연결이 된다. */}
        </div>
        <div className='gnb'>
            {/* Link 태그는 a 태그로 인식되서 css 적용이 가능합니다.  */}
            {
                (loginUser.userid)?(
                    <div className='logininfo'>
                        {loginUser.userid}({loginUser.name})&nbsp;&nbsp;
                        <button onClick={()=>{onLogout();}}>LOGOUT</button>
                    </div>
                ):(
                    <>
                        <Link to="/login">LOGIN</Link>
                        <Link to="/join">JOIN</Link>
                    </>
                )
            }
            <Link to="/cartList">CART</Link>
            <Link to="">MYPAGE</Link>
            <Link to="">CUSTOMER</Link>
        </div>
      </div>
      <div className='category_menu'>
        <div onClick={()=>{window.location.href="/kindList/1"}}>HEELS</div>
        <div onClick={()=>{window.location.href="/kindList/2"}}>BOOTS</div>
        <div onClick={()=>{window.location.href="/kindList/3"}}>SANDALS</div>
        <div onClick={()=>{window.location.href="/kindList/4"}}>SNEAKERS</div>
        <div onClick={()=>{window.location.href="/kindList/5"}}>SLEEPERS</div>
      </div>
    </div>
  )
}

export default Heading