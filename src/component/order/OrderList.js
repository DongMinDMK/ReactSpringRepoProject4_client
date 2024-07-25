import React, {useState, useEffect} from 'react'
import axios from "axios"
import SubImg from "./SubImg";
import SubMenu from "./SubMenu";
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import "../../style/mypage.css"

function OrderList() {
    
    const [orderDetail, setOrderDetail] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [orders, setOrders] = useState([]);
    const loginUser = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {oseq} = useParams();

    useEffect(()=>{
        axios.get(`/api/orders/getOrders/${oseq}`)
        .then((result)=>{
            setOrderDetail(result.data.orderDetail);
            setTotalPrice(result.data.totalPrice);
            setOrders(result.data.orders);
        })
        .catch((err)=>{
            console.error(err);
        })
    },[]
    )

    function onResult(result){
        if(result == "1"){
            return "결제완료"
        }
        if(result == "2"){
            return "배송중"
        }
        if(result == "3"){
            return "배송완료"
        }
        if(result == "4"){
            return "구매확정"
        }
    }
    
  return (
    <article>
      <SubImg></SubImg>
      <div className='subPage'>
        <SubMenu></SubMenu>
        <div className='orderdetail' style={{flex:"4"}}>
            <h2>주문 상세</h2>
            <h3>주문자 정보</h3>
            <div className='orderDetailTable'>
                <div className='row'>
                    <div className='col'>주문번호</div>
                    <div className='col'>주문자성명</div>
                    <div className='col'>주문총액</div>
                </div>
                {
                    (orderDetail)?(
                        <>
                            <div className='row'>
                                <div className='col'>{orderDetail.oseq}</div>
                                <div className='col'>{orderDetail.mname}</div>
                                <div className='col'>{new Intl.NumberFormat("KO-KR").format(totalPrice)}원</div>
                            </div>
                            <div className='row'>
                                <div className='col'>배송주소</div>
                                <div className='col'>{orderDetail.zip_num}</div>
                                <div className='col'>&nbsp;&nbsp;{orderDetail.address1}&nbsp;&nbsp;{orderDetail.address2}</div>
                            </div>
                        </>
                    ):(null)
                }
            </div>
            <h3>주문 상품</h3>
            <div className='orderTable'>
                <div className='row'>
                    <div className='col'>상품명</div>
                    <div className='col'>상품별 주문번호</div>
                    <div className='col'>수량</div>
                    <div className='col'>가격</div>
                    <div className='col'>처리상태</div>
                </div>
                {
                    (orders)?(
                        orders.map((order, idx)=>{
                            return (
                                <div className='row'>
                                    <div className='col'>{order.pname}</div>
                                    <div className='col'>{order.odseq}</div>
                                    <div className='col'>{order.quantity}</div>
                                    <div className='col'>{new Intl.NumberFormat("KO-KR").format(order.price2)}원</div>
                                    <div className='col'>{onResult(order.result)}</div>
                                </div>
                            )
                        })
                    ):(null)
                }
            </div>  
            <div className='btns'>
                <button style={{background:"blueviolet", color:"white", margin:"2px"}} onClick={()=>{navigate("/")}}>메인으로</button>
                <button style={{background:"blueviolet", color:"white", margin:"2px"}} onClick={()=>{navigate("/mypage")}}>마이페이지로</button>
            </div>
        </div>
      </div>
    </article>
  )
}

export default OrderList