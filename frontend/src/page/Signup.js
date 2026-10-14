import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image : ""
  });

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProfileImage = async(e)=>{
      const data = await ImagetoBase64(e.target.files[0])
  

      setData((preve)=>{
          return{
            ...preve,
            image : data
          }
      })

  }
console.log(process.env.REACT_APP_SERVER_DOMIN)
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
    
          const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`,{
            method : "POST",
            headers : {
              "content-type" : "application/json"
            },
            body : JSON.stringify(data)
          })

          const dataRes = await fetchData.json()
    

        // alert(dataRes.message);
        toast(dataRes.message)
        if(dataRes.alert){
          navigate("/login");
        }
       
      } else {
        alert("Las contraseñas no coinciden");
      }
    } else {
      alert("Completa los campos obligatorios");
    }
  };

  return (
    <div className="px-4 py-12 md:py-16">
      <div className="m-auto flex w-full max-w-sm flex-col rounded-3xl border border-edge bg-panel p-6">
        {/* <h1 className='text-center text-2xl font-bold'>Crear cuenta</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full border border-edge m-auto relative ">
          <img src={data.image ? data.image :  loginSignupImage} className="w-full h-full" />

          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3  bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Subir foto</p>
            </div>
            <input type={"file"} id="profileImage" accept="image/*" className="hidden" onChange={handleUploadProfileImage}/>
          </label>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">Nombre</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="field mt-1 mb-3"
            value={data.firstName}
            onChange={handleOnChange}
          />

          <label htmlFor="lastName">Apellido</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="field mt-1 mb-3"
            value={data.lastName}
            onChange={handleOnChange}
          />

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

          <label htmlFor="confirmpassword">Confirmar contraseña</label>
          <div className="field mt-1 mb-3 flex items-center">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmPassword"
              className="w-full border-none bg-transparent outline-none"
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="btn-volt mt-4 w-full">
            Crear cuenta
          </button>
        </form>
        <p className="mt-2 text-left text-sm text-zinc-400">
          ¿Ya tienes cuenta?{" "}
          <Link to={"/login"} className="text-volt underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
