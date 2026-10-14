import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";

const AllProduct = ({ heading, initialCategory = "all", excludeId }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];
  const [filterby, setFilterBy] = useState(initialCategory);

  useEffect(() => {
    setFilterBy(initialCategory);
  }, [initialCategory]);

  const shown = productData.filter(
    (el) =>
      el._id !== excludeId &&
      (filterby === "all" || el.category?.toLowerCase() === filterby.toLowerCase())
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <h2 className="section-title mb-6">{heading}</h2>

      <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-1">
        {["all", ...categoryList].map((c) => (
          <button
            key={c}
            onClick={() => setFilterBy(c)}
            className={`whitespace-nowrap rounded-full border px-5 py-2 text-sm font-semibold capitalize transition ${
              filterby.toLowerCase() === c.toLowerCase()
                ? "border-volt bg-volt text-ink"
                : "border-edge text-zinc-300 hover:border-volt hover:text-volt"
            }`}
          >
            {c === "all" ? "Todos" : c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {productData.length === 0
          ? new Array(8).fill(null).map((_, i) => <CardFeature key={i + "load"} loading="Cargando..." />)
          : shown.map((el) => (
              <CardFeature
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                category={el.category}
                price={el.price}
                description={el.description}
              />
            ))}
      </div>
    </section>
  );
};

export default AllProduct;
