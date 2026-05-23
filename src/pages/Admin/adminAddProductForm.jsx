import React from "react"
import { useState } from "react";

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
        <div className="h-screen w-full flex items-center justify-center bg-white">
            <div className="w-full h-[100px] flex p-5 bg-white shadow-2xl rounded-lg">

            </div>
        </div>
    )
}