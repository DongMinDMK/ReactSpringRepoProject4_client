import React, {useState, useEffect} from 'react'
import axios from "axios"
import "../style/index.css"
import { useNavigate } from 'react-router-dom'

function Index() {
    const [bestProduct, setBestProduct] = useState();
    const [newProduct, setNewProduct] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("/api/products/bestProduct")
        .then((result)=>{
            setBestProduct(result.data.bestProduct);
        })
        .catch((err)=>{
            console.error(err);
        })

        axios.get("/api/products/newProduct")
        .then((result)=>{
            setNewProduct(result.data.newProduct)
        })
        .catch((err)=>{
            console.error(err);
        })
    },[]
    )
  return (
    <article>
        <div className='main_img'>
            <img src="http://localhost:8070/images/main_img.jpg"></img>
        </div>
        <h2>Best Item</h2>
        <div className='itemList'>
            {
                (bestProduct)?(
                    bestProduct.map((product, idx)=>{
                        return(
                            <div className='item' key={idx} onClick={()=>{navigate(`/productDetail/${product.pseq}`)}}>
                                <div className='image'>
                                    <img src={`http://localhost:8070/product_images/${product.image}`}></img>
                                </div>
                                <div className='name'>
                                    {product.name}
                                </div>
                                <div className='price'>
                                    {product.price2}
                                </div>
                            </div>
                        )
                    })
                ):(null)
            }
        </div>
        <h2>New Item</h2>
        <div className='itemList'>
        {
                (newProduct)?(
                    newProduct.map((product, idx)=>{
                        return(
                            <div className='item' key={idx} onClick={()=>{navigate(`/productDetail/${product.pseq}`)}}>
                                <div className='image'>
                                    <img src={`http://localhost:8070/product_images/${product.image}`}></img>
                                </div>
                                <div className='name'>
                                    {product.name}
                                </div>
                                <div className='price'>
                                    {product.price2}
                                </div>
                            </div>
                        )
                    })
                ):(null)
            }
        </div>
    </article>
  )
}

export default Index