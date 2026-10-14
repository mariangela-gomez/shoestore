import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "../component/cartProduct";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/productSlide"; 

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + Number(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + Number(curr.qty),
    0
  );

  const handlePayment = () => {
    if (user.email) {
      // Dispatch the clearCart action from Redux Toolkit
      dispatch(clearCart());

      Swal.fire({
        background: "#141416",
        color: "#fff",
        icon: "success",
        title: "¡Gracias por tu compra!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Clear the cart after displaying the message and navigating

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      toast("Inicia sesión para pagar");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <h1 className="section-title mb-8">Tu carrito</h1>

      {productCartItem[0] ? (
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-3">
            {productCartItem.map((el) => (
              <CartProduct
                key={el._id}
                id={el._id}
                name={el.name}
                image={el.image}
                category={el.category}
                qty={el.qty}
                total={el.total}
                price={el.price}
              />
            ))}
          </div>

          <div className="rounded-3xl border border-edge bg-panel p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-3xl font-extrabold uppercase italic">Resumen</h2>
            <div className="mt-4 flex justify-between border-b border-edge py-3 text-zinc-400">
              <span>Artículos</span>
              <span className="font-semibold text-white">{totalQty}</span>
            </div>
            <div className="flex justify-between border-b border-edge py-3 text-zinc-400">
              <span>Envío</span>
              <span className="font-semibold text-volt">Gratis</span>
            </div>
            <div className="flex justify-between py-4 text-xl">
              <span>Total</span>
              <span className="font-bold">${totalPrice}</span>
            </div>
            <button className="btn-volt w-full" onClick={handlePayment}>
              Pagar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center py-20 text-center">
          <p className="font-display text-5xl font-extrabold uppercase italic text-zinc-600">Carrito vacío</p>
          <p className="mt-3 text-zinc-400">Aún no has agregado ninguna zapatilla.</p>
          <Link to="/" className="btn-volt mt-8">Explorar catálogo</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
