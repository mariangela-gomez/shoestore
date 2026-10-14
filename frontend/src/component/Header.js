import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const links = [
  { to: "/shoe/category/running", label: "Running" },
  { to: "/shoe/category/basketball", label: "Basketball" },
  { to: "/shoe/category/training", label: "Training" },
  { to: "/shoe/category/lifestyle", label: "Lifestyle" },
];

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.product.cartItem);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutRedux());
    setShowMenu(false);
    toast("Sesión cerrada");
  };

  const qty = cartItems.reduce((acc, el) => acc + Number(el.qty || 1), 0);

  return (
    <header className="fixed top-0 z-50 h-16 w-full border-b border-edge bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-3xl font-extrabold italic tracking-tight">
            STRIDE<span className="text-volt">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-semibold uppercase tracking-wider transition hover:text-volt ${
                  isActive ? "text-volt" : "text-zinc-300"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="relative flex items-center gap-4">
          <Link to="/cart" className="relative text-2xl transition hover:text-volt" aria-label="Carrito">
            <HiOutlineShoppingBag />
            {qty > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-volt px-1 text-xs font-bold text-ink">
                {qty}
              </span>
            )}
          </Link>

          <button
            onClick={() => setShowMenu((p) => !p)}
            className="h-9 w-9 overflow-hidden rounded-full border border-edge text-3xl text-zinc-300 transition hover:border-volt"
            aria-label="Cuenta"
          >
            {userData.image ? (
              <img src={userData.image} className="h-full w-full object-cover" alt="usuario" />
            ) : (
              <HiOutlineUserCircle className="m-auto h-full w-full p-0.5" />
            )}
          </button>

          {showMenu && (
            <div
              className="absolute right-0 top-12 flex min-w-[180px] flex-col overflow-hidden rounded-2xl border border-edge bg-panel py-2 text-sm shadow-2xl"
              onClick={() => setShowMenu(false)}
            >
              {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                <Link to="/newproduct" className="px-4 py-2 hover:bg-white/5">
                  Nuevo producto
                </Link>
              )}
              {userData.email ? (
                <button onClick={handleLogout} className="px-4 py-2 text-left text-red-400 hover:bg-white/5">
                  Cerrar sesión ({userData.firstName})
                </button>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 hover:bg-white/5">
                    Iniciar sesión
                  </Link>
                  <Link to="/signup" className="px-4 py-2 hover:bg-white/5">
                    Crear cuenta
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* navegación móvil */}
      <nav className="no-scrollbar flex gap-5 overflow-x-auto border-b border-edge bg-ink/90 px-4 py-2 backdrop-blur-xl md:hidden">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `whitespace-nowrap text-xs font-semibold uppercase tracking-wider ${
                isActive ? "text-volt" : "text-zinc-400"
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
