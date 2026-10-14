import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import {BsCloudUpload} from "react-icons/bs"
import { ImagetoBase64 } from '../utility/ImagetoBase64'

const Newproduct = () => {
  const [data,setData] = useState({
    name : "",
    category : "",
    image : "",
    price : "",
    description : ""
  })

  const handleOnChange = (e)=>{
    const {name,value} = e.target

    setData((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })

  }

  const uploadImage = async(e)=>{
      const data = await ImagetoBase64(e.target.files[0])
      // console.log(data)

      setData((preve)=>{
        return{
          ...preve,
          image : data
        }
      })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(data)

    const {name,image,category,price} = data

    if(name && image && category && price){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const fetchRes =  await fetchData.json()
  
      console.log(fetchRes)
      toast(fetchRes.message)

      setData(()=>{
        return{
          name : "",
          category : "",
          image : "",
          price : "",
          description : ""
        }
      })
    }
    else{
      toast("Completa los campos obligatorios")
    }
    
   
  }
  return (
    <div className="px-4 py-12">
       <form className='m-auto flex w-full max-w-md flex-col gap-1 rounded-3xl border border-edge bg-panel p-6' onSubmit={handleSubmit}>
        <label htmlFor='name'>Nombre</label>
        <input type={"text"}  name="name" className='field my-1' onChange={handleOnChange} value={data.name}/>

        <label htmlFor='category'>Categoría</label>
        <select className='field my-1' id='category' name='category' onChange={handleOnChange} value={data.category}>
          <option value={"other"}>Selecciona categoría</option>
          <option value={"running"}>Running</option>
          <option value={"basketball"}>Basketball</option>
          <option value={"training"}>Training</option>
          <option value={"lifestyle"}>Lifestyle</option>
        </select>

        <label htmlFor='image'>Imagen
        <div  className='my-1 flex h-40 w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-edge bg-ink text-zinc-500'>
            {
              data.image ? <img src={data.image} className="h-full" alt="Vista previa" /> :<span className='text-5xl'><BsCloudUpload/></span> 
            }
            
            
           <input type={"file"} accept="image/*" id="image" onChange={uploadImage} className="hidden"/>
        </div>
        </label>
        

        <label htmlFor='price' className='my-1'>Precio</label>
        <input type={"text"} className='field my-1' name='price' onChange={handleOnChange} value={data.price}/>

        <label htmlFor='description'>Descripción</label>
        <textarea rows={2} value={data.description} className='field my-1 resize-none' name='description' onChange={handleOnChange}></textarea>

        <button className='btn-volt mt-3'>Guardar</button>
       </form>
    </div>
  )
}

export default Newproduct