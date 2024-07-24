import React, {useState, useEffect} from 'react'
import axios from "axios"
import SubImg from "./SubImg";
import SubMenu from "./SubMenu";
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import "../../style/mypage.css"

function CartList() {
    const[cartList, setCartList] = useState([]);
    const[totalPrice, setTotalPrice] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let checkList = []; // 클릭해서 체크된 체크박스 내용유지 용도의 배열

    useEffect(()=>{
        axios.get("/api/carts/cartList")
        .then((result)=>{
            setCartList(result.data.cartList);
            setTotalPrice(result.data.totalPrice);
        })
        .catch((err)=>{
            console.error(err);
        })
    },[]
    )

    function onCheck(cseq, checked){
        if(checked){
            checkList.push(cseq);
        }else{
            checkList = checkList.filter((value, idx, arr)=>{
                return value != cseq;
            })
            // filter 메서드 : checkList 값들을 value 변수에 하나씩 넣으며, 배열의 요소만큼 실행
            // cseq 값과 비교하여 같지 않은 요소들만 반환하고 이들을 다시 배열로 생성
        }
        console.log(checkList);
    }

    async function onDeleteCart(){
       if(checkList.length == 0){
            return window.alert("삭제할 항목을 선택하세요.");
       }
       for(let i=0; i<checkList.length; i++){
            await axios.delete(`/api/carts/deleteCart/${checkList[i]}`)
       }
       const result = await axios.get("/api/carts/cartList")
       setCartList(result.data.cartList);
       setTotalPrice(result.data.totalPrice);
       checkList = [];

       if(result.data.cartList){
        for(let i=0; i<result.data.cartList.length; i++){
            document.getElementById("ch" + i).checked = false;
        }
       }
    }

    async function onSubmit(){
        if(checkList.length == 0){
            return window.alert("주문할 항목을 먼저 선택하세요");
        }else{
            // ORDERS 테이블에 데이터 추가
            // 추가한 데이터의 OSEQ 를 들고 옴.
            const result = await axios.post("/api/orders/insertOrders")
            const oseq = result.data.oseq;
            console.log(oseq);

            for(let i=0; i<checkList.length; i++){
                await axios.post("/api/orders/insertOrderDetail", null, {params:{oseq:oseq, cseq:checkList[i]}})
            }

            console.log("여기까지")

            if(window.confirm("주문이 완료되었습니다. 주문리스트로 이동하시겠습니까?")){
                navigate(`/orderList/${oseq}`)
            }else{
                // 주문 이후에 cartList 재로딩
                const result = await axios.get("/api/carts/cartList")
                setCartList(result.data.cartList);
                setTotalPrice(result.data.totalPrice);
                checkList = [];

                if(result.data.cartList){
                    for(let i=0; i<result.data.cartList.length; i++){
                        document.getElementById("ch" + i).checked = false;
                    }
                }
            }
        }

    }
  return (
    <article>
            <SubImg />
            <div className='subPage'>
                <SubMenu />
                <div className='cartList'>
                    <h2>장바구니</h2>
                    {
                        (cartList)?(
                            <div className="tb">
                                <div className="row">
                                    <div className="coltitle">상품명</div>
                                    <div className="coltitle">수 량</div>
                                    <div className="coltitle">가 격</div>
                                    <div className="coltitle">주문일</div>
                                    <div className="coltitle">삭 제</div>
                                </div>
                                {
                                    cartList.map((cart, idx)=>{
                                        return (
                                            <div className="row">
                                                <div className="col">{cart.pname}</div>
                                                <div className="col">{cart.quantity}</div>
                                                <div className="col">{new Intl.NumberFormat('ko-KR').format(cart.price2)}</div>
                                                <div className="col">{cart.indate.substring(2,10)}</div>
                                                <div className="col">
                                                    <input type="checkbox" id={'ch'+idx } value={cart.cseq} onChange={
                                                        (e)=>{
                                                            onCheck( e.currentTarget.value, e.currentTarget.checked )
                                                        }
                                                    }/>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="row">
                                    <div className="col" style={{backgroundColor:"blue", color:"white", flex:"2"}}> 총 액</div>
                                    <div className="col" style={{flex:"2", textAlign:"left"}}>&nbsp;&nbsp;&nbsp;{new Intl.NumberFormat('ko-KR').format(totalPrice)}</div>
                                    <div className="col" style={{flex:"1"}}>
                                        <button onClick={()=>{ onDeleteCart() }}>삭제</button>
                                    </div>
                                </div>
                                <div className="btn" style={{display:"flex"}}>
                                    <button style={{flex:"1", background:"blue", padding:"10px", color:"white", margin:"3px"}} onClick={()=>{ navigate('/') }}>쇼핑 계속하기</button>
                                    <button  style={{flex:"1", background:"blue", padding:"10px", color:"white", margin:"3px"}} onClick={()=>{ onSubmit() }}>주문하기</button>
                                </div>
                            </div>
                        ):(<h3>장바구니가 비었습니다.</h3>)
                    }
                </div>
            </div>
        </article>

  )
}
export default CartList