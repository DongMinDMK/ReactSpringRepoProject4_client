import React, {useState, useEffect} from 'react'
import axios from "axios"
import SubImg from "./SubImg";
import SubMenu from "./SubMenu";
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../store/useSlice';

import "../../style/login.css";

import { useNavigate } from 'react-router-dom';

function Login() {

    const [userid, setUserid] = useState("");
    const [pwd, setPwd] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    async function onLocalLogin(){
        if(!userid){
            return window.alert("아이디를 먼저 입력해주세요...");
        }

        if(!pwd){
            return window.alert("비밀번호를 먼저 입력해주세요...");
        }

        try{

            let result = await axios.post("/api/members/localLogin", {userid:userid, pwd:pwd})
            if(result.data.message == "OK"){
                result = await axios.get("/api/members/getLoginUser")
                dispatch(loginAction(result.data.loginUser));
                window.alert("로그인이 완료되었습니다.");
                navigate("/");
                
            }else{
                setMessage(result.data.message);
            }

        }catch(err){
            console.error(err);
        }
        
    }
  return (
    <article>
      <SubImg></SubImg>
      <div className='subPage'>
        <SubMenu></SubMenu>
        <div className='memberform'>
            <h2>Login</h2>
                <div className="field">
                    <label>User ID</label>
                    <input type="text" value={userid} onChange={(e)=>{
                        setUserid( e.currentTarget.value );
                    }}/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" value={pwd} onChange={(e)=>{
                        setPwd( e.currentTarget.value );
                    }}/>
                </div>
                <div className="btns">
                        <button onClick={()=>{
                            onLocalLogin();
                        }}>로그인</button>
                        <button onClick={()=>{navigate("/join")}}>회원가입</button>
                </div>
                <div className="sns-btns">
                        <button onClick={
                            ()=>{
                                window.location.href='http://localhost:8070/members/kakaostart';
                            }
                        }>Kakao Login</button>
                        <button>Naver Login</button>
                        <button>Google Login</button><button>FaceBook Login</button>
                </div>  
                <div>{message}</div>
        </div>
      </div>
    </article>
  )
}

export default Login