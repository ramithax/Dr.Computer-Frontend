import React from "react"
import { useState } from "react";
import fileUpload from "../utils/mediaUpload";                

export default function Testpage() {

    const [file,setfile]=useState(null)
    
    async function uploadfile(){
        const res=await fileUpload(file)
        console.log(res)                    
    }

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-white gap-4">
            <input type="file" onChange={(e) => setfile(e.target.files[0])} /><br/>
                <button className="bg-blue-500 p-4 rounded-lg text-white" onClick={uploadfile}>
                    Upload
                </button>
</div>
    )
}