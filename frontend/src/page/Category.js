import React from "react";
import { useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";

const Category = () => {
  const { category } = useParams();
  return (
    <div>
      <div className="border-b border-edge bg-panel/50">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-volt">Colección</p>
          <h1 className="font-display text-6xl font-extrabold uppercase italic md:text-8xl">{category}</h1>
        </div>
      </div>
      <AllProduct heading="Productos" initialCategory={category} />
    </div>
  );
};

export default Category;
