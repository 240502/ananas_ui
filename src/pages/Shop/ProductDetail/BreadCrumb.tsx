import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductCateById } from '../../../services/product.servies';
export const BreadCrumb = ({cateId,proName,style}:any) => {
    const [cateName ,setCateName] = useState("");
    useEffect(()=>{
        async function getCateById(cateId:any){
            if(cateId != 0){
                const cate = await getProductCateById(cateId);
                try{
                    setCateName(cate.cate_name);
    
                }catch(err){
                    console.log(err);
                }
            }
          
        }
        getCateById(cateId)
    },[cateId,proName])
  return (
    <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
        <li className="breadcrumb-item">
            <Link to="/product-list">Sản phẩm</Link>
        </li>
        <li className="breadcrumb-item" style={{textTransform:"capitalize"}}>
            <a href="#">{cateName}</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page" style={{textTransform:"capitalize"}} >
            {proName} - {style}
        </li>
    </ol>
</nav>
  )
}

