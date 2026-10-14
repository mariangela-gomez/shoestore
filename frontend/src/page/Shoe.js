import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { addCartItem } from "../redux/productSlide";

const sizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

const Shoe = () => {
  const { filterby } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);
  const [size, setSize] = useState("");

  const productDisplay = productData.find((el) => el._id === filterby);

  if (!productDisplay) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center md:px-6">
        {productData.length === 0 ? (
          <p className="text-zinc-400">Cargando producto...</p>
        ) : (
          <>
            <p className="font-display text-5xl font-extrabold uppercase italic">Producto no encontrado</p>
            <Link to="/" className="btn-volt mt-8">Volver a la tienda</Link>
          </>
        )}
      </div>
    );
  }

  const handleAdd = () => dispatch(addCartItem(productDisplay));
  const handleBuy = () => {
    dispatch(addCartItem(productDisplay));
    navigate("/cart");
  };

  return (
    <div>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 md:gap-14 md:px-6">
        <div className="overflow-hidden rounded-[2rem] border border-edge bg-panel">
          <img
            src={productDisplay.image}
            alt={productDisplay.name}
            className="aspect-square w-full object-cover transition duration-700 hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-center">
          <Link
            to={`/shoe/category/${productDisplay.category}`}
            className="text-xs font-bold uppercase tracking-widest text-volt hover:underline"
          >
            {productDisplay.category}
          </Link>
          <h1 className="mt-2 font-display text-6xl font-extrabold uppercase italic leading-[0.9] md:text-7xl">
            {productDisplay.name}
          </h1>
          <p className="mt-4 text-3xl font-bold">${productDisplay.price}</p>
          <p className="mt-6 max-w-lg text-zinc-400">{productDisplay.description}</p>

          <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-zinc-300">Talla (EU)</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`h-12 w-14 rounded-xl border text-sm font-semibold transition ${
                  size === s ? "border-volt bg-volt text-ink" : "border-edge hover:border-volt"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={handleBuy} className="btn-volt">Comprar ahora</button>
            <button onClick={handleAdd} className="btn-ghost">Agregar al carrito</button>
          </div>
        </div>
      </div>

      <AllProduct heading="También te puede gustar" initialCategory={productDisplay.category} excludeId={productDisplay._id} />
    </div>
  );
};

export default Shoe;
