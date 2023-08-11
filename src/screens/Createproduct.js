import { useState } from 'react'
import axios from "axios"
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom';
// import "./App.css"
// import {Typography, TextField, Button} from '@mui/material';

export default function App() {
  const navigate = useNavigate();
  // const token = localStorage.getItem("token")
  const [file, setFile] = useState()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [desc, setDesc] = useState("")
  const { userInfo } = useSelector((state) => state.auth);
  const submit = async event => {
    event.preventDefault()
  
    const formData = new FormData()
    formData.append("image", file)
    formData.append("name", name)
    formData.append("price", price)
    formData.append("category",category)
    formData.append("desc",desc)
  
    const result = await axios.post('https://eco-final-node.onrender.com/api/product/create', formData,{
    headers: {'Authorization': `Bearer ${userInfo.token}`}})
    console.log(result.data)
    navigate('/');
  }

  return (
    <div style={{margin:'5%'}}>
                  < h4> Add product</h4> <br/>
      <form onSubmit={submit}>
      <div className="inputbox">
      <input
          onChange={e => setName(e.target.value)} 
          type="text"
          placeholder='name'
        ></input>
        </div>
        <br/>
        <div className="inputbox">
        <input
          filename={file} 
          onChange={e => setFile(e.target.files[0])} 
          type="file" 
          accept="image/*"
        ></input>
        </div>
        <br/>
          <div className="inputbox">
        <input
          onChange={e => setPrice(e.target.value)} 
          type="text"
          placeholder='price'
        ></input>
        </div>
        <br/>
        <div className="inputbox">
          <input
          onChange={e => setCategory(e.target.value)} 
          type="text"
          placeholder='category'
        ></input>
        </div>
        <br/>
        <div className="inputbox">
          <input
          onChange={e => setDesc(e.target.value)} 
          type="text"
          placeholder='desc'
        ></input>
        </div>
        <br/>
         
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}