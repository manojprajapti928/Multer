// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './Home'; // Make sure this path is correct

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         {/* Add more routes here as needed */}
//       </Routes>
//     </BrowserRouter>
//   );
// }





import React, { useEffect, useState } from 'react'
import axios  from 'axios'
export default function App() {
  let [data , setdata]=useState([])

  async function hendlesubmit(e){
   
    e.preventDefault()
   
    let newfrom = new FormData()
    let file = e.target.fileupload.files[0]

    newfrom.append('fileupload',file)
   let res = await axios.post("http://localhost:5700/api/post",newfrom)
      console.log(res.data)

  }


  useEffect(()=>{
        async function getdata(){
          let res = await axios.get("http://localhost:5700/api/get")
          console.log(res.data)
          setdata(res.data)
        }
        getdata()
  },[])

  return (
    <div>
      
      <form onSubmit={(e)=>hendlesubmit(e)}>
        <input type='file' name='fileupload'/>
        <button>upload</button>
      </form>
      {
        data.map((item ,index)=>(
          <div key={index}>
            <h3>image</h3>
            <img src={`http://localhost:5700/uploads/${item.filename}`} alt='not image'/>
          </div>
        ))
      }

    </div>
  )
}
