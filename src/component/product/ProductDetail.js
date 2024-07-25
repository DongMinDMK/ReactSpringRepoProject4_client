import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SubImg from "./SubImg";
import SubMenu from "./SubMenu";
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import "../../style/product.css";

function ProductDetail() {

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const loginUser = useSelector(state => state.user);
    const navigate = useNavigate();
    const {pseq} = useParams();

    useEffect(()=>{
        axios.get(`/api/products/getProduct/${pseq}`)
        .then((result)=>{
            console.log(result.data.product);
            setProduct(result.data.product);
        })
        .catch((err)=>{
            console.error(err);
        })
    },[]
    )

    function goCart(){
        if(!loginUser.userid){
            window.alert("로그인이 필요한 서비스입니다.");
            navigate("/login");
            return;
        }

        axios.post("/api/carts/insertCart", {userid:loginUser.userid, pseq:pseq, quantity:quantity})
        .then((result)=>{
            if(result.data.message == "OK"){
                let res = window.confirm("장바구니에 상품을 추가했어요? 장바구니 리스트로 이동할까요?");

                if(res){
                    navigate("/cartList");
                }

            }
        })
        .catch((err)=>{
            console.error(err);
        })

    }

    async function orderOne(){
        if(!loginUser.userid){
            window.alert("로그인이 필요한 서비스입니다.");
            navigate("/login");
            return;
        }else{
            try{
                const result = await axios.post("/api/orders/insertOrderOne", null, {params:{userid:loginUser.userid, pseq:product.pseq, quantity:quantity}})
                let ans = window.confirm("주문이 완료되었습니다. 주문내역으로 이동할까요?");
                if(ans){
                    navigate(`/orderList/${result.data.oseq}`);
                }
            }catch(err){
                console.error(err);
            }
        }
        

    }

  return (
    <article>
      <SubImg></SubImg>
      <div className='subPage'>
        <SubMenu></SubMenu>
        <div className='productdetail'>
            <div className='detail'>
                <div className='detailimg'>
                    <img src={`http://localhost:8070/product_images/${product.image}`}></img>
                </div>
                <div className='detailinfo'>
                    <div className='field'>
                        <label>제품명</label>
                        <div>{product.name}</div>
                    </div>
                    <div className='field'>
                        <label>가격</label>
                        <div>{product.price2}원</div>
                    </div>
                    <div className='field'>
                        <label>수량</label>
                        <input type="text" value={quantity} 
                            onChange={(e)=>{setQuantity(e.currentTarget.value)}}></input>
                    </div>
                </div>
            </div>
            <div className='itemdetail-content'>
                    <pre>{product.content}</pre>
            </div>
            <div className='btns'>
                <input type="button" value="장바구니에 담기" onClick={()=>{goCart();}}></input>
                <input type="button" value="즉시 구매" onClick={()=>{orderOne()}}></input>
                <input type="button" value="메인으로" onClick={()=>{navigate("/")}}></input>
            </div>
        </div>
      </div>
    </article>
  )
}

export default ProductDetail