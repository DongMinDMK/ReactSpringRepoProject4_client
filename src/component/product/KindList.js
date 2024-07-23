import React, {useState, useEffect} from 'react'
import axios from "axios"
import SubImg from "./SubImg"
import SubMenu from "./SubMenu"
import { useNavigate, useParams } from 'react-router-dom'
import "../../style/product.css";

function KindList() {

    const [itemList, setItemList] = useState([]);
    // const [kind, setKind] = useState("");
    const navigate = useNavigate();
    const {kindNum} = useParams();

    useEffect(()=>{
        axios.get(`/api/products/kindList/${kindNum}`)
        .then((result)=>{
            setItemList([... result.data.kindList]);
        })
        .catch(()=>{

        })
    },[]
    )

    return (
    <article>
      <SubImg></SubImg>
      <div className='subPage'>
        <SubMenu></SubMenu>
        <div className='kindList' style={{flex:"4", border:"1px dotted blue"}}>
            <div className='itemList'>
                {
                   (itemList)?(
                    itemList.map((product, idx) => {
                        return (
                            <div className='item' key={idx} onClick={()=>{navigate(`productDetail/${product.pseq}`)}}>
                                <div className='image'>
                                    <img src={`http://localhost:8070/product_images/${product.image}`}></img>
                                </div>
                                <div className='name'>{product.name}</div>
                                <div className='name'>{product.price2}</div>
                            </div>
                        )
                    })
                   ):(null) 
                }
            </div>
        </div>
      </div>
    </article>
  )
}

export default KindList