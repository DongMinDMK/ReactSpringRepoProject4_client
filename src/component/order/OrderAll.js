import React, {useState, useEffect} from 'react'
import axios from "axios"
import SubImg from "./SubImg";
import SubMenu from "./SubMenu";
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import "../../style/mypage.css"

function MyPage() {
    const [orderList, setOrderList] = useState();
    const loginUser = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!loginUser.userid){
            window.alert("로그인이 필요한 서비스입니다.");
            navigate("/login");
        }
        axios.get("/api/orders/orderAll")
        .then((result)=>{
            console.log(result.data.orderList);
            setOrderList(result.data.orderList);
        })
        .catch((err)=>{
            console.error(err);
        })
    },[]
    )
  return (
    <article>
      <SubImg></SubImg>
      <div className='subPage'>
        <SubMenu></SubMenu>
        <div className='orderings' style={{flex:"4"}}>
            <h3>현재 진행중인 주문 내역</h3>
            <div className='row'>
                <div className='col' style={{background:"blueviolet", color:"white"}}>주문일자</div>
                <div className='col' style={{background:"blueviolet", color:"white"}}>주문번호</div>
                <div className='col' style={{background:"blueviolet", color:"white"}}>상품명</div>
                <div className='col' style={{background:"blueviolet", color:"white"}}>결제금액</div>
                <div className='col' style={{background:"blueviolet", color:"white"}}>주문상세</div>
            </div>
            {
                (orderList)?(
                    orderList.map((order, idx)=>{
                        return(
                            <div className='row'>
                                <div className='col'>{order.indate.substring(0,10)}</div>
                                <div className='col'>{order.oseq}</div>
                                <div className='col'>{order.pname}</div>
                                <div className='col'>{new Intl.NumberFormat("KO-KR").format(order.price2)}원</div>
                                <div className='col' style={{cursor:"pointer"}} onClick={()=>{navigate(`/orderList/${order.oseq}`)}}>상세보기</div>
                            </div>
                        )
                    })
                ):(<h3>현재 진행중인 주문내역이 없습니다.</h3>)
            }
        </div>
      </div>
    </article>
  )
}

export default MyPage