import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi2";
import { addCartItem } from "../redux/productSlide";

const CardFeature = ({ image, name, price, category, loading, id, description }) => {
  const dispatch = useDispatch();

  const handleAddCartProduct = (e) => {
    e.preventDefault();
    dispatch(addCartItem({ _id: id, name, price, category, image, description }));
  };

  if (!image) {
    return (
      <div className="aspect-[4/5] w-full animate-pulse rounded-3xl border border-edge bg-panel" title={loading} />
    );
  }

  return (
    <Link
      to={`/shoe/${id}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-edge bg-panel transition duration-300 hover:-translate-y-1 hover:border-volt/60"
    >
      <div className="aspect-square overflow-hidden bg-zinc-900">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex items-end justify-between gap-2 p-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-volt">{category}</p>
          <h3 className="truncate font-display text-2xl font-bold uppercase leading-tight">{name}</h3>
          <p className="mt-1 font-semibold text-zinc-300">${price}</p>
        </div>
        <button
          onClick={handleAddCartProduct}
          aria-label={`Agregar ${name} al carrito`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-volt text-xl text-ink transition hover:brightness-110 active:scale-90"
        >
          <HiOutlinePlus />
        </button>
      </div>
    </Link>
  );
};

export default CardFeature;
