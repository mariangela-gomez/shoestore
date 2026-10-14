import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiArrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import CardFeature from "../component/CardFeature";
import AllProduct from "../component/AllProduct";

const categories = [
  { key: "running", label: "Running", img: "1542291026-7eec264c27ff" },
  { key: "basketball", label: "Basketball", img: "1597045566677-8cf032ed6634" },
  { key: "training", label: "Training", img: "1606107557195-0e29a4b5b4aa" },
  { key: "lifestyle", label: "Lifestyle", img: "1514989940723-e8e51635b782" },
];

const perks = [
  ["Envío gratis", "En pedidos desde $100"],
  ["30 días de prueba", "Cámbialas si no te convencen"],
  ["Pago seguro", "Tarjeta protegida con Stripe"],
];

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const featured = productData[0];
  const newArrivals = productData.slice(0, 8);
  const slideRef = useRef();
  const scroll = (dx) => slideRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  const words = ["Run faster", "Jump higher", "Train harder", "Move different"];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-volt/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:px-6 md:py-20">
          <div className="relative z-10">
            <span className="inline-block rounded-full border border-volt/40 px-4 py-1 text-xs font-bold uppercase tracking-widest text-volt">
              Nueva colección {new Date().getFullYear()}
            </span>
            <h1 className="mt-6 font-display text-6xl font-extrabold uppercase italic leading-[0.9] tracking-tight sm:text-7xl md:text-8xl">
              Nacidas
              <br />
              para <span className="text-volt">rendir.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-zinc-400">
              Zapatillas deportivas de running, basketball y training. Amortiguación
              reactiva, diseño audaz y comodidad para cada kilómetro.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#catalogo" className="btn-volt">
                Comprar ahora <HiArrowRight />
              </a>
              <Link to="/shoe/category/running" className="btn-ghost">
                Ver running
              </Link>
            </div>
            <div className="mt-10 flex gap-8 text-sm text-zinc-400">
              <div><p className="font-display text-3xl font-bold text-white">14+</p>modelos</div>
              <div><p className="font-display text-3xl font-bold text-white">4</p>categorías</div>
              <div><p className="font-display text-3xl font-bold text-white">4.9★</p>valoración</div>
            </div>
          </div>

          <div className="relative">
            {featured ? (
              <Link to={`/shoe/${featured._id}`} className="group relative block">
                <div className="aspect-square overflow-hidden rounded-[2.5rem] border border-edge">
                  <img
                    src={featured.image}
                    alt={featured.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute -bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-edge bg-panel/90 p-4 backdrop-blur md:left-auto md:right-[-1rem] md:w-72">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-volt">Destacada</p>
                    <p className="font-display text-2xl font-bold uppercase">{featured.name}</p>
                  </div>
                  <p className="text-xl font-bold">${featured.price}</p>
                </div>
              </Link>
            ) : (
              <div className="aspect-square animate-pulse rounded-[2.5rem] bg-panel" />
            )}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-edge bg-volt py-3 text-ink">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-2xl font-extrabold uppercase italic">
          {[...words, ...words, ...words, ...words].map((w, i) => (
            <span key={i}>{w} ✦</span>
          ))}
        </div>
      </div>

      {/* CATEGORIAS */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <h2 className="section-title mb-8">Elige tu deporte</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {categories.map((c) => (
            <Link
              key={c.key}
              to={`/shoe/category/${c.key}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-edge"
            >
              <img
                src={`https://images.unsplash.com/photo-${c.img}?auto=format&fit=crop&w=600&q=80`}
                alt={c.label}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <span className="font-display text-3xl font-extrabold uppercase italic">{c.label}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-volt text-ink transition group-hover:translate-x-1">
                  <HiArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NOVEDADES */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="section-title">Novedades</h2>
          <div className="hidden gap-2 md:flex">
            <button onClick={() => scroll(-340)} aria-label="Anterior" className="flex h-11 w-11 items-center justify-center rounded-full border border-edge text-xl transition hover:border-volt hover:text-volt">
              <HiChevronLeft />
            </button>
            <button onClick={() => scroll(340)} aria-label="Siguiente" className="flex h-11 w-11 items-center justify-center rounded-full border border-edge text-xl transition hover:border-volt hover:text-volt">
              <HiChevronRight />
            </button>
          </div>
        </div>
        <div ref={slideRef} className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto scroll-smooth px-4 md:mx-0 md:px-0">
          {newArrivals.length
            ? newArrivals.map((el) => (
                <div key={el._id + "new"} className="w-[70vw] shrink-0 sm:w-[300px]">
                  <CardFeature
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    description={el.description}
                  />
                </div>
              ))
            : new Array(4).fill(null).map((_, i) => (
                <div key={i} className="w-[70vw] shrink-0 sm:w-[300px]"><CardFeature loading="Cargando..." /></div>
              ))}
        </div>
      </section>

      {/* BANNER */}
      <section className="mx-auto mt-16 max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-edge bg-panel p-8 md:p-14">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-volt/20 blur-3xl" />
          <p className="text-xs font-bold uppercase tracking-widest text-volt">Oferta de temporada</p>
          <h3 className="mt-2 max-w-xl font-display text-5xl font-extrabold uppercase italic leading-none md:text-7xl">
            Tu próximo récord empieza con el <span className="text-volt">par correcto.</span>
          </h3>
          <Link to="/shoe/category/running" className="btn-volt mt-8">
            Descubrir running <HiArrowRight />
          </Link>
        </div>
      </section>

      {/* CATALOGO */}
      <div id="catalogo" className="mt-10">
        <AllProduct heading="Todo el catálogo" />
      </div>

      {/* VENTAJAS */}
      <section className="mx-auto grid max-w-7xl gap-3 px-4 md:grid-cols-3 md:px-6">
        {perks.map(([t, d]) => (
          <div key={t} className="rounded-3xl border border-edge bg-panel p-6">
            <p className="font-display text-2xl font-bold uppercase text-volt">{t}</p>
            <p className="mt-1 text-zinc-400">{d}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
