import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assest/logo.png";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
  };

  const cartItemNumber = useSelector((state)=>state.product.cartItem)
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-10 flex justify-center items-center">
            <img src={logo} className="h-16 mr-3" alt="store logo"/>
            <p className="text-red-600 font-bold text-xl bg-slate-200 rounded-xl p-1">Mariangela's store</p>
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
              <BsCartFill />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center ">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} className="h-full w-full" alt="user pic"/>
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    New product
                  </Link>
                )}

                {userData.image ? (
                  <p
                    className="cursor-pointer text-white px-2 bg-red-500"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName}){" "}
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
