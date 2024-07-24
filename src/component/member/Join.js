import React, {useState, useEffect} from 'react'
import axios from "axios"
import "../../style/login.css"
import { useNavigate } from 'react-router-dom'
import DaumPostcode  from 'react-daum-postcode'
import Modal from "react-modal"
import SubImg from "./SubImg";
import SubMenu from "./SubMenu";

function Join() {

    const [userid, setUserid] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdchk, setPwdchk] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [zip_num, setZip_num] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [address3, setAddress3] = useState('');
    const [message, setMessage] = useState('');
    const [userCode, setUsercode] = useState("");
    const [msg, setMsg] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    function idCheck(){
        axios.get("/api/members/idCheck", {params:{userid:userid}})
        .then((result)=>{
            if(result.data.res == "1"){
                setMessage("사용가능합니다.");
            }else{
                setMessage("아이디가 중복됩니다.");
            }
        })
    }

    function toggle(){
        setIsOpen(!isOpen)
    }

    async function sendMail(){
        
        if(!email){ 
            return window.alert("이메일을 입력해주세요..");
        }
        console.log(1);
        try{
            console.log(2);
            const result = await axios.post("/api/mails/sendMail", null, {params:{email:email}})
            console.log(result.data);
            if(result.data.message == "OK"){
                window.alert("이메일이 전송되었습니다. 해당 이메일의 수신내역을 확인하세요.");
                console.log(`result.data.number : ` + result.data.number);
            }
        }catch(err){
            console.error(err);

        }

    }

    function codeCheck(){
        
    }

    function onJoin(){
        if(!userid){
            return window.alert("아이디를 입력해주세요...");
        }
        if(!pwd){
            return window.alert("비밀번호를 입력해주세요...");
        }

        if(pwd != pwdchk){
            return window.alert("비밀번호와 비밀번호 확인이 서로 일치하지 않습니다.")
        }

        if(!pwdchk){
            return window.alert("비밀번호 확인을 입력해주세요")
        }
        if(!name){
            return window.alert("이름을 입력해주세요")
        }
        if(!phone){
            return window.alert("전화번호를 입력해주세요")
        }
        if(!email){
            return window.alert("이메일을 입력해주세요")
        }
        if(!zip_num){
            return window.alert("주소를 입력해주세요");
        }
        axios.post("/api/members/insertMember", {userid:userid, pwd:pwd, name:name, phone:phone, email:email, zip_num:zip_num, address1:address1, address2:address2, address3:address3})
        .then((result)=>{
            if(result.data.message == "OK"){
                window.alert("회원가입이 완료되었습니다. 로그인하세요..");
                navigate("/login")
            }
        })
        .catch((err)=>{
            console.error(err);
        })
    }

    // 모달창을 위한 style

    const customStyles = {
        overlay: {
            backgroundColor: "rgba( 0 , 0 , 0 , 0.5)",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "500px",
            height: "600px",
            padding: "0",
            overflow: "hidden",
        },
    };

    const completeHandler = (data) =>{
        setZip_num(data.zonecode);
        setAddress1(data.address);
        setIsOpen(false);
    }

  return (
    <article>
        <SubImg></SubImg>
        <div className='subPage'>
        <SubMenu></SubMenu>
        <div className='memberform'>
            <h2>Join</h2>
            <div className='field'>
                <label>USER ID</label>
                <input type="text" style={{flex:"2"}} value={userid} onChange={(e)=>{
                    setUserid(e.currentTarget.value);
                    setMessage("");
                }}></input>
                <button style={{flex:"1"}} onClick={()=>{
                    idCheck();
                }}>아이디 중복검사</button>
                <div style={{flex:"2", color:"blue", lineHeight:"30px"}}> {message}</div>
            </div>
            <div className="field">
                <label>Password</label>
                <input type="password" value={pwd} onChange={(e)=>{
                    setPwd( e.currentTarget.value );
                }}/>
            </div>
            <div className="field">
                <label>reType Password</label>
                <input type="password" value={pwdchk} onChange={(e)=>{
                    setPwdchk( e.currentTarget.value );
                }}/>
            </div>
            <div className="field">
                <label>name</label>
                <input type="text" value={name} onChange={(e)=>{
                    setName( e.currentTarget.value );
                }}/>
            </div>
            <div className="field">
                <label>Phone</label>
                <input type="text" value={phone} onChange={(e)=>{
                    setPhone( e.currentTarget.value );
                }}/>
            </div>
            <div className="field">
                <label>E-mail</label>
                <div style={{flex:"9", display:"flex"}}>
                    <input type="text" value={email}  style={{flex:"1"}} onChange={(e)=>{
                        setEmail( e.currentTarget.value );
                    }}/>
                    <button style={{flex:"1"}} onClick={()=>{
                        sendMail()
                    }}>SEND MAIL</button>
                    <label style={{textAlign:"right", marginRight:"10px"}}>Code</label>
                    <input style={{flex:"1"}} type="text" value={userCode} onChange={(e)=>{
                        setUsercode(e.currentTarget.value);
                    }}></input>
                    <button style={{flex:"1"}} onClick={()=>{codeCheck()}}>코드확인</button>
                    <div style={{flex:"1", color:"blue", lineHeight:"30px"}}>  {msg}</div>
                    </div>
            </div>
            <div className="field">
                <label>Zip num</label>
                <input type="text" style={{flex:"2"}} value={zip_num} onChange={(e)=>{
                    setZip_num( e.currentTarget.value );
                }} readOnly/>
                <button style={{flex:"1"}} onClick={()=>{toggle()}}>우편번호 찾기</button>
                <div style={{flex:"2"}}></div>
            </div>
            <div>
                <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                    <DaumPostcode onComplete={completeHandler}></DaumPostcode>
                </Modal>
            </div>
            <div className="field" >
                <label>Address</label>
                <input type="text" value={address1} onChange={(e)=>{
                    setAddress1( e.currentTarget.value );
                }} readOnly/>
            </div>
            <div className="field">
                <label>detail Address</label>
                <input type="text" value={address2} onChange={(e)=>{
                    setAddress2( e.currentTarget.value );
                }} placeholder='상세주소 입력'/>
            </div>
            <div className="field">
                <label>extra Address</label>
                <input type="text" value={address3} onChange={(e)=>{
                    setAddress3( e.currentTarget.value );
                }}/>
            </div>
            <div className='btns'>
                <button onClick={()=>{onJoin();}}>회원가입</button>
                <button onClick={()=>{navigate("/")}}>돌아가기</button>
                </div>
            </div>
        </div>
    </article>
  )
}

export default Join