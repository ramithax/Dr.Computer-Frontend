import React from "react"
import { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster }  from "react-hot-toast";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import fileUpload from "../../utils/mediaUpload";

export default function AdminAddProductForm() {

    const [productId,setProductId]=useState("")
    const [name,setName]=useState("")
    const [altnames,setAltnames]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [labeledprice,setLabeledPrice]=useState("")
    const [images,setImages]=useState([])
    const [isavailable,setIsAvailable]=useState(true)
    const [category,setCategory]=useState("")
    const [stock,setStock]=useState("")
    const [brand,setBrand]=useState("")
    const [model,setModel]=useState("")
    const navigate=useNavigate()
    const [issaving,setSaving]=useState(false)

    async function addproduct(){

        setSaving(true)

        const token=localStorage.getItem("token")
        
        if(!token){
            toast.error("Please login to add a product")
            navigate("/login")
            return
        }  
        const imageUploadPromises=[]

        for(let i=0;i<images.length;i++){
            imageUploadPromises.push(fileUpload(images[i]))

        }
        try{
            const imageUrls= await Promise.all(imageUploadPromises)

            const altnamearray = altnames.split(",")
            console.log(altnamearray)

            const reqbody={
                productId:productId,
                name:name,
                altnames:altnamearray,
                description:description,
                price:price,
                labeledprice:labeledprice,
                images:imageUrls,
                isavailable:isavailable,
                category:category,
                stock:stock,
                brand:brand,
                model:model
            }

            await api.post("products",reqbody,{
                headers:{
                    authorization:"Bearer " + token
                }
            })

            toast.success("Product added successfully")
            navigate("/admin/products")    
        }
        catch(err){
            toast.error(err?.response?.data?.message || "An error occured while adding the product.");

        }
        finally{
            setSaving(false)
        }
    }
   
    return (
        <div className="h-full w-full flex items-center flex-col">
        
            <div className="w-full h-[100px]  bg-white shadow-2xl rounded-lg flex p-4 item-center justify-between">
                <h1 className="text-2xl  font-semibold">Add New Product</h1>
                <div className="h-full gap-4 flex items-center" >
                    <Link to="/admin/products" className="bg-red-600 text-white w-[100px] text-center py-2 rounded-lg" >Cancel</Link>
                    <button className="bg-green-600 text-white w-[100px] text-center py-2 rounded-lg cursor-pointer " onClick={addproduct} >{
                    issaving ? "Saving" : "Save"   }</button>
                </div>
            </div>
            <div className="w-full p-4 flex flex-wrap">
                <div className="w-[25%] h-[70px] flex-col px-2 my-2">
                    <label className="font-semibold">Product ID</label>  
                    <input value={productId} onChange={(e)=>{
                        setProductId(e.target.value)
                    }} className="w-full h-[40px] border rounded-lg px-2 " placeholder="PD-001"/>
                </div>
                <div className="w-[25%] h-[70px] flex-col px-2 my-2">
                    <label className="font-semibold">Product Name</label>  
                    <input value={name} onChange={(e)=>{
                        setName(e.target.value)
                    }} className="w-full h-[40px] border rounded-lg px-2 " placeholder="Nvidia GeForce RTX 3080"/>
                </div>
                <div className="w-[50%] h-[70px] flex-col px-2 my-2">
                    <label className="font-semibold">Alternative Names</label>
                    <span className="italic text-sm text-gray-400">(Comma-separated)</span>  
                    <input value={altnames} onChange={(e)=>{
                        setAltnames(e.target.value)
                    }} className="w-full h-[40px] border rounded-lg px-2 " placeholder="GPU,VGA,Graphic Card"/>
                </div>
                <div className="w-[25%] h-[70px] flex-col px-2 my-2">
                    <label className="font-semibold">Price</label>  
                    <input value={price} onChange={(e)=>{
                        setPrice(e.target.value)
                    }} className="w-full h-[40px] border rounded-lg px-2 " placeholder="1000"/>
                </div>
                <div className="w-[25%] h-[70px] flex-col px-2 my-2">
                    <label className="font-semibold">Labeled Price</label>  
                    <input value={labeledprice} onChange={(e)=>{
                        setLabeledPrice(e.target.value)
                    }} className="w-full h-[40px] border rounded-lg px-2 " placeholder="1500"/>
                </div>
                <div className="w-full flex flex-col px-2 my-2">
                    <label className="font-semibold">Description</label>  
                    <textarea value={description} onChange={(e)=>{
                        setDescription(e.target.value)
                    }} className="w-full h-[100px] border rounded-lg px-2 " placeholder="Enter product description"/>
                </div>
                <div className="w-[25%] h-[70px] flex-col px-2 my-2">
                    <label className="font-semibold">Images</label>  
                    <input type="file" multiple onChange={(e)=>{
                        setImages(Array.from(e.target.files))
                    }} className="w-full h-[40px] border rounded-lg px-2 " placeholder="Image URLs (comma-separated)"/>
                </div>
                <div className="w-[25%] h-[70px] flex-col px-2 my-2">
                    <label className="font-semibold">Availability</label>  
                    <select className="w-full h-[40px] border rounded-lg px-2 " value={isavailable} onChange={(e)=>{setIsAvailable(e.target.value === "true")}}>
                        <option value={true}>Available</option>
                        <option value={false}>Unavailable</option>
                    </select>
                </div>
                <div className="w-[25%] h-[70px] flex-col px-2 my-2">
                    <label className="font-semibold">Stock</label>  
                    <input value={stock} onChange={(e)=>{
                        setStock(e.target.value)
                    }} className="w-full h-[40px] border rounded-lg px-2 " placeholder="10"/>
                </div>
                <div className="w-[25%] h-[70px] flex-col px-2 my-2">
                </div>
                <div className="w-[25%] h-[70px] flex-col px-2 my-2">
                    <label className="font-semibold">Category</label>
                    <select value={category} className="w-full h-[40px] border rounded-lg px-2" onChange={(e)=>{
                        setCategory(e.target.value)
                    }}>
                        <option value="gpu">GPU</option>
                        <option value="cpu">CPU</option>
                        <option value="ram">RAM</option>
                        <option value="storage">Storage</option>
                        <option value="motherboard">Motherboard</option>
                        <option value="psu">PSU</option>
                        <option value="casing">Case</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="w-[25%] h-[70px] flex-col px-2 my-2">
                    <label className="font-semibold">Brand </label>
                    <span className="italic text-sm text-gray-400">(Optional)</span> 
                    <select value={brand} className="w-full h-[40px] border rounded-lg px-2" onChange={(e)=>{
                        setBrand(e.target.value)
                    }}>
                        <option value="asus">ASUS</option>
                        <option value="msi">MSI</option>
                        <option value="gigabyte">Gigabyte</option>
                        <option value="evga">EVGA</option>
                        <option value="corsair">Corsair</option>
                        <option value="nzxt">NZXT</option>
                        <option value="samsung">Samsung</option>
                        <option value="seagate">Seagate</option>
                        <option value="western-digital">Western Digital</option>
                        <option value="other">Other</option>  
                    </select>
                </div>
                <div className="w-[25%] h-[70px] flex-col px-2 my-2">
                    <label className="font-semibold">Model </label>
                    <span className="italic text-sm text-gray-400">(Optional)</span>
                    <input value={model} onChange={(e)=>{setModel(e.target.value)}} className="w-full h-[40px] border rounded-lg px-2 " placeholder="RTX 3080"/>
                </div>  
            </div>
        </div>
    )
}