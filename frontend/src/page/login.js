import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()  
  const userData = useSelector(state => state)


  const dispatch = useDispatch()




  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const handleOnChange = (e)=>{
    const {name,value} = e.target
    setData((preve)=>{
        return{
            ...preve,
            [name] : value
        }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {email,password} = data
    if(email && password ){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })

      const dataRes = await fetchData.json()
      console.log(dataRes)
      
      toast(dataRes.message)
      
      if(dataRes.alert){
        dispatch(loginRedux(dataRes))
        setTimeout(() => {
          navigate("/")
        }, 1000);
      }

      console.log(userData)
    }
    else{
        alert("Completa los campos obligatorios")
    }
  }

  return (
    <div className="px-4 py-12 md:py-16">
    <div className="m-auto flex w-full max-w-sm flex-col rounded-3xl border border-edge bg-panel p-6">
      {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
      <div className="w-20 overflow-hidden rounded-full border border-edge m-auto">
        <img src={loginSignupImage} className="w-full" alt="" />
      </div>

      <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="email">Correo</label>
        <input
          type={"email"}
          id="email"
          name="email"
          className="field mt-1 mb-3"
          value={data.email}
          onChange={handleOnChange}

        />

        <label htmlFor="password">Contraseña</label>
        <div className="field mt-1 mb-3 flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="w-full border-none bg-transparent outline-none"
            value={data.password}
            onChange={handleOnChange}
          />
          <span
            className="flex text-xl cursor-pointer"
            onClick={handleShowPassword}
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </span>
        </div>

        <button className="btn-volt mt-4 w-full">
          Login
        </button>
      </form>
      <p className="mt-2 text-left text-sm text-zinc-400">
        ¿No tienes cuenta?{" "}
        <Link to={"/signup"} className="text-volt underline">
          Sign Up
        </Link>
      </p>
    </div>
  </div>
  )
}

export default Login