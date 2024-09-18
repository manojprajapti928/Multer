import React from 'react'
import axios from "axios"

export default function Home() {

async function filesubmit(e) {

  e.preventDefault();
  const formData = new FormData();

  formData.append('file',e.target.file.files[0])

  // console.log(file)

  let res = await axios.post ('http://localhost:5100/api/post',formData)


  console.log(res.data)

  
}

  return (

    
    <div>

      <form onSubmit={filesubmit}> 
        <input type="file" name='file' accept='image/*' />
        <button>Uplode File</button>
      </form>
      
    </div>
  )
}
