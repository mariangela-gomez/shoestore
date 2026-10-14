import React from "react";
import { HiOutlinePlus, HiOutlineMinus, HiOutlineTrash } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { deleteCartItem, increaseQty, decreaseQty } from "../redux/productSlide";

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-4 rounded-3xl border border-edge bg-panel p-3">
      <img src={image} alt={name} className="h-28 w-28 shrink-0 rounded-2xl object-cover md:h-32 md:w-32" />
      <div className="flex w-full flex-col justify-between py-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-volt">{category}</p>
            <h3 className="font-display text-2xl font-bold uppercase leading-tight">{name}</h3>
            <p className="text-sm text-zinc-400">${price}</p>
          </div>
          <button
            onClick={() => dispatch(deleteCartItem(id))}
            aria-label="Eliminar"
            className="text-xl text-zinc-500 transition hover:text-red-400"
          >
            <HiOutlineTrash />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 rounded-full border border-edge px-2 py-1">
            <button onClick={() => dispatch(decreaseQty(id))} aria-label="Menos" className="p-1 hover:text-volt">
              <HiOutlineMinus />
            </button>
            <span className="w-5 text-center font-semibold">{qty}</span>
            <button onClick={() => dispatch(increaseQty(id))} aria-label="Más" className="p-1 hover:text-volt">
              <HiOutlinePlus />
            </button>
          </div>
          <p className="text-lg font-bold">${total}</p>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
