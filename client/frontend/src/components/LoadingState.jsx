import React from 'react'
import { ClipLoader } from "react-spinners";

function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-">
      <div className="text-white text-2xl font-bold">
        <ClipLoader color='#904242ff' size={80}/>
      </div>
    </div>
  )
}

export default LoadingState