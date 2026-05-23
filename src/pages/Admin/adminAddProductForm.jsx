import React from "react"
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminAddProductForm() {

    const [productId,setProductId]=useState("")
    const [name,setName]=useState("")
    const [altnames,setAltnames]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [labeledprice,setLabeledPrice]=useState("")
    const [images,setImages]=useState("[]")
    const [isavailable,setIsAvailable]=useState(true)
    const [category,setCategory]=useState("")
    const [stock,setStock]=useState("")
    const [brand,setBrand]=useState("")
    const [model,setModel]=useState("")
   
    return (
        <div className="h-full w-full flex items-center flex-col">
            <div className="w-full h-[100px]  bg-white shadow-2xl rounded-lg flex p-4 item-center justify-between">
                <h1 className="text-2xl  font-semibold">Add New Product</h1>
                <div className="h-full gap-4 flex items-center" >
                    <Link to="/admin/products" className="bg-red-600 text-white w-[100px] text-center py-2 rounded-lg" >Cancel</Link>
                    <button className="bg-green-600 text-white w-[100px] text-center py-2 rounded-lg cursor-pointer " >Save</button>
                </div>
            </div>
            <div className="w-full h-[300px] p-4 flex border">
                <div className="w-[25%] h-[70px] flex-col px-2">
                    <label className="font-semibold">Product ID</label>  
                    <input value={productId} onChange={(e)=>{
                        setProductId(e.target.value)
                    }} className="w-full h-[40px] border rounded-lg px-2 " placeholder="PD-001"/>
                </div>
                <div className="w-[25%] h-[70px] flex-col px-2">
                    <label className="font-semibold">Product Name</label>  
                    <input value={name} onChange={(e)=>{
                        setName(e.target.value)
                    }} className="w-full h-[40px] border rounded-lg px-2 " placeholder="Nvidia GeForce RTX 3080"/>
                </div>
                <div className="w-[50%] h-[70px] flex-col ">
                    <label className="font-semibold">Alternative Names</label>
                    <span className="italic text-sm text-gray-400">(Comma-separated)</span>  
                    <input value={altnames} onChange={(e)=>{
                        setAltnames(e.target.value)
                    }} className="w-full h-[40px] border rounded-lg px-2 " placeholder="GPU,VGA,Graphic Card"/>
                </div>
            </div>
        </div>
    )
}